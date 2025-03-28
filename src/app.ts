import express from "express";
import cors from "cors";
import { config } from "dotenv";
import taskRoutes from "./routes/taskRoutes";
import userRoutes from "./routes/userRoutes";

const app = express();

config();

app.use(cors());
app.use(express.json());
app.use("/tasks", taskRoutes);
app.use("/users", userRoutes);

export default app;
