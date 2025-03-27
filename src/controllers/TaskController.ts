import { Request, Response } from "express";
import { TaskModel } from "../models/TaskModel";

export class TaskController {
    // Method to get all the tasks in the store
    static getTasks(_: Request, res: Response) {
        res.json(TaskModel.getAll());
    }

    // Method to get a specific task by id
    static getTask(req: Request, res: Response) {
        const task = TaskModel.getById(String(req.params.id));
        task ? res.json(task) : res.status(404).json({ message: "Task not found" });
    }

    // Method to create a task
    static createTask(req: Request, res: Response) {
        const { title, deadline, label, status } = req.body;

        if (!title) res.status(400).json({ message: "title is required" });
        if (!deadline) res.status(400).json({ message: "deadline is required" });
        if (!label) res.status(400).json({ message: "label is required" });
        if (!status) res.status(400).json({ message: "status is required" });

        const newTask = TaskModel.create(title, deadline, label, status);
        res.status(201).json(newTask);
    }

    // Method to update a specific task
    static updateTask(req: Request, res: Response) {
        const { id, title, deadline, label, status } = req.body;
        const updatedTask = TaskModel.update(id, title, deadline, label, status);

        updatedTask ? res.json(updatedTask) : res.status(404).json({ message: "Task not found" });
    }

    // Method to delete a specific task
    static deleteTask(req: Request, res: Response) {
        const deleted = TaskModel.delete(String(req.params.id));
        deleted ? res.json({ message: "Task deleted" }) : res.status(404).json({ message: "Task not found" });
    }
}
