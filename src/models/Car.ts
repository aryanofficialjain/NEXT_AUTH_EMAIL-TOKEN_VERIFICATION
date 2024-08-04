import mongoose, { Schema } from "mongoose";

const carSchema = new Schema({
    brand: {
        type: String,
        required: true
    },
    made: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: ["sedan", "suv", "supercar", "luxuarycar", "conceptcar"],
        default: "sedan"
    },
    price: {
        type: Number,
        required: true
    },
    mileage: {
        type: Number,
        required: true
    },
    fuelType: {
        type: String,
        required: true
    },
    transmission: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    images: [{
        type: String,
        required: true
    }],
    videos: [{
        type: String
    }],
    seller: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    reviews: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Review"
    }],
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true });

const Car = mongoose.models.cars || mongoose.model("Car", carSchema);

export default Car;