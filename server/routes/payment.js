import express from 'express';
import { checkout,payment } from '../controllers/payment.js';
const router = express.Router();
router.route('/checkout').post(checkout);
router.route('/payment').post(payment);
router.route('/getKey').get((req, res) => {
    res.status(200).json({ key: process.env.RAZORPAY_KEY_ID });
})
export default router;