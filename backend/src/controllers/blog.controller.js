const blogModel = require("../models/blog.model");

module.exports.createBlog = async (req, res) => {
    try {
        const blog = new blogModel(req.body);
        await blog.save();
        res.status(201).json({ message: "Blog post added" });
    } catch (err) {
        res.status(500).json({ error: "Error saving blog" });
    }
}


module.exports.getAllBlogs = async (req, res) => {
    const blogs = await blogModel.find().sort({ datePublished: -1 });
    res.json(blogs);
}