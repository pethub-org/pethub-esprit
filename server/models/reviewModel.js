import mongoose from "mongoose";

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
const Review = mongoose.model("Review", reviewSchema);
export default Review;
