import mongoose, { Schema } from "mongoose";

const reviewSchema = new Schema({
    car: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Car",
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    text: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    carImage: {
        type: String,
    }
}, { timestamps: true });

const Review = mongoose.models.reviews || mongoose.model("Review", reviewSchema);

export default Review;