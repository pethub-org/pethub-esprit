const Review = require("../models/reviewModel");
const Product = require("../models/produtModel");
const route = require("express").Router();
const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage: storage,
  // limits: {
  //   fileSize: 100 * 180,
  // },
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
    // image: req?.file?.path, 
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

route.post("/reviewpost/:product_id", async (req, res) => {
  const id = req.params.id;
  const review = new Review({
    product_id: id,
    description: req.body.description,
  });
  try {
    const r1 = await review.save();
    res.json(r1);
  } catch (err) {
    res.send("Error");
  }
});
route.get("/review/:product_id", async (req, res) => {
  try {
    const review = await Review.find({
      product_id: req.params.product_id,
    });

    res.json(review);
    console.log(review);
  } catch (err) {
    res.send("Error" + err);
    console.log(err);
  }
});
route.get("/review/", async (req, res) => {
  try {
    const review = await Review.find();
    res.json(review);
    console.log(review);
  } catch (err) {
    res.send("Error" + err);
    console.log(err);
  }
});
route.get("/search", async (req, res) => {
  const name = req.query.name;
  try {
    const results = await Product.find({ $text: { $search: name } });
    res.json(results);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
});
module.exports = route;
