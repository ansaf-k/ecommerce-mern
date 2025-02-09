import asyncHandler from "../middlewares/asyncHandler.js";
import { Product } from "../model/productModel.js";

const getProducts = asyncHandler(async (req, res) => {
    const pageSize = 1;
    const page = Number(req.query.pageNumber) || 1;

    const keywordCondition = req.query.keyword
        ? { name: { $regex: req.query.keyword, $options: "i" } } //$regex: where values match a specified regular expression, $options: 
        : {};

    const count = await Product.countDocuments({...keywordCondition}); //take the count the database of products

    const products = await Product.find({...keywordCondition})
        .limit(pageSize)
        .skip(pageSize * (page - 1));

    res.json({ products, page, pages: Math.ceil(count / pageSize) });
});

const createProduct = async (req, res) => {
    const product = new Product({
        name: "Sample Name",
        price: 0,
        user: req.user._id,
        image: "/uploads/sample.jpg",
        brand: "Sample Brand",
        category: "Sample Category",
        countInStock: 0,
        numReviews: 0,
        description: "Sample Description",
        rating: 0
    });

    const createdProduct = await product.save();

    res.status(201).json(createdProduct)
};

const getProductsById = asyncHandler(async (req, res, next) => {
    const product = await Product.findById(req.params.id);

    if (product) {
        return res.json(product);
    } else {
        res.status(404);
        throw new Error("Product not found");
    }
});

const updateProduct = asyncHandler(async (req, res) => {
    const {
        name,
        price,
        image,
        brand,
        category,
        countInStock,
        numReviews,
        description,
        rating,
    } = req.body;

    const product = await Product.findById(req.params.id);

    if (product) {
        product.name = name || product.name;
        product.user = req.user.id
        product.price = price || product.price;
        product.image = image || product.image;
        product.brand = brand || product.brand;
        product.category = category || product.category;
        product.countInStock = countInStock || product.countInStock;
        product.numReviews = numReviews || product.numReviews;
        product.description = description || product.description;
        product.rating = rating || product.rating;

        const updatedProduct = await product.save();

        res.json(updatedProduct);
    } else {
        res.status(404);
        throw new Error("Product not found");
    }
});

const deleteProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
        await Product.findByIdAndDelete(req.params.id);
        res.json('todo delete successfully');
    } else {
        res.status(404);
        throw new Error("Product not found");
    }
});

const productReviews = asyncHandler(async (req, res, next) => {
    const { rating, comment } = req.body;
    const product = await Product.findById(req.body.id);
    if (product) {
        const existingReview = await product.reviews.find((item) => item.user.toString() === req.user._id.toString());

        if (existingReview) {
            res.status(400);
            throw new Error("You have already reviewed this product");
        }

        const review = {
            name: req.user.name,
            rating: Number(rating),
            comment,
            user: req.user._id,
        };
        product.reviews.push(review);
        product.numReviews = product.reviews.length;
        product.rating =
            product.reviews.reduce((acc, current) => acc + current.rating, 0) /
            product.reviews.length;
        await product.save();
        res.status(201).json({ message: "Review added successfully" });
    } else {
        res.status(404);
        throw new Error("Product not found");
    }
});


export { getProducts, createProduct, getProductsById, updateProduct, deleteProduct, productReviews }