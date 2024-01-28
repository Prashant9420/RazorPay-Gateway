import { instance } from "../index.js";
import crypto from "crypto";
import Payment from "../models/payment.js";
// import paymentSchema from "../models/payment.js";
export const checkout = async (req, res) => {
  const options = {
    amount: req.body.price,
    currency: "INR",
  };
  const order = await instance.orders.create(options);
//   console.log(order);
  res.status(200).json({success: true, order});
};
export const payment = async (req, res) => {
  console.log(req.body);
  const { razorpay_payment_id, razorpay_order_id, razorpay_signature, error } = req.body;
  if (error) {
    return res.status(503).json({ success: false, error });
  }
  const data = razorpay_order_id + "|" + razorpay_payment_id;
  const generated_signature = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET).update(data).digest('hex');
  if (generated_signature === razorpay_signature) {
    console.log("payment is successful");
    const payment = new Payment({
      paymentId: razorpay_payment_id,
      orderId: razorpay_order_id,
      signature: razorpay_signature
    });
    await payment.save();
    // res.redirect(`http://localhost:3000/paymentsuccess?reference=${razorpay_payment_id}`);
    res.redirect(`https://razor-pay-gateway.vercel.app/paymentsuccess?reference=${razorpay_payment_id}`);
  } else {
    res.status(503).json({ success: false, message: 'invalid razorpay signature' });
  }
};
