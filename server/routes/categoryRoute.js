const Category = require('../models/categoryModel');
const catroute = require('express').Router();

catroute.get("/", async (req, res) => {
  try {
    const categorie = await Category.find();
    res.json(categorie);
    console.log(categorie);
  } catch (err) {
    res.send("Error" + err);
  }
});
catroute.get("/:id", async (req, res) => {
  try {
    const categorie = await Category.findById(req.params.id);
    res.json(categorie);
  } catch (err) {
    res.send("Error" + err);
  }
});

catroute.post("/", async (req, res) => {
  console.log(req.file);
  const categorie = new Category({
    name: req.body.name,
  });
  try {
    const p1 = await categorie.save();
    res.json(p1);
  } catch (err) {
    res.send("Error");
  }
});
catroute.put("/:id", async (req, res) => {
  try {
    const prod = await Category.findByIdAndUpdate(req.params.id, req.body);
    res.json(prod);
  } catch (err) {
    res.send("Error");
  }
});
catroute.delete("/:id", async (req, res) => {
  try {
    const categorie = await Category.findByIdAndDelete(req.params.id);
    res.json(categorie);
    console.log("sucess");
  } catch (err) {
    res.send("Error" + err);
  }
});
module.exports = catroute;
