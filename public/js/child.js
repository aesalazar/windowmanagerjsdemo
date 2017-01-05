var logOutput = document.getElementById("logOutput");
var labelHeader = document.getElementById('labelHeader');
var self;

function minimizeWindow() {
    self.minimize();
}

function maximizeWindow() {
    if (self.isMaximized())
        self.restore();
    else
        self.maximize();
}

function closeWindow() {
    self.close();
}

function sendToLocal() {
    var txt = document.getElementById('textMessage');
    var msg = {type: "local", text: labelHeader.innerText + ": " + txt.value};
    windowmanager.messagebus.send('internal-message', msg);
    logMessage(msg);
}

function sendToServer(agentType) {
    var txt = document.getElementById('textMessage');
    var msg = {type: windowmanager.runtime.name, text: labelHeader.innerText + ": " + txt.value};
    if (agentType)
        msg.agentType = agentType;

    windowmanager.messagebus.send('external-message', msg);
}

function logMessage(msg) {
    logOutput.textContent = msg.text + "\n" + logOutput.textContent;
}

windowmanager.onReady(function(){
    self = windowmanager.Window.getCurrent();
    labelHeader.innerText = self.getTitle();

    //Setup message listener
    windowmanager.messagebus.on('internal-message', logMessage);
});