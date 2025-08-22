import jwt from "jsonwebtoken";
import Task from "../models/Task.js";

const AddTask = async (req, res) => {
  try {
    // 1️⃣ Get token from header
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "No token, authorization denied",
      });
    }

    // 2️⃣ Verify token
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      return res.status(401).json({
        success: false,
        message: "Invalid token",
      });
    }

    // 3️⃣ Extract user id from token
    const userId = decoded.id;

    // 4️⃣ Get task data from body
    const { title, description, status, priority } = req.body;

    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + 3);

    const createdAt = new Date();

    // 5️⃣ Create task
    const newTask = new Task({
      user: userId,   // ✅ linking task with user
      title,
      description,
      status,
      priority,
      dueDate,
      createdAt,
    });

    await newTask.save();

    // 6️⃣ Send response
    res.status(201).json({
      success: true,
      message: "Task added successfully",
    });

  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      success: false,
      message: "Failed to add task",
      error: error.message,
    });
  }
};

export default AddTask;
