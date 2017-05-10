const {ipcMain} = require('electron')
const {dialog} = require('electron')
const fs = require('fs')
const log = require('electron-log');
const IPCMESSAGE = require('../constipc')
const fileInfoStorage = require('./fileinfoStorage')

function regIPCMessage() {

    _regIPCHandler(IPCMESSAGE.BROWSE_FOLDER, (event, args, callback) => {
        dialog.showOpenDialog({
            title: '浏览',
            properties: ['openDirectory', 'createDirectory']
        }, (path) => {
            if (typeof path !== 'undefined' &&
                path.length > 0) {
                callback(path[0])
            }
        });
    })

    _regIPCHandler(IPCMESSAGE.FILEINFO_LIST, (event, args) => {
        return fileInfoStorage.getAll();
    })

    _regIPCHandler(IPCMESSAGE.FILEINFO_SAVE, (event, args) => {
        if (typeof args.source !== 'string' || args.source === '') {
            throw new Error('please enter source path.')
        }
        if (!fs.existsSync(args.source)) {
            throw new Error('source folder not exists.')
        }
        if (typeof args.source !== 'string' || args.target === '') {
            throw new Error('please enter target path.')
        }
        if (!fs.existsSync(args.target)) {
            throw new Error('target folder not exists.')
        }
        fileInfoStorage.insertOrUpdate(args);
        fileInfoStorage.save();
        return args;
    })

    _regIPCHandler(IPCMESSAGE.FILEINFO_DELETE, (event, args) => {
        fileInfoStorage.delete(args);
        fileInfoStorage.save();
        return null;
    })

    function _regIPCHandler(message, func) {
        ipcMain.on(message, (event, args) => {
            log.info(`receive msg:${message} args:${JSON.stringify(args)}`);
            let result = {};
            try {
                result.data = func(event, args, (result) => {
                    event.sender.send(message, {data: result});
                });
                if (typeof result.data === 'undefined')
                    return;
            } catch (e) {
                log.error(`error:${e}`)
                result.error = e.message;
            }
            log.info(`send msg:${message} result:${JSON.stringify(result)}`);
            event.sender.send(message, result);
        });
    }
}


module.exports = regIPCMessage;