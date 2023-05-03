const { createServer } = require("http");
const express = require("express");
const path = require("path")
const cors = require("cors");
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const helmet = require("helmet");

const userRouter = require("../routes/user.routes");
const authRouter = require("../routes/auth.routes");
const eventsRouter = require("../routes/event.routes");
const notificationsRouter = require("../routes/notification.routes");
const conversationRouter = require("../routes/conversation.routes");
const messagesRouter = require("../routes/message.routes");

const commentRoute = require("../routes/comment");
const postRoute = require("../routes/post");

const reviewroute = require("../routes/reviewRoute");
const prodroute = require("../routes/productRoute");
const catroute = require("../routes/categoryRoute");
const gameRoute = require('../routes/game')
const storyRoute = require('../routes/Story')
require('dotenv').config();

const errorHandler = require("../middlewares/error.middleware");





class HttpServer {
    #server;
    static getInstance() {
        if (!this.server) {
            const PORT = process.env.PORT || 8080

            const app = express();
            app.use(bodyParser.urlencoded({ extended: false }))
            app.use(bodyParser.json())
            app.use(cookieParser());


            // Middlewares
            app.use('/static', express.static(path.join(__dirname, 'uploads')))
            app.use("/uploads", express.static("uploads"));


            app.use("/images", express.static(path.join(__dirname, "public/images")));

            app.use(express.json())
            app.use(cors({
                origin: ['http://localhost:3000', 'http://localhost:3001']
            }))
            app.use(errorHandler);

            // app.use(helmet())


            // Rooutes
            app.use('/auth', authRouter);
            app.use('/users', userRouter);
            app.use('/events', eventsRouter);
            app.use('/notifications', notificationsRouter);
            app.use('/conversations', conversationRouter);
            app.use('/messages', messagesRouter);

            // anis
            app.use("/api/posts", postRoute);
            app.use("/api/comments", commentRoute);
            app.use("/api/games", gameRoute)
            app.use("/api/stories", storyRoute)


            // app.use("/api/users/:id", async (req, res) => {
            //     try {
            //         const user = await userModel.findById(req.params.id)
            //         res.status(200).json(user)
            //     }
            //     catch (err) {
            //         return res.status(500).json(err)
            //     }
            // });


            // daly
            app.use("/api/reviews", reviewroute);
            app.use("/api/products", prodroute);
            app.use("/api/categorie", catroute);
            this.server = createServer(app);
        }
        return this.server;
    }
}

module.exports = HttpServer;