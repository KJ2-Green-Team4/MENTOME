const Post = require('../models/post');
const User = require('../models/user');

// Add Comment Notice
exports.addCommentNotice = (req, res) => {
    const getCookies = req.get('Cookie');
    const cookies = Object.fromEntries(getCookies.split('; ').map(cookie => cookie.split('=')));
    if (cookies.logInUser) {
        let newNotice = {};
        newNotice.noticeType = 'comment';
        newNotice.noticeSender = cookies.logInUser;
        newNotice.noticeDate = Date();
        Post.findOne({ _id: req.params._id })
            .then(post => {
                if (cookies.logInUser != post.writer) {
                    User.findOne({ userId: post.writer })
                        .then(user => {
                            user.notices.push(newNotice);
                            User.findOneAndUpdate({ userId: post.writer }, user)
                                .then(user => {
                                    res.json({
                                        addCommentNoticeSuccess: true,
                                        message: "댓글 알림 추가 성공"
                                    });
                                    console.log("Add Comment Notice success");
                                });
                        });
                }
            });
    } else {
        res.json({ 
            addCommentNoticeSuccess: false,
            message: "로그인 후 시도하세요."
        });
        console.log('Upload Comment Fail! (NOT LOG IN)');
    }
};

// Add Invite Notice
exports.addInviteNotice = (req, res) => {
    const getCookies = req.get('Cookie');
    const cookies = Object.fromEntries(getCookies.split('; ').map(cookie => cookie.split('=')));
    const newRoomName = cookies.logInUser + '-' +req.params.userid;
    if (cookies.logInUser) {
        let newNotice = {};
        newNotice.noticeType = 'invite';
        newNotice.noticeSender = cookies.logInUser;
        newNotice.noticeDate = Date();
        newNotice.roomName = newRoomName;
        User.findOne({ userId: req.params.userid })
            .then(user => {
                user.notices.push(newNotice);
                User.findOneAndUpdate({ userId: req.params.userid }, user)
                    .then(user => {
                        console.log("Add Invite Notice success");
                    });
            });
        
        let otherNotice = {};
        otherNotice.noticeType = 'invite';
        otherNotice.noticeSender = req.params.userid;
        otherNotice.noticeDate = Date();
        otherNotice.roomName = newRoomName;
        User.findOne({ userId: cookies.logInUser })
            .then(user => {
                user.notices.push(otherNotice);
                User.findOneAndUpdate({ userId: cookies.logInUser }, user)
                    .then(user => {
                        res.json({
                            addInviteNoticeSuccess: true,
                            message: "초대 알림 추가 성공"
                        });
                        console.log("Add Invite Notice success");
                    })
            });
    } else {
        res.json({ 
            addCommentNoticeSuccess: false,
            message: "로그인 후 시도하세요."
        });
        console.log('Upload Comment Fail! (NOT LOG IN)');
    }
};

//Get User Notices
exports.getUserNotices = (req, res) => {
    const getCookies = req.get('Cookie');
    const cookies = Object.fromEntries(getCookies.split('; ').map(cookie => cookie.split('=')));
    if (cookies.logInUser) {
        User.findOne({ userId: cookies.logInUser })
            .then(user => {
                res.json(user.notices);
                console.log("Get User Notices success");
            });
    }
};

//Send Notice Timer
exports.getNoticeTimer = (req, res) => {
    const currentTime = new Date();
    res.json({ currentTime });
};