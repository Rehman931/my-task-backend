import Task from "../models/Task.js";

// PUT /UpdateTask/:id
const UpdateTask = async (req, res) => {
  try {
    const { _id, ...rest } = req.body;
    const updated = await Task.findByIdAndUpdate(
      _id,
      { $set: rest },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json({ message: "Task updated successfully", task: updated });
  } catch (err) {
    console.error("Update error:", err);
    res.status(500).json({ message: "Update failed" });
  }
};

export default UpdateTask;
