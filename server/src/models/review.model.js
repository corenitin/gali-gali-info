import { Schema, model } from "mongoose";

const reviewSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    product: {
      type: Schema.Types.ObjectId,
      ref: "Product",
    },
    star: {
      type: Number,
      required: true,
      min: 0,
      max: 5,
    },
    text: String,
  },
  { timestamps: true }
);

export const Review = model("Review", reviewSchema);
