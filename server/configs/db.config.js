const mongoose = require("mongoose");

const connectDB = () => {
    mongoose.connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => {
        console.log("DB connected");
    }).catch(err => {
        console.log(err);
    })
};

module.exports = connectDB;