import express from "express";
import taskRoutes from "./src/routes/taskRoutes";
import userRoutes from "./src/routes/userRoutes";

const app = express();

app.use(express.json());
app.use("/tasks", taskRoutes);
app.use("/users", userRoutes);

const PORT = 2121;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));