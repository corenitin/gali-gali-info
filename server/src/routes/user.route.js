import { Router } from "express";
import { registerUser, loginUser, logoutUser, getUserById, getUser } from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/verifyUser.js";

const router = Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").post(verifyJWT, logoutUser);
router.route('/get').get(verifyJWT, getUser)
router.route('/:id').get(getUserById);


export default router;