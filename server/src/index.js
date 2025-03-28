import express from "express";
import { config } from "dotenv";
import userRouter from "./routes/user.route.js";
import productRouter from './routes/product.route.js';
import reviewRouter from './routes/review.routes.js';
import orderRouter from './routes/order.routes.js';
import cookieParser from "cookie-parser";
import cors from "cors";
import {connectDB} from "./db/index.js";
import { ApiError } from "./utils/ApiError.js";
import { Server } from 'socket.io';
import { createServer } from 'http';

config();

const app = express();
const PORT = process.env.PORT || 8000;
const allowedOrigins = process.env.ORIGIN ? process.env.ORIGIN.split(',') : ["http://localhost:1800", "https://gali-gali-info.vercel.app"];
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/gali-gali-info";
const server = createServer(app);

const io = new Server(server, {
    cors: {
        origin: function (origin, callback) {
            if (!origin || allowedOrigins.includes(origin)) {
                callback(null, true);
            } else {
                console.error(`Blocked by CORS: ${origin}`);
                callback(new Error("Not allowed by CORS"));
            }
        },
        credentials: true,
    }
})

app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            console.error(`Blocked by CORS: ${origin}`);
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true,
}));

export const shopSockets = new Map(); // Store shop socket connections

io.on("connection", (socket) => {
    console.log("A user connected:", socket.id);

    socket.on("registerShop", (shopId) => {
        shopSockets.set(shopId, socket.id); // Map shopId to socketId
        console.log(`Shop ${shopId} registered with socket: ${socket.id}`);
    });

    socket.on("disconnect", () => {
        for (let [shopId, socketId] of shopSockets.entries()) {
            if (socketId === socket.id) {
                shopSockets.delete(shopId);
                console.log(`Shop ${shopId} disconnected.`);
                break;
            }
        }
    });
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use((req, _, next) => {
    req.io = io;
    next();
})

connectDB(MONGO_URI);

app.use("/api/users", userRouter);
app.use("/api/business/products", productRouter);
app.use("/api/reviews", reviewRouter);
app.use("/api/orders", orderRouter);

// app.get("/test-cors", (req, res) => {
//     res.json({ message: "CORS is working!" });
// });

app.use((err, req, res, next) => {
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

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
