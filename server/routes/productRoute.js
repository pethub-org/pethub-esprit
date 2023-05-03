const Review = require("../models/reviewModel");
const Product = require("../models/produtModel");
const route = require("express").Router();
const multer = require("multer");
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
      callback(null, "C:/Users/USER/Documents/GitHub/pethub-esprit/client/public/uploads");
  },

  filename: (req, file, callback) => {
      callback(null, Date.now() + file.originalname);
  }
})

const upload = multer({
  storage: storage,
});
route.get("/", async (req, res) => {
  try {
    const sort = req.query.sort || 'price'; // Default sort by price
    const sortOrder = req.query.sortOrder || 'asc'; // Default sort order ascending
    const products = await Product.find({}).sort({ [sort]: sortOrder });
    res.json(products);

  } catch (err) {
    res.send("Error" + err);
  }
});
route.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.json(product);
  } catch (err) {
    res.send("Error" + err);
  }
});

route.get("/bycategory/:categoryId", async (req, res) => {
  try {
    const products = await Product.find({
      category: req.params.categoryId,
    });
    res.json(products);
    console.log("good");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
route.post("/", async (req, res) => {
   const newPost = new Product(req.body)
  try {
    const savedProduct = await newPost.save();
    res.status(200).json(savedProduct)
  }
  catch (err) {
    res.status(500).json(err)
  }

});
// route.post("/review", async (req, res) => {
//   const { comment, name, productId } = req.body;
//   const product = await Product.findById(productId);

//   const review = new Review({
//     name,
//     comment,
//   });

//   try {
//     product.reviews.push(review);
//     const p1 = await review.save();
//     res.json(p1);
//   } catch (err) {
//     res.send("Error");
//   }
// });

route.put('/update/:id', async (req, resp, next) => {

  try {
    const requestBody = {   
      name: req.body.name,
      category: req.body.category,

      description: req.body.description,
      price: req.body.price, };

    let emp_rec = await Product.findById(req.params.id);

    if (!emp_rec)
    return res.status(404).json({ msg: 'Employee record not found' });

    const updatedEmp = await Product.findByIdAndUpdate(
      req.params.id, requestBody, { new: true });

    resp.json(updatedEmp);

  } catch (error) {
    next(error);
  }
});

route.delete("/:id", async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    res.json(product);
    console.log("sucess");
  } catch (err) {
    res.send("Error" + err);
  }
});

module.exports = route;