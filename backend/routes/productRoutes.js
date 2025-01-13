import express from "express";
import { createProduct, getProducts, getProductsById } from "../controllers/productControllers.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.route("/").get(getProducts).post(protect, createProduct);
router.route("/:id").get(getProductsById);

export default router;