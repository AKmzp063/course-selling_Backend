import express from 'express';
import {isAuthenticated} from "../middleware/auth.js";
import { buySubscription, cancelSubscription, getRazorpayKey, paymentVerification } from '../controllers/paymentController.js';

const router = express.Router();

//Buy Subscription
router.route("/subscribe").get(isAuthenticated, buySubscription);

//Payment Verification & save reference in database
router.route("/paymentverification").post(isAuthenticated, paymentVerification);

//get razorpay key
router.route("/getrazorpaykey").get(getRazorpayKey);

//Cancel subscription
router.route("/subscribe/cancel").delete(isAuthenticated, cancelSubscription)

export default router;