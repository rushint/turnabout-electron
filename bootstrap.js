const {app, BrowserWindow, Menu} = require('electron');
const path = require('path');
const url = require('url');
require('electron-reload')(__dirname);

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win;

function createWindow () {
    // Create the browser window.
    win = new BrowserWindow({
        width: 418, 
        height: 655,
        maxWidth: 338,
        maxHeight: 384,
        minWidth: 338,
        minHeight: 384,
        center: true
    });

    // and load the index.html of the app.
    win.loadURL(url.format({
        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file:',
        slashes: true
    }))

    // Open the DevTools.
    //win.webContents.openDevTools()

    // Emitted when the window is closed.
    win.on('closed', () => {
        win = null;
    })

    // Remove default menu
    //win.setMenu(null);

    // Custom Menu
    const template = [
        {
            label: 'TurnAbout',
            submenu: [
                {role: 'reload'},
                {type: 'separator'},
                {role: 'minimize'},
                {role: 'close'}
            ]
        }
    ]
    
    if (process.platform === 'darwin') {
        template.unshift({
            label: 'TurnAbout',
            submenu: [
                {role: 'quit'}
            ]
        })    
    }
    
    const menu = Menu.buildFromTemplate(template)
    Menu.setApplicationMenu(menu)
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow()
  }
})
