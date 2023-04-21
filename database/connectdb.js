import mongoose from "mongoose";

try {
    await mongoose.connect(process.env.DB_URI);
    console.log("You are connected to MongoDB!😎");
} catch (error) {
    console.log(error);
}