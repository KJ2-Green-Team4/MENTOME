const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    userId: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    nickname: {
        type: String,
        required: true
    },
    profilePicture: {
        type: String,
        required: true
    },
    stars: {
        type: Number,
        required: true
    },
    mentoringCount: {
        type: Number,
        required: true
    },
    notices: [
        {
            noticeType: { type: String, required: true },
            noticeSender: { type: String, required: true },
            noticeDate: { type: Date, required: true},
            roomName: { type: String }
        }
    ]
});

module.exports = mongoose.model('User', userSchema);
