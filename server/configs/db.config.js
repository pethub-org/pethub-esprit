const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = (PORT) => {
    mongoose.connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => {
        console.log("DB connected");
        console.log(`listening on port ${PORT}`);

    }).catch(err => {
        console.log(err);
    })
};

module.exports = connectDB;