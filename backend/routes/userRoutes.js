import express from 'express';
import { authUser, registerUser, logout } from '../controllers/userControllers.js';

const router = express.Router();

router.route("/").post(registerUser);
router.route("/auth").post(authUser);
router.route("/logout").post(logout)

export default router;