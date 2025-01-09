import asyncHandler from "../middlewares/asyncHandler.js";
import User from "../model/userModel.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const createUser = asyncHandler(async (req, res, next) => {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
        res.status(400);
        throw new Error("Email already exists");
    }
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const user = await User.create({
        name,
        email,
        password: hash
    });

    if (user) {
        res.status(202).json({
            _id: user._id,
            name: user.name,
            email: user.email
        });
    } else {
        throw new Error('Invalid User data');
    }
});

const authUser = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;
    console.log('object');

    const user = await User.findOne({ email });
    if (User && (await user.matchPassword(password))) {

        let token = jwt.sign({ userId: user._id }, "12345", { expiresIn: "1d" });
        res.cookie("jwt", token, {
            httpOnly: true,
            secure: false,
            sameSite: "strict",
            maxAge: 24 * 60 * 60 * 1000 // 1 day
        })

        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
        })
    } else {
        res.status(400);
        throw new Error("Invalid Email or Password");
    }
});

const logout = asyncHandler(async(req, res) => {
    res.cookie("jwt","",{
        httpOnly: true,
        expiresIn: new Date(0),
    });
    res.status(200).json({ message: "Logged out successfully" });
});

const getUsers = () => { };
const getUserProfile = () => { };

export { createUser, authUser, logout, getUserProfile };