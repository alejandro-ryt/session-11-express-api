import { Request, Response } from "express";
import { UserModel } from "../models/UserModel";

export class UserController {
    // Method to get all the users in the store
    static getUsers(_: Request, res: Response) {
        res.json(UserModel.getAll());
    }

    // Method to get a specific user by id
    static getUserById(req: Request, res: Response) {
        const user = UserModel.getById(String(req.params.id));
        user ? res.json(user) : res.status(404).json({ message: "User not found" });
    }

    // Method to create a user
    static createUser(req: Request, res: Response) {
        const { email, password } = req.body;

        if (!email) res.status(400).json({ message: "email is required" });
        if (!password) res.status(400).json({ message: "password is required" });

        const newUser = UserModel.create(email, password);
        res.status(201).json(newUser);
    }

    // Method to update a specific user
    static updatePassword(req: Request, res: Response) {
        const { id, password } = req.body;
        const updatedUser = UserModel.updatePassword(id, password);

        updatedUser ? res.json(updatedUser) : res.status(404).json({ message: "User not found" });
    }

    // Method to delete a specific user
    static deleteUser(req: Request, res: Response) {
        const deleted = UserModel.delete(String(req.params.id));
        deleted ? res.json({ message: "User deleted" }) : res.status(404).json({ message: "User not found" });
    }
}
