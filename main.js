const { app, BrowserWindow, Menu } = require('electron');
const path = require('path');

// Check if we are in development mode
let development = process.argv[2] === "development" ? true : false;

let mainWindow = null;

function createWindow () {
  mainWindow = new BrowserWindow({
    backgroundColor: '#fff',
    height: 600,
    width: 600,
    resizable: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,
      additionalArguments: [(development === true ? 'development' : '')]
    }
  })

  mainWindow.removeMenu();

  mainWindow.loadFile('index.html');

  // if we are in development mode.. Then open the dev tools
  if( development )
    mainWindow.webContents.openDevTools({mode: 'undocked'});
}

app.allowRendererProcessReuse=false

app.whenReady().then(createWindow)

if( development ) {
    try {
        require('electron-reloader')(module)
    } catch (_) {}
}

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})