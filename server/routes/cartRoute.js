const express = require('express');
const router = express.Router();
const {Cart} = require("../models/Cart")

const {Product} = require("../models/produtModel")
const {auth} = require("../middlewares/auth.middleware");
router.post("/addToCart" , auth , async (req , res) => {
const customerCart = await Cart.findOne({_userId: req.u})
})