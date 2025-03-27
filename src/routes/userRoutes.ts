import { Router } from "express";
import { UserController } from "../controllers/UserController";

const router = Router();
// GET
router.get("/", UserController.getUsers);
router.get("/:id", UserController.getUserById);
//POST
router.post("/", UserController.createUser);
// PUT
router.put("/", UserController.updatePassword);
// DELETE
router.delete("/:id", UserController.deleteUser);

export default router;
