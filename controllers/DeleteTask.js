// controllers/DeleteTask.js
import Task from "../models/Task.js";

const DeleteTask = async (req, res) => {
  try {
    const { _id } = req.query;
    console.log("Task ID to delete:", _id);

    const deletedTask = await Task.findByIdAndDelete(_id);

    if (deletedTask) {
      console.log("Deleted Task:", deletedTask);
      res.status(200).json({ message: "Task deleted successfully", task: deletedTask });
    } else {
      res.status(404).json({ message: "Task not found" });
    }
  } catch (error) {
    console.error("Error deleting task:", error);
    res.status(500).json({ message: "Deletion failed", error: error.message });
  }
};

export default DeleteTask;
