import mongoose, { Schema } from "mongoose";

const dashboardSchema = new Schema({
    totalSales: {
        type: Number,
        default: 0
    },
    totalCarsListed: {
        type: Number,
        default: 0
    },
    totalUsers: {
        type: Number,
        default: 0
    },
    totalReviews: {
        type: Number,
        default: 0
    },
    salesByCategory: [{
        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category",
            required: true
        },
        count: {
            type: Number,
            default: 0
        },
        totalRevenue: {
            type: Number,
            default: 0
        }
    }],
    monthlySales: [{
        month: {
            type: String, // e.g., "January", "February"
            required: true
        },
        year: {
            type: Number,
            required: true
        },
        totalSales: {
            type: Number,
            default: 0
        }
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

const Dashboard = mongoose.models.Dashboard || mongoose.model("Dashboard", dashboardSchema);

export default Dashboard;