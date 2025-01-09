import express from 'express';
import connectDB from './config/db.js';
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import cookieparser from 'cookie-parser';

connectDB();
const app = express();

app.use(cookieparser());
app.use(express.json());
const port = 5000;

app.get("/", (req, res) => {
    res.send("Ec World!");
});

app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})