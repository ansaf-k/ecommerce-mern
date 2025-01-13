import express from 'express';
import connectDB from './config/db.js';
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import cookieparser from 'cookie-parser';
import { errorHandler, notFound } from './middlewares/errorHandler.js';
import dotenv from 'dotenv';
dotenv.config();

connectDB();

const app = express();

app.use(cookieparser());
app.use(express.json());

const port = process.env.PORT;

app.get("/", (req, res) => {
    res.send("Ec World!");
});

app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})