import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    profileImage: {
        type: String,
        default: "avatar.png",
    },
    googleId: {
        type: String,
    },
    verifyToken: {
        type: String,
    },
    verifyTokenExpiry: {
        type: Date,
    },
    forgotPasswordToken: {
        type: String,
    },
    forgotPasswordTokenExpiry: {
        type: Date,
    },
    role: {
        type: String,
        enum: ['user', 'admin', 'seller'],
        default: 'user'
    },
    phoneNumber: {
        type: String,
    },
    listedCars: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Car"
    }],
    purchasedCars: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Car"
    }],
    reviews: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Review"
    }],
    lastLogin: {
        type: Date
    }
}, { timestamps: true });

const User = mongoose.models.users || mongoose.model("User", userSchema);

export default User;