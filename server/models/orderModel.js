const mongoose = require("mongoose");
const OrderDetailSchema = mongoose.Schema({

    userId: {
        ref: 'User',
        required: true,
        type: mongoose.Schema.Types.ObjectId,
  
    },
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