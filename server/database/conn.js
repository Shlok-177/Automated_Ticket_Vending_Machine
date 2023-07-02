const mongoose = require("mongoose")
const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, '../.env') })


const connectDB = async () => {

    try{
        console.log("hello in mongo");
        mongoose.connect("mongodb+srv://shlok177:963852741@cluster0.xs9yeow.mongodb.net/TicketVendingMachine",{
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        .then((res) => {
            console.log("hello in mongo inside then");
            console.log("DB connected");
        })
        .catch((e) => {
            console.log("hello in mongo outside then");
            console.log(e);
        })
    }
    catch(err){
        console.log(err);
    }
}

module.exports = connectDB