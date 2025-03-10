import { Router } from "express";
import { addProduct, getAll, getById, updateById, deleteProduct, getAllProductsByCategory } from "../controllers/product.controller.js";
import { verifyJWT } from "../middlewares/verifyUser.js";

const router = Router();

router.route('/add').post(verifyJWT, addProduct);
router.route('/').get(verifyJWT, getAll);
router.route('/:id').get(getById).put(verifyJWT, updateById).delete(verifyJWT, deleteProduct);
router.route('/c/:category').get(getAllProductsByCategory);

export default router;