const mongoose = require("mongoose");
const OrderDetailSchema = mongoose.Schema({

    productid:{
      type:String,
    },
    price:{
        type:Number,
    },
    name:{
        type:String,
    },
})
module.exports = mongoose.model("order", OrderDetailSchema);