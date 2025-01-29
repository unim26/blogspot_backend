const blog = require('../models/blogs-model');


//function to create blog
async function createBlog(req, res) {
    //get blog data from request
    const { title, description } = req.body;

    try {
        //create blog
        const newBlog = await blog.create({
            title,
            description,
            author: req.id
        });

        //send response that blog is created
        res.status(201).json({ status: 201, message: "Blog created", "blog": newBlog });
    } catch (error) {
        console.log(`ERROR in create blog ${error}`);
    }
}

//function to get all blogs
async function getBlogs(req, res) {
    try {
        //get all blogs
        const blogs = await blog.find({}).populate('author');

        //send response
        res.status(200).json({ status: 200, message: "All blogs", blogs });
    } catch (error) {
        console.log(`ERROR in get blogs ${error}`);
    }
}

//function to delete blog by id
async function deleteBlogById(req, res) {
    //get id from prams
    const blogId = req.query.BLOGID;

    try {
        //try to delete blog
        await blog.findByIdAndDelete({ _id: blogId });

        res.status(200).json({ status: 200, message: "Blog successfully deleted." })
    } catch (error) {
        console.log(`ERROR in deleting blog ${error}`);
        res.status(400).json({ status: 400 })

    }

}


module.exports = { createBlog, getBlogs, deleteBlogById }