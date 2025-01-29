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
        default: 'https://www.google.com/imgres?q=sample%20thumbnail&imgurl=https%3A%2F%2Fimg.freepik.com%2Fpremium-psd%2Fyoutube-video-thumbnail-web-banner-template-business_475351-202.jpg&imgrefurl=https%3A%2F%2Fwww.freepik.com%2Fpremium-psd%2Fyoutube-video-thumbnail-web-banner-template-business_33456949.htm&docid=t2AJG82oye27PM&tbnid=xC4-8bjWqw3oBM&vet=12ahUKEwiPnrXlv4eLAxUERCoJHRawAEAQM3oECGcQAA..i&w=626&h=352&hcb=2&ved=2ahUKEwiPnrXlv4eLAxUERCoJHRawAEAQM3oECGcQAA',
        required: true,
    },
    author:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        // default: "678fc5eaed48b35d211bbab3",
        required: true,
    },
    // comments:[{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'Comment',
        
    // }],
    likes:{
        type: Number,
        default: 0,
    },
    
},{timestamps: true});

const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;