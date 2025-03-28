import { Document } from "mongoose";

export interface ITask extends Document {
    createdBy: string;
    title: string;
    deadline: Date;
    label: string;
    status: "toDo" | "inProgress" | "done";
}