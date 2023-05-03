const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    userId: {
      ref: 'User',
      required: true,
      type: mongoose.Schema.Types.ObjectId,

  },
    name: {
      type: String,
      required: true,
    },

    image: {
      type: String,
      required: false,
    },
    category: {
      type: String,
      required: false,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    rating:{
      type:Number , 
      
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Product", productSchema);
