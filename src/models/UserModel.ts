import mongoose, { Schema, Document } from "mongoose";

interface IUser extends Document {
    email: string;
    password: string;
}

const UserSchema: Schema = new Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});

const UserModel = mongoose.model<IUser>("User", UserSchema);

export class UserMongoModel {
    static async getAll(): Promise<IUser[]> {
        return UserModel.find();
    }

    static async getById(id: mongoose.Types.ObjectId): Promise<IUser | null> {
        return UserModel.findOne(id);
    }

    static async create(email: string, password: string): Promise<IUser> {
        const newUser = new UserModel({ email, password });
        return newUser.save();
    }

    static async updatePassword(id: mongoose.Types.ObjectId, password: string): Promise<IUser | null> {
        return UserModel.findOneAndUpdate(id, { password }, { new: true });
    }

    static async delete(id: mongoose.Types.ObjectId): Promise<boolean> {
        const result = await UserModel.deleteOne(id);
        return result.deletedCount === 1;
    }
}
