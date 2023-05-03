const Review = require("../models/reviewModel");
const route = require("express").Router();

route.post("/:id", async (req, res) => {
  const id = req.params.id;
  const review = new Review({
    product_id: id,
    userId: req.body.userId,
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



route.put('/update/:id', async (req, resp, next) => {

  try {
    const requestBody = {   


      description: req.body.description,
   };

    let emp_rec = await Review.findById(req.params.id);

    if (!emp_rec)
    return res.status(404).json({ msg: 'Review record not found' });

    const updatedEmp = await Review.findByIdAndUpdate(
      req.params.id, requestBody, { new: true });

    resp.json(updatedEmp);

  } catch (error) {
    next(error);
  }
});
module.exports= route;
