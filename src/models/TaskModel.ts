import mongoose, { Schema } from "mongoose";
import { ITask } from "../interfaces/TaskInterface";

const TaskSchema: Schema = new Schema({
    createdBy: { type: Schema.ObjectId, required: true },
    title: { type: String, required: true },
    deadline: { type: Date, required: true },
    label: { type: String, required: true },
    status: { type: String, required: true },
});

export const TaskModel = mongoose.model<ITask>("Task", TaskSchema);

