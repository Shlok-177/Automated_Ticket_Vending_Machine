const express = require('express');
const router = express.Router();
const ticketController = require('../controllers/ticket.js');

router.route('/add').post(ticketController.addTicket);

module.exports = router;
