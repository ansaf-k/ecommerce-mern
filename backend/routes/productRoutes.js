import express from "express";
import { createProduct, getProducts } from "../controllers/productControllers.js";

const router = express.Router();

router.route("/").get(getProducts).post(createProduct);

export default router;

//jgj