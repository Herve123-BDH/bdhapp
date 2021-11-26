const mongoose = require('mongoose')
const PostSchema = new mongoose.Schema({
    title:String,
    content:String
})
const NewPost= mongoose.model('fullstack', PostSchema)
module.exports = NewPost