import { model, Schema } from "mongoose";

const orderSchema = new Schema(
  {
    customer: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    shop: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    products: [
      {
        type: Object,
        required: true,
    },
    ],
    noOfProducts: Number,
    totalAmount: Number,
  },
  { timestamps: true }
);

export const Order = model("Order", orderSchema);
