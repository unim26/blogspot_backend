const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,

    },
    description:{
        type: String,
        required: true,
    },
    thumbnail:{
        type: String,
        default:'',
        required: true,
    },
    author:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    comments:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment',
        
    }],
    likes:{
        type: Number,
        default: 0,
    },
    
},{timestamps: true});

const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;