const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const postSchema = new Schema({
    postType: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    writer: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    sport: {
        type: String,
        required: true,
    },
    career: {
        type: String,
        required: true,
    },
    comments: [
        {
            commentContent: { type: String, required: true },
            commentWriter: { type: String, required: true },
            commentDate: { type: Date, required: true },
            commentReplies: [
                {
                    replyContent: { type: String, required: true },
                    replyWriter: { type: String, required: true },
                    replyDate: { type: Date, required: true }
                }
            ]
        }
    ]
});

module.exports = mongoose.model('Post', postSchema);
