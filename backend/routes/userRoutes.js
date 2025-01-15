import express from 'express';
import { authUser, registerUser, logout, updateUserProfile, getUsers, getUserById, updateUser } from '../controllers/userControllers.js';
import { admin, protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.route("/").post(registerUser).get(getUsers);
router.route("/auth").post(authUser);
router.route("/logout").post(logout);
router.route("/profile").put(protect, updateUserProfile);
router.route("/edit").put(protect, admin, updateUser);
router.route("/:id").get(protect, admin, getUserById);

export default router;