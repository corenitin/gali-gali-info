import { shopSockets } from "../index.js";
import { Notification } from "../models/notification.model.js";
import { Order } from "../models/order.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const placeOrder = asyncHandler(async (req, res) => {
  const customer = req.user;
  const { shop, products, noOfProducts, totalAmount } = req.body;

  if (!customer) {
    throw new ApiError(401, "Unautherized request!");
  }

  if (
    !shop ||
    !noOfProducts ||
    !totalAmount ||
    Object.keys(products).length === 0
  ) {
    throw new ApiError(409, "All fields are required!");
  }

  const order = await Order.create({
    customer,
    shop,
    products,
    noOfProducts,
    totalAmount,
  });

  if (!order) {
    throw new ApiError(500, "Error while placing the order!");
  }

  const notification = await Notification.create({
    sender: customer,
    reciever: shop,
    order: order?._id,
  });

  if (!notification) {
    throw new ApiError(500, "Error while craeting notification!");
  }

  const shopSocketId = shopSockets.get(shop.toString());
  if (shopSocketId) {
    req.io.to(shopSocketId).emit("newNotification", notification);
  } else {
    console.log("Shop is offline. Notification will be stored in DB.");
  }

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { order, notification },
        "Order placed successfully."
      )
    );
});

export { placeOrder };
