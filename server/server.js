const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const conn = require("./database/conn")

const app = express();
const port = process.env.PORT || 5000;

//create a mongoDB connection
conn();

app.use(cors());
app.use(express.json());


// Use the Station routes
const stations = require('./routes/stations');
app.use('/api', stations);


// Use the ticket routes
const ticketsRouter = require('./routes/ticket');
app.use('/tickets', ticketsRouter);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
