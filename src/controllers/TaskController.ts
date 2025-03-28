import mongoose from "mongoose";
import { Request, Response } from "express";
import { TaskService } from "../services/TaskService";

export class TaskController {
    // Method to get all the tasks in the store
    static async getTasks(_: Request, res: Response) {
        try {
            const tasks = await TaskService.getAll();
            res.json(tasks);
        } catch (error) {
            console.error("Error getting tasks:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    }
    // Method to get a specific task by id
    static async getTaskById(req: Request, res: Response) {
        try {
            const task = await TaskService.getById(new mongoose.Types.ObjectId(req.params.id));
            task ? res.json(task) : res.status(404).json({ message: "Task not found" });
        } catch (error) {
            console.error("Error getting task by id:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    }
    // Method to get a specific task by user id
    static async getTaskByUserId(req: Request, res: Response) {
        try {
            const task = await TaskService.getByUserId(new mongoose.Types.ObjectId(req.params.id));
            task ? res.json(task) : res.status(404).json({ message: "Tasks not found for this user" });
        } catch (error) {
            console.error("Error getting tasks for this user:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    }
    // Method to create a task
    static async createTask(req: Request, res: Response) {
        try {
            const { title, createdBy, deadline, label, status } = req.body;

            if (!title) res.status(400).json({ message: "title is required" });
            if (!createdBy) res.status(400).json({ message: "createdBy is required" });
            if (!deadline) res.status(400).json({ message: "deadline is required" });
            if (!label) res.status(400).json({ message: "label is required" });
            if (!status) res.status(400).json({ message: "status is required" });

            const newTask = await TaskService.create(title, createdBy, deadline, label, status);
            res.status(201).json(newTask);
        } catch (error) {
            console.error("Error creating task:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    }
    // Method to update a specific task
    static async updateTask(req: Request, res: Response) {
        try {
            const id = req.params.id;
            const { title, createdBy, deadline, label, status } = req.body;
            const updatedTask = await TaskService.update(new mongoose.Types.ObjectId(id), title, createdBy, deadline, label, status);
            updatedTask ? res.json(updatedTask) : res.status(404).json({ message: "Task not found" });
        } catch (error) {
            console.error("Error updating task:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    }
    // Method to delete a specific task
    static async deleteTask(req: Request, res: Response) {
        try {
            const deleted = await TaskService.delete(new mongoose.Types.ObjectId(req.params.id));
            deleted ? res.json({ message: "Task deleted" }) : res.status(404).json({ message: "Task not found" });
        } catch (error) {
            console.error("Error deleting user:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    }
}
