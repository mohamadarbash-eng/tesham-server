const express = require('express');
const checkAuth = require('./../../middlewares/check-auth');
const extractFile = require('./../../middlewares/extract-file');
const mediaController = require('./media-routes-controller');
const router = express.Router();


/**
 * Media restful API requests
 */
router.post('/api/image',extractFile,mediaController.postImage);
router.delete('/api/image/:filePath' ,mediaController.deleteImage);
router.get('/api/image/link', mediaController.getImagesLink);

module.exports = router;

