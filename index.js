import "dotenv/config";
import "./database/connectdb.js";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.route.js";

const app = express();
app.use(express.json())
app.use("/api/v1/auth", authRoutes);
/* app.use(cookieParser());
;
*/

// Define a GET route for the root path
/* app.get('/', (req, res) => {
    res.send('Welcome to my API!');
  }); */

const PORT = process.env.PORT || 9000;
app.listen(PORT, console.log(`http://localhost:${PORT}`));