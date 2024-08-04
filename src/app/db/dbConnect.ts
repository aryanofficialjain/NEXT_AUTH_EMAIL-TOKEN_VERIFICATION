import mongoose from "mongoose";

export async function dbConnect() {
    try {
        const connection = await mongoose.connect(process.env.DB_URL!);

        if (connection.connection.readyState === 1) {
            console.log("MongoDB is successfully connected");
        } else {
            console.log("MongoDB connection failed");
            process.exit(1);
        }
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        process.exit(1);
    }
}