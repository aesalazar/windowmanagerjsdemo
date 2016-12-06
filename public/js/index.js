var logTextArea = document.getElementById("logTextArea");
var divOutputArea = document.getElementById("divOutputArea");
var ws;
var logCount = 0;

//Attempt to reconnect to the server if connection is closed
function attemptReconnect(){
    //Force a refresh in case something was changed on the server
    connect(function(){ 
        var windowSizes = windowfactory._windows.map(function(win){
            var pos = win.getPosition();
            return { left: pos.left, top: pos.top, width: win.getWidth(), height: win.getHeight() };
        });

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
function createWindow(windowSizes){
    var state = windowSizes ? windowSizes : { left: 100, top: 200, width: 400, height: 400 };
    state.url = "child.html";

    //Create the window
    var win = windowfactory.Window(state);
}

//Create initial connection and check for state
connect(function(){
    var windowSizes = sessionStorage.getItem("windowSizes");
    if (!windowSizes)
        return;

    windowSizes = JSON.parse(windowSizes);
    for(var i = 0; i < windowSizes.length; i++)
        createWindow(windowSizes[i]);
});