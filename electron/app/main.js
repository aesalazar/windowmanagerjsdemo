const electron = require('electron');
const path = require("path");
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

const wfPath = path.join(__dirname, "../../windowmanagerjs/dist/windowmanager.js");
const wf = require(wfPath);

let mainWindow;

function createWindow () {
  mainWindow = new BrowserWindow({
    width: 800, 
    height: 600,
    webPreferences: {
        nodeIntegration: false,
        preload: wfPath
    }
  });

  //Determine the endpoint
  const epArg = process.argv.find(arg => arg.indexOf("--endpoint") >= 0);
  const ep = epArg 
      ? epArg.substr(epArg.indexOf("=") + 1) 
      : require("./package.json").endPoint;

  // and load the index.html of the app.
  mainWindow.loadURL(ep);


  mainWindow.on('closed', function () {
    mainWindow = null;
    app.quit();
  });

    // Open the DevTools.
    mainWindow.webContents.openDevTools();
}

app.on('ready', createWindow);

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', function () {
  if (mainWindow === null) {
    createWindow();
  }
});
