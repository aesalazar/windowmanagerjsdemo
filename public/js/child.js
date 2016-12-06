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
    windowfactory._internalBus.emit('window-message',labelHeader.innerText + ": " + txt.value);
}

function sendToServer() {

}

windowfactory.onReady(function(){
    var id = windowfactory.Window.getCurrent().windowAppIndex;
    labelHeader.innerText = windowfactory.runtime.name + " Window " + id;    
    
    //Setup message listener
    windowfactory._internalBus.on('window-message', function(e){
        logOutput.textContent = e + "\n" + logOutput.textContent;
    });
});