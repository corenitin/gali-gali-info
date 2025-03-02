import { Router } from "express";
import { addProduct, getAll, getById, deleteProduct } from "../controllers/product.controller.js";
import { verifyJWT } from "../middlewares/verifyUser.js";

const router = Router();

router.route('/add').post(verifyJWT, addProduct);
router.route('/').get(verifyJWT, getAll);
router.route('/:id').get(verifyJWT, getById).delete(verifyJWT, deleteProduct)

export default router;