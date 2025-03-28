import mongoose, { Schema } from "mongoose";
import { IUser } from "../interfaces/UserInterface";

const UserSchema: Schema<IUser> = new Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});

export const UserModel = mongoose.model<IUser>("User", UserSchema);
