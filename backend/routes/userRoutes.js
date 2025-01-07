import express from 'express';
import { authUser, createUser } from '../controllers/userControllers.js';

const router = express.Router();

router.route("/").post(createUser);
router.route("/auth").post(authUser);

export default router;