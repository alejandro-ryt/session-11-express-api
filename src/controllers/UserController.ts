import mongoose from "mongoose";
import { Request, Response } from "express";
import { UserService } from "../services/UserService";


export class UserController {
    // Method to get all the users in the store
    static async getUsers(_: Request, res: Response) {
        try {
            const users = await UserService.getAll();
            res.json(users);
        } catch (error) {
            console.error("Error getting users:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    }
    // Method to get a specific user by id
    static async getUserById(req: Request, res: Response) {
        try {
            const user = await UserService.getById(new mongoose.Types.ObjectId(req.params.id));
            user ? res.json(user) : res.status(404).json({ message: "User not found" });
        } catch (error) {
            console.error("Error getting user by id:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    }
    // Method to create a user
    static async createUser(req: Request, res: Response) {
        try {
            const { email, password } = req.body;

            if (!email) res.status(400).json({ message: "email is required" });
            if (!password) res.status(400).json({ message: "password is required" });

            const newUser = await UserService.create(email, password);
            res.status(201).json(newUser);
        } catch (error) {
            console.error("Error creating user:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    }
    // Method to update a specific user
    static async updatePassword(req: Request, res: Response) {
        try {
            const { password } = req.body;
            const id = req.params.id;
            const updatedUser = await UserService.updatePassword(new mongoose.Types.ObjectId(id), password);

            updatedUser ? res.json(updatedUser) : res.status(404).json({ message: "User not found" });
        } catch (error) {
            console.error("Error updating password:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    }
    // Method to delete a specific user
    static async deleteUser(req: Request, res: Response) {
        try {
            const deleted = await UserService.delete(new mongoose.Types.ObjectId(req.params.id));
            deleted ? res.json({ message: "User deleted" }) : res.status(404).json({ message: "User not found" });
        } catch (error) {
            console.error("Error deleting user:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    }
}
