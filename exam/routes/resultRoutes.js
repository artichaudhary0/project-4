import { Router } from "express";
import { createNewResult, fetchAllResults, fetchResultByStudent, removeResult } from "../controllers/resultController";
import authMiddleware from "../middleware/authMiddleware";
const router = Router();

router.post("/", authMiddleware("ADMIN"), createNewResult);
router.delete("/:id", authMiddleware("ADMIN"), removeResult);

router.get("/", authMiddleware("ADMIN"), fetchAllResults);
router.get("/:studentId", authMiddleware("STUDENT"), fetchResultByStudent);

export default router;
