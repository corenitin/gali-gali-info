import express from "express";
import { config } from "dotenv";
import winston from "winston";
import userRouter from "./routes/user.route.js";
import productRouter from './routes/product.route.js';
import cookieParser from "cookie-parser";
import cors from "cors";
import { connectDB } from "./db/index.js";
import { ApiError } from "./utils/ApiError.js";

config();

const app = express();
const { PORT } = process.env || 8000;
const allowedOrigins = process.env.ORIGIN ? process.env.ORIGIN.split(',') : ["http://localhost:1800", "https://gali-gali-info.vercel.app"];
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/gali-gali-info";

// Configure Winston logger
const logger = winston.createLogger({
    level: "info",
    format: winston.format.json(),
    transports: [
        new winston.transports.File({ filename: "error.log", level: "error" }),
        new winston.transports.File({ filename: "combined.log" }),
    ],
});

if (process.env.NODE_ENV !== "production") {
    logger.add(new winston.transports.Console({
        format: winston.format.simple(),
    }));
}

app.use(cors({
    origin: function (origin, callback) {
        logger.info("Origin:", origin);
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

connectDB(MONGO_URI);

app.use("/api/users", userRouter);
app.use("/api/business/products", productRouter);

app.get("/test-cors", (req, res) => {
    logger.info("Test CORS endpoint accessed");
    res.json({ message: "CORS is working!" });
});

app.use((err, req, res, next) => {
    logger.error("Error:", err);
    if (err instanceof ApiError) {
        return res.status(err.statusCode).json({
            success: err.success,
            message: err.message,
            errors: err.errors,
        });
    }

    return res.status(500).json({
        success: false,
        message: "Internal Server Error",
        errors: [],
    });
});

app.listen(PORT, () => {
    logger.info(`Server is running on http://localhost:${PORT}`);
});