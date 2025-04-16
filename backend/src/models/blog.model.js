const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
    title: String,
    content: String,
    source: String,
    image: String,
    datePublished: Date,
    tags: [String],
});


const blogModel = mongoose.model("Blog", blogSchema);

module.exports = blogModel