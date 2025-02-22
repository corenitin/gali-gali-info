import express from "express";
import { config } from "dotenv";
import userRouter from "./routes/user.route.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import {connectDB} from "./db/index.js";

config();

const app = express();
const { PORT } = process.env || 8000;
const ORIGIN = process.env.ORIGIN || "http://localhost:1800";
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/gali-gali-info";

app.use(cors({
    origin: ORIGIN,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
}))

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

connectDB(MONGO_URI);

app.use("/api/users", userRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
