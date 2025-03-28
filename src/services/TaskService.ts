import { Types } from "mongoose";
import { TaskModel } from "../models/TaskModel";
import { ITask } from "../interfaces/TaskInterface";

export class TaskService {
    // Method to get all the tasks in the store
    static async getAll(): Promise<ITask[]> {
        try {
            return TaskModel.find();
        } catch (error) {
            console.error("Error getting tasks:", error);
            return [];
        }
    }
    // Method to get a specific task by id
    static async getById(id: Types.ObjectId): Promise<ITask | null> {
        try {
            return TaskModel.findOne(id);
        } catch (error) {
            console.error("Error getting task by id:", error);
            return null;
        }
    }
    // Method to get a specific task by user id
    static async getByUserId(userId: Types.ObjectId): Promise<ITask[]> {
        try {
            const tasks = await TaskModel.find({ createdBy: userId });
            return tasks;
        } catch (error) {
            console.error("Error getting tasks by userId:", error);
            return [];
        }
    }
    // Method to create a task
    static async create(
        title: string,
        createdBy: string,
        deadline: Date,
        label: string,
        status: "toDo" | "inProgress" | "done"
    ): Promise<ITask | null> {
        try {
            const newTask = new TaskModel({ title, createdBy, deadline, label, status });
            return newTask.save();
        } catch (error) {
            console.error("Error creating task:", error);
            return null;
        }
    }
    // Method to update a specific task
    static async update(
        id: Types.ObjectId,
        title: string,
        createdBy: string,
        deadline: Date,
        label: string,
        status: "toDo" | "inProgress" | "done"
    ): Promise<ITask | null> {
        try {
            return TaskModel.findOneAndUpdate(id, { title, createdBy, deadline, label, status }, { new: true });
        } catch (error) {
            console.error("Error updating task:", error);
            return null;
        }
    }
    // Method to delete a specific task
    static async delete(id: Types.ObjectId): Promise<boolean> {
        try {
            const result = await TaskModel.deleteOne(id);
            return result.deletedCount === 1;
        } catch (error) {
            console.error("Error deleting task:", error);
            return false;
        }
    }
}
