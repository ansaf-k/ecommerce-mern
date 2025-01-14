import express from 'express';
import { authUser, registerUser, logout, updateUserProfile } from '../controllers/userControllers.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.route("/").post(registerUser);
router.route("/auth").post(authUser);
router.route("/logout").post(logout);
router.route("/profile").put(protect, updateUserProfile);

export default router;