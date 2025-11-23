const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// User profile endpoints
router.get('/profile/:userId', userController.getUserProfile);
router.put('/profile/:userId', userController.updateUserProfile);

// User diagnosis history
router.get('/:userId/history', userController.getDiagnosisHistory);
router.post('/:userId/history', userController.saveDiagnosis);
router.delete('/:userId/history/:diagnosisId', userController.deleteDiagnosis);

// User statistics
router.get('/:userId/stats', userController.getUserStats);

module.exports = router;
