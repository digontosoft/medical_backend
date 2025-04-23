const express = require('express');
const router = express.Router();
const softwareController = require('../controllers/softwareController');

// GET all software
router.get('/software', softwareController.getAllSoftware);

// GET a single software by ID
router.get('/software/:id', softwareController.getSoftwareById);

// POST create a new software
router.post('/software', softwareController.createSoftware);

// PUT update a software
router.put('/software/:id', softwareController.updateSoftware);

// DELETE a software
router.delete('/software/:id', softwareController.deleteSoftware);

module.exports = router; 