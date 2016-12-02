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