const express = require("express");
const connectDB = require('./configs/db.config')
const cors = require("cors");
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const helmet = require("helmet");
require('dotenv').config()
const PORT = process.env.PORT || 8080

const userRouter = require("./routes/user.routes");
const authRouter = require("./routes/auth.routes");
const eventsRouter = require("./routes/event.routes");

const app = express();
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cookieParser());


// Middlewares
app.use(express.json())
app.use(cors({
    origin: 'http://localhost:3000'
}))
// app.use(helmet())


// Rooutes
app.use('/auth', authRouter);
app.use('/users', userRouter);
app.use('/events', eventsRouter);


app.listen(PORT, () => {
    connectDB();
    console.log(`listening on port ${process.env.PORT}`);
})