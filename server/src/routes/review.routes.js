import { Router } from "express";
import { addReview, getAllReviewsByProduct } from "../controllers/review.controller.js";
import { verifyJWT } from "../middlewares/verifyUser.js";

const router = Router();

router.route('/add').post(verifyJWT, addReview);
router.route('/:id').get(getAllReviewsByProduct);

export default router;