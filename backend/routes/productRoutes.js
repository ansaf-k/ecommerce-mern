import express from "express";
import { createProduct, getProducts, getProductsById } from "../controllers/productControllers.js";

const router = express.Router();

router.route("/").get(getProducts).post(createProduct);
router.route("/:id").get(getProductsById);

export default router;