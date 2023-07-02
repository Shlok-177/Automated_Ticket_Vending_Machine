const mongoose = require('mongoose');

const stationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  code: {
    type: String,
  },
  fixedSource: {
    type: Boolean,
    default: false,
  },
});

const Station = mongoose.model('Station', stationSchema);

module.exports = Station;
