import { Router } from "express";
import { TaskController } from "../controllers/TaskController";

const router = Router();
// GET
router.get("/", TaskController.getTasks);
router.get("/:id", TaskController.getTaskById);
router.get("/user/:id", TaskController.getTaskByUserId);
//POST
router.post("/", TaskController.createTask);
// PUT
router.put("/", TaskController.updateTask);
// DELETE
router.delete("/:id", TaskController.deleteTask);

export default router;
