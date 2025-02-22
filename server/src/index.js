import express from "express";
import { config } from "dotenv";
import userRouter from "./routes/user.route.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import { connectDB } from "./db/index.js";

config();

const app = express();
const { PORT } = process.env || 8000;
const ORIGIN = process.env.ORIGIN || "http://localhost:1800";
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/gali-gali-info";

// CORS Configuration
app.use(
  cors({
    origin: ORIGIN, // Allow requests from this origin
    credentials: true, // Allow cookies and credentials
    methods: ["GET", "POST", "PUT", "DELETE"], // Allowed HTTP methods
    allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Connect to MongoDB
connectDB(MONGO_URI);

// Routes
app.use("/api/users", userRouter);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});