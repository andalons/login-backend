import "dotenv/config";
import "./database/connectdb.js";
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

import authRoutes from "./routes/auth.route.js";

const whiteList = [process.env.ORIGIN1, process.env.ORIGIN2]; // authorized domains

const app = express();

app.use(
    cors({
        origin: function (origin, callback) {
            console.log(`Data request coming from ${origin}`); 
            if (!origin || whiteList.includes(origin)) {
                return callback(null, origin);
            }
            return callback(
                `CORS error: ${origin} unauthorized!`
            );
        },
        credentials: true,
    })
);

app.use(express.json())

app.use(cookieParser());

app.use("/api/v1/auth", authRoutes);

const PORT = process.env.PORT || 9000;
app.listen(PORT, console.log(`http://localhost:${PORT}`));