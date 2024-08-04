
import mongoose, { Schema } from "mongoose";

const orderSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    car: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Car",
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        min: 1
    },
    totalPrice: {
        type: Number,
        required: true
    },
    orderStatus: {
        type: String,
        enum: ["pending", "completed", "shipped", "delivered", "canceled"],
        default: "pending"
    },
    paymentMethod: {
        type: String,
        enum: ["upi", "creditcard"],
        required: true
    },
    shippingAddress: {
        type: String,
        required: true
    },
    orderDate: {
        type: Date,
        default: Date.now
    },
    deliveredDate: {
        type: Date
    }
}, { timestamps: true });

const Order = mongoose.models.orders || mongoose.model("Order", orderSchema);

export default Order;