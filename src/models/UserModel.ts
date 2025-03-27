import * as fs from "fs";
import * as path from "path";
import { v4 as uuidv4 } from "uuid";

// __dirname is an environment variable that tells you the absolute path of the directory containing the currently executing file.
const filePath = path.join(__dirname, "../../data/users.json");

// https://www.typescriptlang.org/play/?#example/types-vs-interfaces
interface User {
    id: string;
    email: string;
    password: string;
}

const readUsers = (): User[] => {
    // Checking if the path does not exist
    if (!fs.existsSync(filePath)) return [];
    // If it does, then read the file
    const data = fs.readFileSync(filePath, "utf-8");
    // And return the data
    return data ? JSON.parse(data) : [];
};

const writeUsers = (users: User[]) => {
    // Writing the file based on our users param and formatting the output to be readable
    fs.writeFileSync(filePath, JSON.stringify(users, null, 2), "utf-8");
};

export class UserModel {
    static getAll(): User[] {
        // Get the array of users based on the returned value of the function "readUsers"
        return readUsers();
    }

    static getById(id: string): User | undefined {
        // Find inside the users array returned by the function "readUsers"
        return readUsers().find((user) => user.id === id);
    }

    static create(email: string, password: string): User {
        // Get the array of users based on the returned value of the function "readUsers"
        const users = readUsers();
        console.log(users);
        
        // Define the new user obj
        const newUser: User = { id: uuidv4(), email, password };
        // Push the new user into the
        users.push(newUser);
        // Write users array into the store file
        writeUsers(users);
        return newUser;
    }

    static updatePassword(id: string, password: string): User | null {
        // Get the array of users based on the returned value of the function "readUsers"
        const users = readUsers();
        // Find the user with specified id, if not return null
        const user = users.find((user) => user.id === id);
        if (!user) return null;
        // Check for undefined values on new updated data and assign values
        if (password !== undefined) user.password = password;
        // Write users array into the store file
        writeUsers(users);
        return user;
    }

    static delete(id: string): boolean {
        // Get the array of users based on the returned value of the function "readUsers"
        let users = readUsers();
        // Filter for the user that match the id inside the users array
        const filteredUsers = users.filter((user) => user.id !== id);
        // Creates a new array that includes only the users where the id does not match with the one we compared.
        if (users.length === filteredUsers.length) return false;
        // Write the filtered users array into the store file
        writeUsers(filteredUsers);
        return true;
    }
}
