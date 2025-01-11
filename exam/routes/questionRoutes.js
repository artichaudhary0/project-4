import { Router } from "express";
import { createNewQuestion, fetchAllQuestions, fetchQuestionsByTitle, modifyQuestion, removeQuestion } from "../controllers/questionController";
import authMiddleware from "../middleware/authMiddleware";

const router = Router();


router.post("/", authMiddleware('ADMIN'), createNewQuestion);


router.get("/", authMiddleware(),fetchAllQuestions);


router.get("/:title", fetchQuestionsByTitle);

router.put("/:id", authMiddleware('ADMIN'), modifyQuestion);


router.delete("/:id", authMiddleware('ADMIN'), removeQuestion);

export default router;