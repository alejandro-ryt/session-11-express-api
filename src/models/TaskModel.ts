import mongoose, { Schema, Document } from "mongoose";

interface ITask extends Document {
    createdBy: string;
    title: string;
    deadline: Date;
    label: string;
    status: "toDo" | "inProgress" | "done";
}

const TaskSchema: Schema = new Schema({
    createdBy: { type: Schema.ObjectId, required: true },
    title: { type: String, required: true },
    deadline: { type: Date, required: true },
    label: { type: String, required: true },
    status: { type: String, required: true },
});

const TaskModel = mongoose.model<ITask>("Task", TaskSchema);

export class TaskMongoModel {
    static async getAll(): Promise<ITask[]> {
        try {
            return TaskModel.find();
        } catch (error) {
            console.error("Error getting tasks:", error);
            return [];
        }
    }

    static async getById(id: mongoose.Types.ObjectId): Promise<ITask | null> {
        try {
            return TaskModel.findOne(id);
        } catch (error) {
            console.error("Error getting task by Id:", error);
            return null;
        }
    }

    static async getByUserId(userId: mongoose.Types.ObjectId): Promise<ITask[]> {
        try {
            const tasks = await TaskModel.find({ createdBy: userId });
            return tasks;
        } catch (error) {
            console.error("Error getting tasks by userId:", error);
            return [];
        }
    }

    static create(
        title: string,
        createdBy: string,
        deadline: Date,
        label: string,
        status: "toDo" | "inProgress" | "done"
    ): Promise<ITask> {
        const newTask = new TaskModel({ title, createdBy, deadline, label, status });
        return newTask.save();
    }

    static async update(
        id: mongoose.Types.ObjectId,
        title: string,
        createdBy: string,
        deadline: Date,
        label: string,
        status: "toDo" | "inProgress" | "done"
    ): Promise<ITask | null> {
        return TaskModel.findOneAndUpdate(id, { title, createdBy, deadline, label, status }, { new: true });
    }

    static async delete(id: mongoose.Types.ObjectId): Promise<boolean> {
        const result = await TaskModel.deleteOne(id);
        return result.deletedCount === 1;
    }
}
