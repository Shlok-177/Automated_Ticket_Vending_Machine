const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const Ticket = require('../models/ticket.js');
const client = require('twilio')(accountSid, authToken);

exports.addTicket = (req, res) => {
    const { mobileNumber, ticketPrice, sourceStation, destinationStation, ticketQuantity } = req.body;

    const newTicket = new Ticket({
        mobileNumber,
        ticketPrice,
        sourceStation,
        destinationStation,
        ticketQuantity,
    });

    newTicket.save()
        .then(() => {
            res.json('Ticket added successfully')
            client.messages
                  .create({
                    body: `Thank you for purchasing a ticket. Here are the details: \nSource: ${sourceStation} \nDestination: ${destinationStation} \nNumber of tickets: ${ticketQuantity} \nAmount paid: ${ticketPrice}`,
                    from: process.env.TWILIO_PHONE_NUMBER,
                    to: "+91"+mobileNumber
                  })
                  .then(message => console.log(message.sid))
                  .catch(err => console.error(err));
        }
        )
        .catch(err => res.status(400).json('Error: ' + err));
};
