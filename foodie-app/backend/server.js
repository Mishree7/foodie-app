import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/database.js";  // include .js extension
import authRoutes from "./routes/auth.js";
import foodRoutes from "./routes/foods.js";
import orderRoutes from "./routes/orders.js";

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/foods", foodRoutes);
app.use("/api/orders", orderRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});