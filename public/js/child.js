var logOutput = document.getElementById("logOutput");
var labelHeader = document.getElementById('labelHeader');

function minimizeWindow() {
    windowfactory.Window.getCurrent().minimize();
}

function maximizeWindow() {
    var win = windowfactory.Window.getCurrent();
    
    if (win.isMaximized())
        win.restore();
    else
        win.maximize();
}

function closeWindow() {
    windowfactory.Window.getCurrent().close();
}

function sendToLocal() {
    var txt = document.getElementById('textMessage');
    var msg = {type: "local", text: labelHeader.innerText + ": " + txt.value};
    windowfactory._internalBus.emit('window-message', msg);
}

function sendToServer(agentType) {
    var txt = document.getElementById('textMessage');
    var msg = {type: windowfactory.runtime.name, text: labelHeader.innerText + ": " + txt.value};
    if (agentType)
        msg.agentType = agentType;

    windowfactory._internalBus.emit('window-message', msg);
}

windowfactory.onReady(function(){
    var id = windowfactory.Window.getCurrent().windowAppIndex;
    labelHeader.innerText = "Window " + id;    
    
    //Setup message listener
    windowfactory._internalBus.on('window-message', function(msg) {
        if (msg.type === "local")
            logOutput.textContent = msg.text + "\n" + logOutput.textContent;
    });
});