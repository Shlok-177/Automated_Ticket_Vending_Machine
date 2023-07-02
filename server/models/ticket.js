const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
  mobileNumber: {
    type: String,
    required: true,
  },
  ticketPrice: {
    type: Number,
    required: true,
  },
  sourceStation: {
    type: String,
    required: true,
  },
  destinationStation: {
    type: String,
    required: true,
  },
  ticketQuantity: {
    type: Number,
    required: true,
  },
});

const Ticket = mongoose.model('Ticket', ticketSchema);

module.exports = Ticket;
