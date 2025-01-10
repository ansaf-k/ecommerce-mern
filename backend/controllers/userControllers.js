import asyncHandler from "../middlewares/asyncHandler.js";
import User from "../model/userModel.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import generateToken from "../utils/generateToken.js";

const registerUser = asyncHandler(async (req, res, next) => {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
        res.status(400);
        throw new Error("User already exists");
    }

    const salt = await bcrypt.genSalt(10);
    const encryptedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
        name,
        email,
        password: encryptedPassword,
    });

    if (user) {
        //generate Token
        generateToken(res, user._id);
        res.status(202).json({
            _id: user._id,
            name: user.name,
            email: user.email,
        });
    } else {
        res.status(400);
        throw new Error('Invalid User data');
    }
});

const authUser = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (User && (await user.matchPassword(password))) {
        //generate Token
        generateToken(res, user._id);

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

const logout = async (req, res) => {
    res.cookie("jwt", "", {
        httpOnly: true,
        expiresIn: new Date(0),
    });

    res.status(200).json({ message: "Logged out successfully" });
};

const getUsers = () => { };
const getUserProfile = () => { };

export { registerUser, authUser, logout, getUserProfile };