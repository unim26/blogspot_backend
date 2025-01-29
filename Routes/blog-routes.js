const router = require("express").Router();
const { createBlog, getBlogs,deleteBlogById } = require("../controllers/blog-controller");

//route for creating blog
router.post("/create", createBlog);

//route for getting all blogs
router.get("/allblog",getBlogs);

//route for deleting blogs
router.delete("/deleteblog",deleteBlogById);


module.exports = router;


