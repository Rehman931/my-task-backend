import express from 'express';
import cors from 'cors';
import dotenv from "dotenv";
import Dashboard from './controllers/Dashboard.js';
import Login from './controllers/Login.js';
import Signup from './controllers/Signup.js';
import Protect from './middleware/dashAuth.js';
import ConnectDb from './config/db.js';
import AddTask from './controllers/AddTask.js';
import DeleteTask from './controllers/DeleteTask.js';
import UpdateTask from './controllers/UpdateTask.js';

dotenv.config();
ConnectDb();

const app = express();

app.use(cors({
  origin: process.env.FRONTEND_URL || "*"
}));
app.use(express.json());

// Routes
app.post("/login/auth", Login);
app.post("/signup/auth", Signup);
app.get("/dashboard/auth", Protect, Dashboard);
app.post("/AddTask", AddTask);
app.delete("/DeleteTask", DeleteTask);
app.put("/UpdateTask", UpdateTask);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
});
