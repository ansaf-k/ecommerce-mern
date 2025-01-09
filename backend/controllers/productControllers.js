import asyncHandler from "../middlewares/asyncHandler.js";
import Product from "../model/productModel.js";

const getProducts = asyncHandler(async (req, res, next) => {
    const products = await Product.find();
    // console.log(products);
    res.json(products)
});

const createProduct = () => { };

const getProductsById = asyncHandler(async (req, res, next) => {
    const product = await Product.findById(req.params.id);

    if (product) {
        return res.json(product);
    } else {
        res.status(404);
        throw new Error("Product not found");
    }
});

export { getProducts, createProduct, getProductsById }