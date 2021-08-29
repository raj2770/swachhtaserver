const crypto = require('crypto')
const path = require('path')
const { GridFsStorage } = require('multer-gridfs-storage')
require('dotenv').config()

const uri = 'mongodb://raj:raj2770@cluster0-shard-00-00.a6ufd.mongodb.net:27017,cluster0-shard-00-01.a6ufd.mongodb.net:27017,cluster0-shard-00-02.a6ufd.mongodb.net:27017/backend?authSource=admin&replicaSet=atlas-8e0gql-shard-0&w=majority&readPreference=primary&appname=MongoDB%20Compass&retryWrites=true&ssl=true'

const storage = new GridFsStorage({
    url: uri,
    file: (req, file) => {
        return new Promise((resolve, reject) => {

            crypto.randomBytes(16, (err, buf) => {
                if (err) {
                    return reject(err)
                }
                let filename;
                var ext = path.extname(file.originalname);
                if (ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
                    filename = buf.toString('hex') + file.originalname;
                } else {
                    filename = buf.toString('hex') + path.extname(file.originalname);
                }
                const fileInfo = {
                    filename: filename,
                    bucketName: 'uploads'
                }
                resolve(fileInfo)
            })
        })
    }
})

module.exports = storage