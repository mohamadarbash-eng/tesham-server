const express = require('express');

const courseController = require('./user-routes-controller');
const router = express.Router();


/**
 * Course restful API requests
 */

router.post('/api/user/signup', courseController.postNewUser);
router.post('/api/user/login', courseController.postUserCredentials);

module.exports = router;
