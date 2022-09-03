// Modules
const {app, BrowserWindow} = require('electron')
const  windowStateKeeper = require('electron-window-state')
// const { stat } = require('original-fs')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

// Create a new BrowserWindow when `app` is ready
function createWindow () {


  const state = windowStateKeeper({
    defaultWidth: 650, defaultHeight: 800
  })


  mainWindow = new BrowserWindow({
    x: state.x, y: state.y,

    width: state.width, height: state.height,
    minWidth:300, minHeight: 200,
    webPreferences: {
      contextIsolation: false,
      nodeIntegration: true
    }
  })

  // Load index.html into the new BrowserWindow
  mainWindow.loadFile('renderer/main.html')
  state.manage(mainWindow)
  // Open DevTools - Remove for PRODUCTION!
  // mainWindow.webContents.openDevTools();

  // Listen for window being closed
  mainWindow.on('closed',  () => {
    mainWindow = null
  })
}

// Electron `app` is ready
app.on('ready', createWindow)

// Quit when all windows are closed - (Not macOS - Darwin)
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

// When app icon is clicked and app is running, (macOS) recreate the BrowserWindow
app.on('activate', () => {
  if (mainWindow === null) createWindow()
})
