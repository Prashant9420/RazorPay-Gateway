import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
    paymentId: {
        type: String,
        required: true
    },
    orderId: {
        type: String,
        required: true
    },
    signature: {
        type: String,
        required: true
    }
});

export default mongoose.model('Payment', paymentSchema);
