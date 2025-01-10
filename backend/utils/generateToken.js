import jwt from 'jsonwebtoken';

const generateToken = (res, userId) => {
    let token = jwt.sign({ userId }, "12345", { expiresIn: "1d" });

    res.cookie("jwt", token, {
        secure: false,
        sameSite: "strict",
        maxAge: 24 * 60 * 60 * 1000, // 1 day
        httpOnly: true,
    });
}

export default generateToken;