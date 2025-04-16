const express = require("express");
const blogController = require("../controllers/blog.controller.js");
const router = express.Router();

// Add blog post
router.post("/add",blogController.createBlog); 

// Get all posts
router.get("/",blogController.getAllBlogs);

module.exports = router;
