const express = require('express');

const router = express.Router();

const contentController = require('../controllers/content');

router.post('/api/content/uploadpost', contentController.uploadPost);

router.post('/api/content/uploadcomment/:_id', contentController.uploadComment);

router.post('/api/content/uploadcommentreply/:_postid/:_id', contentController.uploadCommentReply);

router.get('/api/content/getallcontents', contentController.getAllContents);

router.get('/api/content/getmentocontents', contentController.getMentoContents);

router.get('/api/content/getmenteecontents', contentController.getMenteeContents);

router.get('/api/content/getcontentdetail/:_id', contentController.getContentDetail);

router.get('/api/content/getcontentcomments/:_id', contentController.getContentComments);

module.exports = router;
