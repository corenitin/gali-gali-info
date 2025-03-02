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
        quantity,
        qtyUnit,
        offers
    } = req.body;

    if (!email || !category || !title || !desc || !qtyUnit || !price || !quantity) {
        throw new ApiError(409, "All fields are required!");
    }

    const user = await User.findOne({ email })
    if(!user) {
        throw new ApiError(404, "User not found for given email!")
    }
    const userId = user._id;

    const product = await Product.create({
        user: userId,
        category,
        title,
        desc,
        images,
        price: Number(price),
        quantity: Number(quantity),
        qtyUnit,
        offers
    });

    return res.status(201).json(new ApiResponse(201, {
        product,
    }, "Product and Offers created successfully!"));
});

export { addProduct };

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