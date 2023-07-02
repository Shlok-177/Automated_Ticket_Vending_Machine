const fs = require('fs');
const path = require('path');
const Station = require('../models/station.js');
const staticData = require('../stations.json');

const stationsFilePath = path.join(__dirname, '../stations.json');

// Controller function to handle GET requests for all tickets
exports.getStations = (req, res) => {
  fs.readFile(stationsFilePath, 'utf8', (err, data) => {
    if (err) {
      res.status(500).json({ message: err.message });
    } else {
      const stations = JSON.parse(data);
      res.json(stations);
    }
  });
};

exports.getTicketPrice = (req, res) => {
  const { destination } = req.query;

  const station = staticData.find(station => station.name === destination);

  if (station) {
    res.json({ price: station.price });
  } else {
    res.status(404).json({ error: 'Station not found' });
  }
};


exports.setFixedSource = async (req, res) => {
  try {
    const { sourceStation, stationCode } = req.body;

    const newStation = new Station({
      name: sourceStation,
      fixedSource: true
    });

    const savedStation = await newStation.save();
    res.json(savedStation);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getFixedSourceStation = async (req, res) => {
  try {
    const fixedSourceStation = await Station.findOne({ fixedSource: true });

    if (fixedSourceStation) {
      res.json(fixedSourceStation);
    } else {
      res.status(404).json({ message: 'Fixed source station not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};