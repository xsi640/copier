const fs = require('fs')
const fse = require('fs-extra')
const path = require('path')

const getSubFileSystemsSync = (dir) => {
    let result = [];

    function getDirectorys(dir) {
        let arr = fs.readdirSync(dir);
        for (let p of arr) {
            let fullname = path.join(dir, p);
            result.push(fullname);
            let stat = fs.statSync(fullname);
            if (stat.isDirectory()) {
                getDirectorys(fullname);
            }
        }
    }

    getDirectorys(dir);

    return result;
}

const getSubFileSystems = (dir, callback) => {
    let result = [];

    function getDirectorys(dir) {
        let arr = fs.readdirSync(dir);
        for (let p of arr) {
            let fullname = path.join(dir, p);
            result.push(fullname);
            let stat = fs.statSync(fullname);
            if (stat.isDirectory()) {
                getDirectorys(fullname);
            }
        }
    }

    getDirectorys(dir);
    callback(result);
}

const copy = (source, target) => {
    fse.copySync(source, target);
}

const copyFile = (source, target, cb) => {
    var cbCalled = false;

    var rd = fs.createReadStream(source);
    rd.on("error", function (err) {
        done(err);
    });
    var wr = fs.createWriteStream(target, {flags: 'w'});
    wr.on("error", function (err) {
        done(err);
    });
    wr.on("close", function (ex) {
        done();
    });
    rd.pipe(wr);

    function done(err) {
        if (!cbCalled) {
            cb(err);
            cbCalled = true;
        }
    }
}


const createDir = (dir, cb) => {
    fs.mkdir(dir, cb);
}

const isFile = (path) => {
    return fs.lstatSync(path).isFile();
}

const combine = (...paths) => {
    return path.join(...paths)
}

module.exports = {
    getSubFileSystems,
    getSubFileSystemsSync,
    copy,
    copyFile,
    createDir,
    isFile
}