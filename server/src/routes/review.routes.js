import { Router } from "express";
import {
  addReview,
  getAllReviewsByProduct,
  getReviewById,
} from "../controllers/review.controller.js";
import { verifyJWT } from "../middlewares/verifyUser.js";

const router = Router();

router.route("/add").post(verifyJWT, addReview);
router.route("/product/:id").get(getAllReviewsByProduct);
router.route("/:id").get(getReviewById);

export default router;
