import * as fs from "fs";
import * as path from "path";
import { v4 as uuidv4 } from "uuid";

// __dirname is an environment variable that tells you the absolute path of the directory containing the currently executing file.
const filePath = path.join(__dirname, "../../data/tasks.json");

interface Task {
    id: string;
    title: string;
    deadline: Date;
    label: string;
    status: "toDo" | "inProgress" | "done";
}

const readTasks = (): Task[] => {
    // Checking if the path does not exist
    if (!fs.existsSync(filePath)) return [];
    // If it does, then read the file
    const data = fs.readFileSync(filePath, "utf-8");
    // And return the data
    return data ? JSON.parse(data) : [];
};

const writeTasks = (tasks: Task[]) => {
    // Writing the file based on our tasks param and formatting the output to be readable
    fs.writeFileSync(filePath, JSON.stringify(tasks, null, 2), "utf-8");
};

export class TaskModel {
    static getAll(): Task[] {
        // Get the array of tasks based on the returned value of the function "readTasks"
        return readTasks();
    }

    static getById(id: string): Task | undefined {
        // Find inside the tasks array returned by the function "readTasks"
        return readTasks().find((task) => task.id === id);
    }

    static create(title: string, deadline: Date, label: string, status: "toDo" | "inProgress" | "done"): Task {
        // Get the array of tasks based on the returned value of the function "readTasks"
        const tasks = readTasks();
        // Define the new Task obj
        const newTask: Task = { id: uuidv4(), title, deadline, label, status };
        // Push the new task into the
        tasks.push(newTask);
        // Write tasks array into the store file
        writeTasks(tasks);
        return newTask;
    }

    static update(id: string, title: string, deadline: Date, label: string, status: "toDo" | "inProgress" | "done"): Task | null {
        // Get the array of tasks based on the returned value of the function "readTasks"
        const tasks = readTasks();
        // Find the task with specified id, not return null
        const task = tasks.find((task) => task.id === id);
        if (!task) return null;
        // Check for undefined values on new updated data and assign values
        if (title !== undefined) task.title = title;
        if (deadline !== undefined) task.deadline = deadline;
        if (label !== undefined) task.label = label;
        if (status !== undefined) task.status = status;
        // Write tasks array into the store file
        writeTasks(tasks);
        return task;
    }

    static delete(id: string): boolean {
        // Get the array of tasks based on the returned value of the function "readTasks"
        let tasks = readTasks();
        // Filter for the task that match the id inside the tasks array
        const filteredTasks = tasks.filter(task => task.id !== id);
        // Creates a new array that includes only the tasks where the id does not match with the one we compared.
        if (tasks.length === filteredTasks.length) return false;
        // Write the filtered tasks array into the store file
        writeTasks(filteredTasks);
        return true;
      }
}
