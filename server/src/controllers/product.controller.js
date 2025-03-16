import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { Product } from "../models/product.model.js";
import { Offer } from "../models/offer.model.js";
import mongoose from "mongoose";
import { User } from "../models/user.model.js";

const addProduct = asyncHandler(async (req, res) => {
  const {
    email,
    category,
    title,
    desc,
    images,
    price,
    priceQuanity,
    quanityUnit,
    availableQuantity,
    // quantity,
    // qtyUnit,
    offers,
  } = req.body;

  // console.log(6)
  if (
    !email ||
    !category ||
    !title ||
    !desc ||
    !price || 
    !priceQuanity ||
    !quanityUnit ||
    !availableQuantity
  ) {
    throw new ApiError(409, "All fields are required!");
  }

  const user = await User.findOne({ email });
  if (!user) {
    throw new ApiError(404, "User not found for given email!");
  }
  const userId = user._id;

  const product = await Product.create({
    user: userId,
    category,
    title,
    desc,
    images,
    price: Number(price),
    priceQuanity: Number(priceQuanity),
    quanityUnit,
    availableQuantity: Number(availableQuantity),
    // quantity: Number(quantity),
    // qtyUnit,
    offers,
  });

  return res.status(200).json(
    new ApiResponse(
      201,
      {
        product,
      },
      "Product and Offers created successfully!"
    )
  );
});

const getAll = asyncHandler(async (req, res) => {
  const userId = req.user?._id;
  // console.log(5)
  if (!userId) {
    throw new ApiError(404, "User id not found");
  }

  const products = await Product.find({ user: userId });
  if (!products) {
    throw new ApiError(404, "User id not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, products, "All products fetched successfully!"));
});

const getById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  // console.log(4)
  const productId = new mongoose.Types.ObjectId(id);
  if (!productId) {
    throw new ApiError(404, "Product id not found");
  }

  const product = await Product.findById(productId);
  if (!product) {
    throw new ApiError(404, "Product not found");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, product, "Product fetched successfully!"));
});

const deleteProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;

  // console.log(3)
  const productId = new mongoose.Types.ObjectId(id);
  if (!productId) {
    throw new ApiError(404, "Product id not found");
  }

  const product = await Product.findByIdAndDelete(productId);
  if (!product) {
    throw new ApiError(404, "Error while deleting product!");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, "Product deleted successfully!"));
});

const updateById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const product = req.body;

  // console.log('2')
  if (!id) {
    throw new ApiError(409, "Product id not given!");
  }

  if (!product || Object.keys(product).length === 0) {
    throw new ApiError(400, "Product details not found that need be updated!");
  }

  const updatedProduct = await Product.findByIdAndUpdate(id, product, {
    new: true,
  });
  if (!updatedProduct) {
    throw new ApiError(500, "Error while updating product details!");
  }

  return res.json(
    new ApiResponse(
      200,
      updatedProduct,
      "Product details updated successfully!"
    )
  );
});

const getAllProductsByCategory = asyncHandler(async (req, res) => {
  const { category } = req.params;
  // console.log('1')
  if (!category) {
    throw new ApiError(409, "Category required!");
  }

  const products = await Product.find({ category });
  if (!products) {
    throw new ApiError(404, `Products not found for ${category}!`);
  }

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        products,
        `All products fetched successfully for ${category}`
      )
    );
});

const fetchShopsByPincode = asyncHandler(async (req, res) => {
  const { pincode } = req.params;
  // console.log(0);

  const shops = await User.find({ pincode, role: "business" });
  if (!shops) {
    throw new ApiError(404, `No shops found for pincode-${pincode}`);
  }
  // const products = await Product.aggregate([
  //     {
  //       $lookup: {
  //         from: "users", // This is your User collection name
  //         localField: "user",
  //         foreignField: "_id",
  //         as: "userDetails"
  //       }
  //     },
  //     {
  //       $unwind: "$userDetails"
  //     },
  //     {
  //       $match: {
  //         "userDetails.pincode": pincode,
  //         "userDetails.role": "business"
  //       }
  //     }
  //   ]);
  // console.log(products)

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        shops,
        `All shops fetched for the pincode - ${pincode}.`
      )
    );
});

const getByShopId = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!id) {
    throw new ApiError(409, "Shop id required!");
  }

  const userId = new mongoose.Types.ObjectId(id);
  const user = await User.findById(userId);
  const products = await Product.find({ user: userId });
  if (!products) {
    throw new ApiError(404, "Products not found for given shop!");
  }

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { user, products },
        "All products fetched successfully."
      )
    );
});

export {
  addProduct,
  getAll,
  getById,
  deleteProduct,
  updateById,
  getAllProductsByCategory,
  fetchShopsByPincode,
  getByShopId,
};

// let createdOffers = [];

// if (offers && Array.isArray(offers) && offers.length > 0) {
//     createdOffers = await Promise.all(
//         offers.map(async (offer) => {
//             return await Offer.create({
//                 productId: newProduct._id,
//                 type: offer.type,
//                 details: offer.details,
//                 expiryDate: offer.expiryDate,
//             });
//         })
//     );

//     newProduct.offers = createdOffers.map((offer) => offer._id);
//     await newProduct.save();
// }

// offers: createdOffers
