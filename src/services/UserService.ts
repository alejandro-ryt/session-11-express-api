import { Types } from "mongoose";
import { UserModel } from "../models/UserModel";
import { IUser } from "../interfaces/UserInterface";

export class UserService {
    // Method to get all the users in the store
    static async getAll(): Promise<IUser[]> {
        try {
            return UserModel.find();
        } catch (error) {
            console.error("Error getting users:", error);
            return [];
        }
    }
    // Method to get a specific user by id
    static async getById(id: Types.ObjectId): Promise<IUser | null> {
        try {
            return UserModel.findById(id);
        } catch (error) {
            console.error("Error getting user by id:", error);
            return null;
        }
    }
    // Method to create a user
    static async create(email: string, password: string): Promise<IUser | null> {
        try {
            const newUser = new UserModel({ email, password });
            return newUser.save();
        } catch (error) {
            console.error("Error creating user:", error);
            return null;
        }
    }
    // Method to update a specific user
    static async updatePassword(id: Types.ObjectId, password: string): Promise<IUser | null> {
        try {
            console.log(id);
            
            return UserModel.findByIdAndUpdate(id, { password }, { new: true });
        } catch (error) {
            console.error("Error updating user:", error);
            return null;
        }
    }
    // Method to delete a specific user
    static async delete(id: Types.ObjectId): Promise<boolean> {
        try {
            const result = await UserModel.deleteOne({ _id: id });
            return result.deletedCount === 1;
        } catch (error) {
            console.error("Error deleting user:", error);
            return false;
        }
    }
}
