import { Router } from "express";
import { registerUser, loginUser, getUsers } from "../controllers/userController";
import authMiddleware from "../middleware/authMiddleware";

const router = Router();

// Public Routes
router.post("/register", registerUser);
router.post("/login", loginUser);

// Protected Route
router.get("/", authMiddleware("ADMIN"), getUsers);

export default router;
