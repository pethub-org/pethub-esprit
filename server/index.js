const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const postRoute = require("./routes/post");
const reviewroute = require("./routes/reviewRoute");
const prodroute = require("./routes/productRoute");
const commentRoute = require("./routes/comment");
const catroute = require("./routes/categoryRoute");
const multer = require("multer");
const path = require("path");
dotenv.config();

//connect mongodb
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log("connected to db and port ", process.env.PORT);
    });
  })
  .catch((err) => {
    console.log(err);
  });

//middelware
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));
app.use(cors());
console.log(path.join(__dirname, "public", "images"));
app.use("/uploads", express.static("uploads"));

app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/posts", postRoute);
app.use("/api/comments", commentRoute);
app.use("/api/reviews", reviewroute);
app.use("/api/products", prodroute);
app.use("/api/categorie", catroute);

app.use("/images", express.static(path.join(__dirname, "public/images")));
//upload file  destination
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});

const upload = multer({ storage });
app.post("/api/upload", upload.single("file"), async (req, res) => {
  try {
    const file = req.file;
    const fileName = Date.now() + "-" + file.originalname;
    const filePath = path.join(__dirname, "/public/images", fileName);

    // save the image to the file system
    await fs.promises.writeFile(filePath, file.buffer);

    // return the URL of the saved image to the client-side
    const imageUrl = `http://localhost:${PORT}/images/${fileName}`;
    return res.status(200).json({ imageUrl });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
});
