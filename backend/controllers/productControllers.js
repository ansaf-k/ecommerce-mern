import Product from "../model/productModel.js";

const getProducts = async(req, res, next) => {
    const products = await Product.find();
    console.log(products);
    res.json(products)
};
const createProduct = () => {};

export { getProducts, createProduct}