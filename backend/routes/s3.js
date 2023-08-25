const express = require('express');

const router = express.Router();

const s3Controller = require('../controllers/s3');

router.post('/api/s3/upload', s3Controller.s3upload);

module.exports = router;
