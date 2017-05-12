const {app, BrowserWindow} = require('electron')
const path = require('path')
const url = require('url')
const regIPCMessage = require('./regIPCMessage')
const log = require('electron-log');

log.transports.file.level = 'warn';
log.transports.file.format = '{h}:{i}:{s}:{ms} {text}';
log.transports.file.maxSize = 5 * 1024 * 1024;

require('electron-reload')(path.join(__dirname, '../../public/'), {electron: require('electron-prebuilt')});

let win

function createWindow() {

    regIPCMessage();
    win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            experimentalFeatures: true
        }
    })

    win.loadURL(url.format({
        pathname: path.join(__dirname, '../../public/index.html'),
        protocol: 'file:',
        slashes: true
    }))

    win.webContents.openDevTools()

    win.on('closed', () => {
        win = null
    })
}

app.on('ready', createWindow)
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    if (win === null) {
        createWindow()
    }
})