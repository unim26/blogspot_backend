const router = require("express").Router();
const {
  createBlog,
  getBlogs,
  deleteBlogById,
  likeorDislikeBlogById,
  commentOnBlogById,
  getOwnBlogs,
} = require("../controllers/blog-controller");
const isEmailVerified = require("../middlewares/email-verification-middleware");

//route for creating blog
router.post("/create", isEmailVerified, createBlog);

//route for getting all blogs
router.get("/allblog", getBlogs);

//route for deleting blogs
router.delete("/deleteblog", isEmailVerified, deleteBlogById);

//route to like a blog by its id
router.patch("/likeblog", likeorDislikeBlogById);

//route to comment on a blog by id
router.patch("/comment", commentOnBlogById);

//route to get all own blogs
router.get("/myblogs",isEmailVerified,getOwnBlogs);

module.exports = router;
