import { Schema, model } from "mongoose";

const reviewSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  productId: {
    type: Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  rating: {
    type: String,
    min: 1,
    max: 5,
  },
  comment: {
    type: String,
    trim: true,
    maxLength: 500,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const Review = model("Review", reviewSchema);
