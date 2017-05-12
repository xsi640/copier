const fs = require('fs')
const fsh = require('./filehelper')
const path = require('path')
const log = require('electron-log');
const IPCMESSAGE = require('../constipc')
const fileInfoDB = require('./dbaccess/fileinfodb')

class FileCopy {
    constructor(sender) {
        this._fileInfos = []
        this._sender = sender;
        this._stopping = false;

        this._currPer = 1;
        this._totalPer = 1;
        this._coping = false;
        this._error = null;
    }

    copy() {
        new Promise((resolve) => {
            fileInfoDB.findAll((err, fileInfos) => {
                this._fileInfos = fileInfos;
                this._coping = true;
                for (let i = 0; i < this._fileInfos.length; i++) {
                    this.coping(i);
                }

                this._coping = false;
                this.send();
            })
            resolve();
        });
    }

    coping(index) {
        this._totalPer = index + 1 / this._fileInfos.length * 100;
        this.send();
        let fileInfo = this._fileInfos[index];
        let filter = [];
        if (fileInfo.filter != '') {
            filter = fileInfo.filter.split(',');
        }
        log.info(`filter:${JSON.stringify(filter)}`)
        let fileSystems = fsh.getSubFileSystems(fileInfo.source);
        for (let i = 0; i < fileSystems.length; i++) {
            this._currPer = i / fileSystems.length * 100;
            this.send();
            let sourcePath = fileSystems[i];
            if (this._check(sourcePath, filter)) {
                continue;
            }
            let path2 = path.join(fileInfo.target, sourcePath.substring(fileInfo.source.length));
            log.info(`source:${sourcePath}, target:${path2}`)
            if (fsh.isFile(sourcePath)) {
                fsh.copy(sourcePath, path2)
            } else {
                fsh.createDir(path2)
            }
        }
        this._currPer = 100;
        this.send();
    }

    _check(path, filter) {
        let result = false;
        for (let f of filter) {
            if (path.indexOf(f) !== -1) {
                result = true;
                break;
            }
        }
        return result;
    }

    send() {
        this._sender.send(IPCMESSAGE.COPY,
            {
                currPer: this._currPer,
                totalPer: this._totalPer,
                coping: this._coping,
                error: this._error,
            })
    }

    stop() {
        this._stopping = true;
    }
}

module.exports = FileCopy
