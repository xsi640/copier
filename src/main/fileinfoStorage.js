const fs = require('fs');

class FileInfoStorage {

    constructor() {
        this._path = 'fileinfos.json'
        this._data = [];
        this._id = 0;

        this._read();
    }

    insertOrUpdate(fileInfo) {
        let obj = null;
        if (typeof fileInfo.id === 'number') {
            obj = this.get(fileInfo.id);
        }
        if (obj != null) {
            let index = this._data.indexOf(obj);
            this._data[index] = fileInfo;
        } else {
            this._id++;
            fileInfo.id = this._id;
            this._data.push(fileInfo);
        }
    }

    delete(id) {
        let obj = this.get(id);
        if (typeof obj !== 'undefined') {
            let index = this._data.indexOf(obj);
            if (index >= 0)
                this._data.remove(index);
        }
    }

    get(id) {
        let result = undefined;
        for (let item of this._data) {
            if (item.id === id) {
                result = item;
                break;
            }
        }
        return result;
    }

    getAll() {
        return this._data;
    }

    _read() {
        try {
            let data = fs.readFileSync(this._path, {encoding: 'utf8'}).toString();
            if (data) {
                for (let item of this._data) {
                    this._data.push(item);
                    if (this._id < item.id) {
                        this._id = item.id;
                    }
                }
            }
        } catch (err) {
        }
    }

    save() {
        let json = JSON.stringify(this._data);
        fs.writeFileSync(this._path, json, {encoding: 'utf8'});
    }
}

module.exports = new FileInfoStorage();