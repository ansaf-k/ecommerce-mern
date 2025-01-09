import express from 'express';
import { authUser, createUser, logout } from '../controllers/userControllers.js';

const router = express.Router();

router.route("/").post(createUser);
router.route("/auth").post(authUser);
router.route("/logout").post(logout)

export default router;