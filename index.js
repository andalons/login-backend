import "dotenv/config";
import "./database/connectdb.js";
import express from "express";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.route.js";

const app = express();
app.use(express.json())
app.use(cookieParser());
app.use("/api/v1/auth", authRoutes);

const PORT = process.env.PORT || 9000;
app.listen(PORT, console.log(`http://localhost:${PORT}`));