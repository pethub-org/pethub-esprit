const Review = require("../models/reviewModel");
const route = require("express").Router();

route.post("/:id", async (req, res) => {
  const id = req.params.id;
  const review = new Review({
    product_id: id,
    description: req.body.description,
  });
  try {
    const p1 = await review.save();
    res.json(p1);
  } catch (err) {
    res.send("Error");
  }
});
route.get("/:product_id", async (req, res) => {
  try {
    const review = await Review.find({
      product_id: req.params.product_id,
    });

    res.json(review);
    console.log(review);
  } catch (err) {
    res.send("Error" + err);
  }
});
route.get("/", async (req, res) => {
  try {
    const review = await Review.find();
    res.json(review);
    console.log(review);
  } catch (err) {
    res.send("Error" + err);
  }
});



route.delete("/:id", async (req, res) => {
  try {
    const review = await Review.findByIdAndDelete(req.params.id);
    res.json(review);
    console.log("sucess");
  } catch (err) {
    res.send("Error" + err);
  }
});
module.exports= route;
