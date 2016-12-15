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
    windowfactory.messagebus.send('internal-message', msg);
}

function sendToServer() {
    var txt = document.getElementById('textMessage');
    var msg = {type: windowfactory.runtime.name, text: labelHeader.innerText + ": " + txt.value};
    windowfactory.messagebus.send('external-message', msg);
}

windowfactory.onReady(function(){
    self = windowfactory.Window.getCurrent();
    labelHeader.innerText = self.getTitle();    
    
    //Setup message listener
    windowfactory.messagebus.on('internal-message', function(msg) {
        logOutput.textContent = msg.text + "\n" + logOutput.textContent;
    });
});