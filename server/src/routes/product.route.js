import { Router } from "express";
import { addProduct } from "../controllers/product.controller.js";

const router = Router();

router.route('/add').post(addProduct);

export default router;