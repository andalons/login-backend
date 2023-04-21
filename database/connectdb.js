import mongoose from "mongoose";

try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("You are connected to MongoDB!😎");
} catch (error) {
    console.log(error);
}