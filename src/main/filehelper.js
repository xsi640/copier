const fs = require('fs')
const fse = require('fs-extra')
const path = require('path')

const getSubFileSystems = (dir) => {
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

const copy = (source, target) => {
    fse.copySync(source, target);
}

const createDir = (dir) => {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
    }
}

const isFile = (path) => {
    return fs.lstatSync(path).isFile();
}

const combine = (...paths) => {
    return path.join(...paths)
}

module.exports = {
    getSubFileSystems,
    copy,
    createDir,
    isFile
}