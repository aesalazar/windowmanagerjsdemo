var logTextArea = document.getElementById("logTextArea");
var logOutput = document.getElementById("logOutput");
var ws;
var logCount = 0;
var windowAppIndex = -1;

//Attempt to reconnect to the server if connection is closed
function attemptReconnect(){
    connect(function(){ 
        //Force a refresh in case something was changed on the server
        var isBrowser = windowfactory.runtime.isBrowser;
        var children = isBrowser ? windowfactory._windows : windowfactory.Window.getAll();

        var windowSizes = children.map(function(win){
            var pos = win.getPosition();
            return { left: pos.left, top: pos.top, width: win.getWidth(), height: win.getHeight(), windowAppIndex: win.windowAppIndex };
        });

        if (!isBrowser){
            //Remove the top which is the main window
            windowSizes.shift();
            var mainWin = windowfactory.Window.getCurrent();

            //Close all but the main
            children.forEach(function(child) {
                if (child !== mainWin)
                    child.close();
            });
        }

        sessionStorage.setItem("windowSizes", JSON.stringify(windowSizes));
        document.location.reload();
    });
}

//Make the connection to the server and fire the callback when ready or fire if already connected
function connect(callback) {
    if (ws != null && ws.readyState === ws.OPEN) {
        if (callback != null)
            callback();
        return;
    }
    
    //Create the url for the WebSocket
    var hostname = location.hostname;
    var port = location.port.length > 0 ? ":" + location.port : "";

    //Open the connection to the server
    var endpoint = "ws://" + hostname + port + "/";
    ws = new WebSocket(endpoint);

    //When connection is opened
    ws.onopen = function(ev) {
        logText("WS connection established: " + (ws.readyState === ws.OPEN));    
        if (callback != null)
            callback();
    };

    //When connection is closed
    ws.onclose = function(ev){
        if (ev.code !== 1000) {
            logText("WS connection closed, retrying...");
            setTimeout(attemptReconnect, 1000);
        }
    };

    //Listen for responses from the server
    ws.onmessage = function (ev) {
        //Process data message
        var args = JSON.parse(ev.data).args;
        var newMsg = {
            type: "local",
            text: args[0] + " " + args[1]
        };
        windowfactory.messagebus.send("internal-message", newMsg);
        logMessage(newMsg);
    };
}

//Log text to the dom element
function logText(text){
    if (++logCount < 1000){
        logTextArea.textContent = text + "\n" + logTextArea.textContent;
    } else {
        logTextArea.textContent = text;
        logCount = 1;
    }
}

//Create a new window
function createWindow(windowSize){
    var state = windowSize 
        ? { left: windowSize.left, top: windowSize.top, width: windowSize.width, height: windowSize.height } 
        : { left: 100, top: 200, width: 400, height: 400 };

    state.url = "child.html";
    state.title = "Window " + (windowSize && windowSize.windowAppIndex  ? windowSize.windowAppIndex : ++windowAppIndex);

    //Create the window
    var win = windowfactory.Window(state);
}

function logMessage(msg){
    logOutput.textContent = msg.text + "\n" + logOutput.textContent;
}

function serverMessage(msg){
    connect(function() {
        ws.send(JSON.stringify({call: "broadcastMessage", args: [msg.type, msg.text]}));
    });
}

//Setup message listener
windowfactory.onReady(function() {
    windowfactory.messagebus.on('internal-message', logMessage);
    windowfactory.messagebus.on('external-message', serverMessage);
});

//Create initial connection and check for state
connect(function(){
    var windowSizesJson = sessionStorage.getItem("windowSizes");
    if (!windowSizesJson)
        return;

    windowfactory.onReady(function(){
        windowSizes = JSON.parse(windowSizesJson);
        for(var i = 0; i < windowSizes.length; i++)
            createWindow(windowSizes[i]);
    });
});