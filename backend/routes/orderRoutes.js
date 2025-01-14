import express from "express";
import { createOrder, getMyOrders, getOrders, getOrdersById } from "../controllers/orderControllers.js";
import { admin, protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.route("/").post(protect, createOrder).get(protect, admin, getOrders);
router.route("/mine").get(protect, getMyOrders);
router.route("/:id").get(protect, getOrdersById);

export default router;