const express = require('express')
const multer = require('multer')
const mongoose = require('mongoose')
const app = express()
const port = process.env.PORT || 3000
const connection = require('./database/mongoose')
const { upload } = require("./database/upload")
let gfs;
connection.once('open', () => {
    gfs = new mongoose.mongo.GridFSBucket(connection.db, { bucketName: "uploads" });
});

app.get('/', function(req, res) {
    res.send("Cool! The server is running!")
})

app.post('/upload', upload.single('uploadedFile'), (req, res) => {
    if (req.file) {
        console.log(req.file)
        console.log(req.body)

        return res.send({ result: true })
    } else {
        return res.send({ result: false })
    }
})

app.listen(port)
console.log('Server started successfully on port ' + port + "!")
