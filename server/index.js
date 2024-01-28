import express from 'express';
import dotenv from 'dotenv';
import Razorpay from 'razorpay';
import router from './routes/payment.js'
import cors from 'cors';
import mongoose from 'mongoose';

dotenv.config();

const app = express();
app.use(cors());
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
export const instance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
  });


app.use('/api', router);
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");
  } catch (err) {
    console.log(`DB connection error: ${err}`);
  }
};

mongoose.connection.on("error", (err) => {
  console.log(`DB connection error: ${err}`);
});
app.listen(PORT, () => {
    connectDB();
    console.log(`Server is running on port ${PORT}`);
});