const mongoose = require('mongoose')
require('dotenv').config()
const uri = 'mongodb://raj:raj2770@cluster0-shard-00-00.a6ufd.mongodb.net:27017,cluster0-shard-00-01.a6ufd.mongodb.net:27017,cluster0-shard-00-02.a6ufd.mongodb.net:27017/backend?authSource=admin&replicaSet=atlas-8e0gql-shard-0&w=majority&readPreference=primary&appname=MongoDB%20Compass&retryWrites=true&ssl=true'

mongoose.connect(uri, {
    useUnifiedTopology: true,
    useNewUrlParser: true
})

const connection = mongoose.connection
connection.once('open', () => {
    console.log('MongoDB database connection established successfully')
})

module.exports = connection