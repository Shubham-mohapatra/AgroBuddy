const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const diseaseController = require('../controllers/diseaseController');

// Configure multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../uploads'));
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'plant-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    
    if (extname && mimetype) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed!'));
    }
  }
});

// Disease detection endpoint
router.post('/detect', upload.single('image'), diseaseController.detectDisease);

// Get disease information
router.get('/:diseaseId', diseaseController.getDiseaseInfo);

// Get treatment solutions
router.get('/:diseaseId/solutions', diseaseController.getSolutions);

// Get all supported plants
router.get('/plants/list', diseaseController.getSupportedPlants);

// Get disease statistics
router.get('/stats/overview', diseaseController.getStatistics);

module.exports = router;
