const fs = require('fs')
const path = require('path')
const fsh = require('./filehelper')
const log = require('electron-log');
const fileInfoDB = require('./dbaccess/fileinfodb')

class FileCopier {
    constructor() {
        this._fileInfos = [];

        this._currPer = 1;
        this._totalPer = 1;

        this._busy = false;
        this._error = null;
        this._stopping = false;
    }

    get Busy() {
        return this._busy;
    }

    get CurrentPer() {
        return this._currPer;
    }

    get TotalPer() {
        return this._totalPer;
    }

    get Error() {
        return this._error;
    }

    get Stopped() {
        return this._stopping;
    }

    copy() {
        if (this._busy)
            return;

        this._fileInfos = [];

        this._currPer = 1;
        this._totalPer = 1;

        this._busy = true;
        this._error = null;

        fileInfoDB.findAll((err, fileInfos) => {
            if (err) {
                this._error = err;
                return;
            }

            this._fileInfos = fileInfos;

            if (this._fileInfos.length === 0) {
                this._busy = false;
                this._currPer = 100;
                this._totalPer = 100;
            }

            this._currPer = 1;
            this._totalPer = 1;

            this.copyFileInfo(0);
        })
    }

    stop(){
        if(this._busy){
            this._stopping = true;
        }
    }

    copyFileInfo(index) {
        if (index >= this._fileInfos.length) {
            this._totalPer = 100;
            this._busy = false;
            if (this._stopping) {
                this._busy = false;
                this._stopping = false;
            }
            return;
        }

        this._totalPer = Math.round(index / this._fileInfos.length * 100);
        let fileInfo = this._fileInfos[index];
        let filter = [];
        if (fileInfo.filter !== '') {
            filter = fileInfo.filter.split(',');
        }
        fsh.getSubFileSystems(fileInfo.source, (fileSystems) => {

            if (this._stopping)
                return;

            this.realCopyFile(fileInfo, filter, fileSystems, 0, () => {
                this.copyFileInfo(index + 1)
            });
        })
    }

    realCopyFile(fileInfo, filter, fileSystems, index, cb) {
        if (this._stopping) {
            if (cb && typeof cb === 'function')
                cb();
            return;
        }

        if (index >= fileSystems.length) {
            this._currPer = 100;
            if (cb && typeof cb === 'function')
                cb();
            return;
        }

        this._currPer = Math.round(index / fileSystems.length * 100);
        let source = fileSystems[index];
        if (!this._checkFilter(source, filter)) {
            let path2 = path.join(fileInfo.target, source.substring(fileInfo.source.length));
            log.info(`source:${source}, target:${path2}`)
            if (fsh.isFile(source)) {
                fsh.copyFile(source, path2, (err) => {
                    if (err) {
                        this._error = err;
                    }
                    this.realCopyFile(fileInfo, filter, fileSystems, index + 1, cb);
                })
                return;
            } else {
                fsh.createDir(path2, (err) => {
                    if (err) {
                        this._error = err;
                    }
                    this.realCopyFile(fileInfo, filter, fileSystems, index + 1, cb);
                })
                return;
            }
        }
        this.realCopyFile(fileInfo, filter, fileSystems, index + 1, cb);
    }

    _checkFilter(path, filter) {
        let result = false;
        for (let f of filter) {
            if (path.indexOf(f) !== -1) {
                result = true;
                break;
            }
        }
        return result;
    }
}

module.exports = new FileCopier();