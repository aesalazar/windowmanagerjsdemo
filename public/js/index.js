var logTextArea = document.getElementById("logTextArea");
var divOutputArea = document.getElementById("divOutputArea");
var latencyStartTime;
var currentLatency;
var ws;
var logCount = 0;

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

    ws.onopen = function(ev) {
        logText("WS connection established: " + (ws.readyState === ws.OPEN));    
        if (callback != null)
            callback();
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
function createWindow(){
    var win = windowfactory.Window({
        url: 'child.html',
        left: 100,
        top: 200,
        width: 400,
        height: 400
    });
}

connect();