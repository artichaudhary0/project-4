import { Router } from "express";
import { createNewExam, fetchAllExams, fetchExamById, modifyExam, removeExam } from "../controllers/examController";
import authMiddleware from "../middleware/authMiddleware";

const router = Router();

router.post("/", authMiddleware("ADMIN"), createNewExam);
router.put("/:id", authMiddleware("ADMIN"), modifyExam);
router.delete("/:id", authMiddleware("ADMIN"), removeExam);

router.get("/", authMiddleware(), fetchAllExams);
router.get("/:id", authMiddleware(), fetchExamById);

export default router;
