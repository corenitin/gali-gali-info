import mongoose from "mongoose";
import { Review } from "../models/review.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Product } from "../models/product.model.js";

const getAllReviewsByProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  // console.log(id)
  if (!id) {
    throw new ApiError(409, "Product id is required!");
  }

  const productId = new mongoose.Types.ObjectId(id);
  // console.log(productId)
  const reviews = await Review.find({ product: productId });
  if (!reviews) {
    throw new ApiError(404, "No reviews found this product!");
  }

  console.log(reviews)
  return res
    .status(200)
    .json(new ApiResponse(200, reviews, "Reviews fetched successfully."));
});

const addReview = asyncHandler(async (req, res) => {
  const { productId, star, text } = req.body;

  console.log(productId, star, text)
  if (!productId || !text) {
    throw new ApiError(409, "All fields are required!");
  }

  const user = req?.user?._id;
  if (!user) {
    throw new ApiError(401, "You need to login to access this feature!");
  }
  // console.log(user)

  const product = new mongoose.Types.ObjectId(productId);
  if (!product) {
    throw new ApiError(
      500,
      "Something went wrong while converting ti the mongoose ObjectId!"
    );
  }

  const item = await Product.findById(product);
  const overallRating = item?.overallRating;
  const reviews = item?.reviews;

  const review = await Review.create({
    user,
    product,
    star,
    text,
  });
  if (!review) {
    throw new ApiError(500, "Error while creating review document!");
  }

  item.reviews.push(review?._id);

  const totalReviews = reviews.length;
  console.log(totalReviews)
  let allReviews = [];
  for (const reviewId of item.reviews) {
    const review = await Review.findById(reviewId);
    allReviews.push(review);
  }

//   console.log(allReviews);
  const totalStars = allReviews.reduce((sum, review) => sum + review.star, 0);
  console.log(totalStars);
  const newOverallRating = totalStars / totalReviews;
  console.log(newOverallRating)

  item.overallRating = newOverallRating;
  item.save();

  // console.log(review._id)

  return res
    .status(200)
    .json(new ApiResponse(200, { review, rate: overallRating }, "Review create successfully."));
});

const getReviewById = asyncHandler(async(req, res) => {
    const { id } = req.params;
    if(!id) {
        throw new ApiError(409, "Review id is required!")
    }

    const review = await Review.findById(id);
    if(!review) {
        throw new ApiError(404, "Review not found!")
    }

    return res
    .status(200)
    .json(
        new ApiResponse(200, review, "Review fetched successfully.")
    )
})

export { getAllReviewsByProduct, addReview, getReviewById };
