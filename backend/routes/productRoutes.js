import express from "express";
import { createProduct, getProducts, getProductsById, updateProduct } from "../controllers/productControllers.js";
import { admin, protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.route("/").get(getProducts).post(protect, createProduct);
router.route("/:id").get(getProductsById).put(protect, admin, updateProduct);

export default router;