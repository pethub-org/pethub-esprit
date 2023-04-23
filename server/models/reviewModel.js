const mongoose = require ('mongoose')

const reviewSchema = new mongoose.Schema(
  {
    product_id: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Review", reviewSchema);
