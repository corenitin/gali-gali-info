import { Router } from "express";
import {
  addProduct,
  getAll,
  getById,
  updateById,
  deleteProduct,
  getAllProductsByCategory,
  fetchShopsByPincode,
} from "../controllers/product.controller.js";
import { verifyJWT } from "../middlewares/verifyUser.js";

const router = Router();

router.route("/add").post(verifyJWT, addProduct);
router.route("/").get(verifyJWT, getAll);
router.route("/c/:category").get(getAllProductsByCategory);
router.route("/:pincode").get(verifyJWT, fetchShopsByPincode);
router
  .route("/:id")
  .get(getById)
  .put(verifyJWT, updateById)
  .delete(verifyJWT, deleteProduct);

export default router;
