const {ipcMain} = require('electron')
const {dialog} = require('electron')
const fs = require('fs')
const log = require('electron-log');
const IPCMESSAGE = require('../constipc')
const fileInfoDB = require('./dbaccess/fileinfodb')
const fileCopier = require('./filecopier')

function regIPCMessage() {

    _regIPCHandler(IPCMESSAGE.BROWSE_FOLDER, (event, args, callback) => {
        dialog.showOpenDialog({
            title: '浏览',
            properties: ['openDirectory', 'createDirectory']
        }, (path) => {
            if (typeof path !== 'undefined' &&
                path.length > 0) {
                callback(undefined, path[0])
            }
        });
    })

    _regIPCHandler(IPCMESSAGE.FILEINFO_LIST, (event, args, callback) => {
        fileInfoDB.findAll(callback)
    })

    _regIPCHandler(IPCMESSAGE.FILEINFO_SAVE, (event, args, callback) => {
        if (typeof args.source !== 'string' || args.source === '') {
            throw new Error('请输入源文件夹路径')
        }
        if (!fs.existsSync(args.source)) {
            throw new Error('原文件夹路径不存在')
        }
        if (typeof args.source !== 'string' || args.target === '') {
            throw new Error('请输入目标文件夹路径')
        }
        if (!fs.existsSync(args.target)) {
            throw new Error('目标文件夹路径不存在')
        }
        if (args.source === args.target) {
            throw new Error('源文件夹路径和目标文件夹路径不能相同')
        }
        fileInfoDB.insertOrUpdate(args, callback);
    })

    _regIPCHandler(IPCMESSAGE.FILEINFO_DELETE, (event, args, callback) => {
        fileInfoDB.remove(args, (err, numbs) => {
            callback(err, args);
        })
    })

    ipcMain.on(IPCMESSAGE.COPY, (event, args) => {
        fileCopier.copy();
    });

    _regIPCHandler(IPCMESSAGE.GET_COPY, (event, args, callback) => {
        callback(null, {
            busy: fileCopier.Busy,
            stopped: fileCopier.Stopped,
            error: fileCopier.Error,
            currPer: fileCopier.CurrentPer,
            totalPer: fileCopier.TotalPer,
        });
    })

    _regIPCHandler(IPCMESSAGE.COPY_CANCEL, (event, args, callback)=>{
        fileCopier.stop();
    })

    function _regIPCHandler(message, func) {
        ipcMain.on(message, (event, args) => {
            // log.info(`receive msg:${message} args:${JSON.stringify(args)}`);
            func(event, args, (err, result) => {
                let data = {};
                if (typeof err === 'undefined')
                    data.data = result;
                else {
                    data.data = result;
                    data.err = err;
                }
                //log.info(`send msg:${message} data:${JSON.stringify(data)}`);
                event.sender.send(message, data)
            });
        });
    }
}


module.exports = regIPCMessage;