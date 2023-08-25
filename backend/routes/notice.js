const express = require('express');

const router = express.Router();

const noticeController = require('../controllers/notice');

router.post('/api/notice/addcommentnotice/:_id', noticeController.addCommentNotice);

router.post('/api/notice/addinvitenotice/:userid', noticeController.addInviteNotice);

router.get('/api/notice/getusernotices', noticeController.getUserNotices);

router.get('/api/notice/getnoticetimer', noticeController.getNoticeTimer);

module.exports = router;
