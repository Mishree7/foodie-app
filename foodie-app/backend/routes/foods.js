import express from "express";
import { getFoods, addFood } from "../controllers/foodController.js";
import { protect, isAdmin } from "../middleware/auth.js";

const router = express.Router();

router.get("/", getFoods);
router.post("/", protect, isAdmin, addFood);

export default router;