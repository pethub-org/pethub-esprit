import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import prodroute from "./routes/productRoute.js";
import reviewroute from "./routes/reviewRoute.js";
import catroute from "./routes/categoryRoute.js";
dotenv.config();

const app = express();
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("connected to db");
  })
  .catch((err) => {
    console.log(err.message);
  });
app.use(cors());
app.use("/uploads", express.static("uploads"));

app.use(express.json());
app.use("/api/reviews", reviewroute);
app.use("/api/products", prodroute);
app.use("/api/categorie", catroute);
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log("server is good ");
});
