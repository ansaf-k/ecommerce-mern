import express from "express";
import { createOrder, getMyOrders, getOrders, getOrdersById, updateDelivered, updateOrderToPaid } from "../controllers/orderControllers.js";
import { admin, protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.route("/").post(protect, createOrder).get(protect, admin, getOrders);
router.route("/mine").get(protect, getMyOrders);
router.route("/:id").get(protect, getOrdersById).put(protect, admin, updateDelivered);
router.route("/:id/pay").put(protect,updateOrderToPaid);

export default router;