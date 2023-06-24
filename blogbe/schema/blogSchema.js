const mongoose = require('mongoose');
const { Schema } = mongoose;

// new schema for blog Content to Database.
const blogSchema = new Schema({
    imageName: { type: String,  default:"" },
    heading: { type: String, default:"" },
    author : {type:String, default:""},
    content: { type: String , default:"" }}, 
    { timestamps: true })

// Registering the schema with mongoose model.
module.exports = mongoose.model('blog', blogSchema);