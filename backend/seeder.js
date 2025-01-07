import connectDB from "./config/db.js";
import dotenv from 'dotenv';
import Product from "./model/productModel.js";
import User from "./model/userModel.js";
import products from './data/products.js';
import users from "./data/users.js";

dotenv.config();
connectDB();

const importData = async () => {
    try {
        await User.deleteMany();
        await Product.deleteMany();

        const createdUsers = await User.insertMany(users);

        const sampleProducts = products.map((product) => {
            return { ...product, user: createdUsers[0]._id };
        });

        const createdProducts = await Product.insertMany(sampleProducts);
        console.log("Data is Imported");
        process.exit();
    } catch (error) {
        console.log(error.message);
        process.exit(1);
    }
};

importData();