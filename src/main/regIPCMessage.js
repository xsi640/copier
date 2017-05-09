const {ipcMain} = require('electron')
const {dialog} = require('electron')
const fs = require('fs')

function regIPCMessage() {
    ipcMain.on('COPY', (event, arg) => {
        let source = arg.source;
        let target = arg.target;
        let ignore = arg.ignore;

        let arr = [];

    })

    ipcMain.on('BROWSE', (event, arg) => {
        dialog.showOpenDialog({
            title: '浏览',
            properties: ['openDirectory', 'createDirectory']
        }, (path) => {
            if (typeof path !== 'undefined' &&
                path.length > 0) {
                event.sender.send('BROWSE', path[0])
            }

        });
    })
}

module.exports = regIPCMessage;