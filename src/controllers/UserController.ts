import mongoose from "mongoose";
import { Request, Response } from "express";
import { UserMongoModel } from "../models/UserModel";

export class UserController {
    // Method to get all the users in the store
    static async getUsers(_: Request, res: Response) {
        try {
            const users = await UserMongoModel.getAll();
            res.json(users);
        } catch (error) {
            console.error("Error getting users:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    }

    // Method to get a specific user by id
    static async getUserById(req: Request, res: Response) {
        try {
            const user = await UserMongoModel.getById(new mongoose.Types.ObjectId(req.params.id));
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

            const newUser = await UserMongoModel.create(email, password);
            res.status(201).json(newUser);
        } catch (error) {
            console.error("Error creating user:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    }

    // Method to update a specific user
    static async updatePassword(req: Request, res: Response) {
        try {
            const { id, password } = req.body;
            const updatedUser = await UserMongoModel.updatePassword(id, password);

            updatedUser ? res.json(updatedUser) : res.status(404).json({ message: "User not found" });
        } catch (error) {
            console.error("Error updating password:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    }

    // Method to delete a specific user
    static async deleteUser(req: Request, res: Response) {
        try {
            const deleted = await UserMongoModel.delete(new mongoose.Types.ObjectId(req.params.id));
            deleted ? res.json({ message: "User deleted" }) : res.status(404).json({ message: "User not found" });
        } catch (error) {
            console.error("Error deleting user:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    }
}
