import jwt from "jsonwebtoken"
import User from "../model/userModel.js";

const protect = async (req, res, next) => {
    try {
        let token = req.cookies.jwt;

        if (token) {
            try {
                const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
                req.user = await User.findById(decoded.userId).select("-password");
                next();
            } catch (error) {
                res.status(401);
                throw new Error('Not Authorized Invalid Token');
            }
        } else {
            res.status(401);
            throw new Error('Not Authorized, No Token');
        }
    } catch (error) {
        next(error)
    }
};

export { protect };