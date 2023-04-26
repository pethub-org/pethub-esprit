const Review = require("../models/reviewModel");
const Product = require("../models/produtModel");
const route = require("express").Router();
const multer = require("multer");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage: storage,
});
route.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
    console.log(products);
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
route.post("/", upload.single("image"), async (req, res) => {
  console.log("request", req.file);
  const product = new Product({
    name: req.body.name,
    image: req.file.path,
    category: req.body.category,
    description: req.body.description,
    price: req.body.price,
  });
  try {
    const p1 = await product.save();
    res.json(p1);
  } catch (err) {
    res.send("Error");
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
route.put("/:id", async (req, res) => {
  try {
    const prod = await Product.findByIdAndUpdate(req.params.id, req.body);
    res.json(prod);
  } catch (err) {
    res.send("Error");
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
