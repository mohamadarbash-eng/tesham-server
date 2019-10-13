const express = require('express');
const checkAuth = require('./../../middlewares/check-auth');
const extractFile = require('./../../middlewares/extract-file');
const diplomaController = require('./diploma-routes-controller');
const router = express.Router();


/**
 * Diplomas restful API requests
 */
router.post('/api/diploma', extractFile, diplomaController.postDiploma);
router.get('/api/diplomas', diplomaController.getDiplomas);
router.get('/api/diploma/:id', diplomaController.getDiplomaByID);
router.delete('/api/diploma/:id', checkAuth, diplomaController.deleteDiploma);
router.put('/api/diploma/:id', extractFile, diplomaController.updateDiploma);
router.get('/api/diplomas/count', diplomaController.getDiplomasCount);
router.get('/api/diploma/details/:diplomaName', diplomaController.getDiplomaDetails);

module.exports = router;
