import express from "express";
import { createOrder, getMyOrders, getOrdersById } from "../controllers/orderControllers.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.route("/").post(protect, createOrder);
router.route("/:id").get(protect, getOrdersById);
router.route("/mine").post(protect, getMyOrders); 

export default router;