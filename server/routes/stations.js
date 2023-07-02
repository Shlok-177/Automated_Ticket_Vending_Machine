const express = require('express');
const router = express.Router();

const stationsController = require('../controllers/station');

// Route for getting all stations
router.get('/stations', stationsController.getStations);
router.get('/Stationprice', stationsController.getTicketPrice);
router.post('/fixed-source', stationsController.setFixedSource);
router.get('/fixed-source', stationsController.getFixedSourceStation);


module.exports = router;
