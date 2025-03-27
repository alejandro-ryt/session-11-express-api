import express from "express";
import taskRoutes from "./src/routes/taskRoutes";

const app = express();

app.use(express.json());
app.use("/tasks", taskRoutes);

const PORT = 2121;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));