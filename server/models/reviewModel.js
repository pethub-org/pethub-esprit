const mongoose = require ('mongoose')

const reviewSchema = new mongoose.Schema(
  {
    userId: {
      ref: 'User',
      required: true,
      type: mongoose.Schema.Types.ObjectId,

  },

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
