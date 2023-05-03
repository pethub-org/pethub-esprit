const route = require("express").Router();
const Order = require('../models/orderModel');

route.get("/", async (req, res) => {
    try {
      const orders = await Order.find();
      res.json(orders);
      console.log(orders);
    } catch (err) {
      res.send("Error" + err);
    }
  });

  route.post("/:productid", async (req, res) => {
    const productid = req.params.productid;
   const isproductAllreadyexiste = await Order.findOne({productid: productid});
   if(isproductAllreadyexiste){
    return res.json({ message: `product already being saved` })
   }else{
    const order = new Order({
      productid: productid,
      name: req.body.name,
      price: req.body.price,
    });
 
   
   try {
    const p1 = await order.save();
    res.json(p1); 
     console.log(p1);
  } catch (err) {
    // Handle any errors that occur while saving the order
    console.error(`Error saving order for product ${productid}`, err);
  }
}
});

   
   
 
  
  



route.delete("/:id", async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    res.json(order);
    console.log("sucess");
  } catch (err) {
    res.send("Error" + err);
  }
});
  
module.exports = route;