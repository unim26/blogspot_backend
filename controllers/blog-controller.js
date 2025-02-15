const blog_model = require("../models/blogs-model");
const comment_model = require("../models/comment-model");
const user_model = require("../models/user-model");

//function to create blog
async function createBlog(req, res) {
  //get blog data from request
  const { title, description, thumbnail } = req.body;

  try {
    //create blog
    const newBlog = await blog_model.create({
      title,
      description,
      thumbnail,
      author: req.id,
    });

    //add blog to user who created this
    await user_model.findByIdAndUpdate(
      { _id: req.id },
      { $push: { blogs: newBlog._id } },
      { new: true }
    );

    //send response that blog is created
    res
      .status(201)
      .json({ status: 201, message: "Blog-created", blog: newBlog });
  } catch (error) {
    console.log(`ERROR in create blog ${error}`);
  }
}

//function to get all blogs
async function getBlogs(req, res) {
  // const page = req.query.PAGE;
  try {
    //get all blogs
    const blogs = await blog_model
      .find({})
      .populate("author", "fullName email profileImage -_id")
      .populate({
        path: "comments",
        select: "comment commentby -_id",
        populate: {
          path: "commentby",
          select: "fullName email profileImage -_id",
        },
      })
      .select("-createdAt -_id");
      // .sort({ createdAt: -1 }) //sort newest one
      // .skip((page - 1) * 10) //skip previous page
      // .limit(parseInt(10)); //get only 10 blogs

    //send response
    res.status(200).send(blogs);
  } catch (error) {
    console.log(`ERROR in get blogs ${error}`);
  }
}

//function to delete blog by id
async function deleteBlogById(req, res) {
  //get id from prams
  const blogId = req.query.BLOGID;

  try {
    // Find the blog
    const blog = await blog_model.findById(blogId);

    //delete comments first
    await comment_model.deleteMany({ _id: { $in: blog.comments } });

    //try to delete blog
    await blog_model.findByIdAndDelete({ _id: blogId });

    //delete from user blog list
    await user_model.findByIdAndUpdate(
      { _id: req.id },
      { $pull: { blogs: blogId } }
    );

    res
      .status(200)
      .json({ status: 200, message: "Blog successfully deleted." });
  } catch (error) {
    console.log(`ERROR in deleting blog ${error}`);
  }
}

//function to like a blog
async function likeorDislikeBlogById(req, res) {
  const blogid = req.query.BLOGID;
  const wantstolike = req.query.WANTSTOLIKE;

  console.log(`wantstolike ${wantstolike}`);

  try {
    await blog_model.findByIdAndUpdate(
      { _id: blogid },
      { $inc: { likes: wantstolike == "true" ? 1 : -1 } },
      { new: true }
    );

    res.status(201).json({
      status: 201,
      message:
        wantstolike == "true"
          ? "successfully-liked-the-blog"
          : "successfully-disliked-the-blog",
    });
  } catch (error) {
    res.status(500).json({ status: 500, message: "Some-thing-went-wrong" });
  }
}

//function to comment on a blog
async function commentOnBlogById(req, res) {
  const blogid = req.query.BLOGID;
  const userid = req.id;
  const comment = req.query.COMMENT;

  try {
    //create comment
    await comment_model
      .create({ comment, commentby: userid, commenton: blogid })
      .then(async (val) => {
        //add instance to blog
        await blog_model
          .findByIdAndUpdate({ _id: blogid }, { $push: { comments: val._id } })
          .then((val) =>
            //all good send response
            res.status(201).json({ status: 201, message: "comment-added" })
          );
      });
  } catch (error) {
    res.status(500).json({ status: 500, message: "something-went-wrong" });
  }
}

//function to get own blogs
async function getOwnBlogs(req, res) {
  const userid = req.id;

  console.log(`get my blog request got`);
  console.log(`user id ${userid}`);


  try {
    await blog_model
      .find({ author: userid })
      .populate("author", "fullName email -_id")
      .populate({
        path: "comments",
        select: "comment commentby -_id",
        populate: { path: "commentby", select: "fullName email profileImage -_id" },
      })
      .select("-createdAt -_id")
      .then((myblogs) => {
        res.status(200).send(myblogs);
      });
  } catch (error) {

    console.log(`error ${error}`);

    res.status(500).json({ status: 500, message: "something-went-wrong" });
  }
}

module.exports = {
  createBlog,
  getBlogs,
  deleteBlogById,
  likeorDislikeBlogById,
  commentOnBlogById,
  getOwnBlogs,
};
