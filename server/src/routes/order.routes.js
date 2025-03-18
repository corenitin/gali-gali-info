import { Router } from 'express';
import { placeOrder } from '../controllers/order.controller.js';
import { verifyJWT } from '../middlewares/verifyUser.js';

const router = Router();

router.route('/place').post(verifyJWT, placeOrder);

export default router;