const mongoose = require('mongoose')
const orderDetailSchema  = require('./orderModel').OrderDetailSchema.Schema;
const cartSchema = mongoose.Schema({
    _userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
        require: true,
    },
    cartDetails:[{
        type: orderDetailSchema,
    },]
})

module.exports = mongoose.model("carts", cartSchema);