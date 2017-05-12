const Datastore = require('nedb')
const log = require('electron-log');

const db = new Datastore({filename: 'fileInfos.db', autoload: true});

const insertOrUpdate = (fileInfo, callback) => {
    if (typeof fileInfo._id === 'undefined') {
        db.insert(fileInfo, callback);
    } else {
        db.findOne({_id: fileInfo._id}, (err, doc) => {
            if (err)
                callback(err, doc)
            if (doc === null) {
                db.insert(fileInfo, callback);
            } else {
                db.update({_id: doc._id}, fileInfo, {}, () => {
                    callback(undefined, fileInfo);
                })
            }
        });
    }
}

const remove = (id, callback) => {
    db.remove({_id: id}, {}, (err, num) => {
        callback(err, num);
    })
}

const findAll = (callback) => {
    db.find({}).exec((err, docs) => {
        callback(err, docs);
    })
}

module.exports = {insertOrUpdate, remove, findAll}