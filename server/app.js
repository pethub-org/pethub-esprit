const express = require("express");
const connectDB = require('./configs/db.config')
const cors = require("cors");
const cookieParser = require('cookie-parser');
const helmet = require("helmet");
const multer = require("multer");

require('dotenv').config()

const PORT = process.env.PORT || 8080

const userRouter = require("./routes/user.routes");
const authRouter = require("./routes/auth.routes");

const app = express();


// Middlewares
app.use(express.json())
app.use(cors({
    origin: 'http://localhost:3000'
}))
app.use(helmet())
app.use(cookieParser());


// Rooutes
app.use('/auth', authRouter);
app.use('/users', userRouter);


app.listen(PORT, () => {
    connectDB();
    console.log(`listening on port ${process.env.PORT}`);
})