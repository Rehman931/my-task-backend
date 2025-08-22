import Task from '../models/Task.js';

const Dashboard = async (req, res) => {
    try {
        // Example: Fetch all tasks (modify as per your requirement)
        const tasks = await Task.find({ user: req.user._id });

        res.status(200).json({
            message: "Dashboard Data fetched successfully",
            tasks
        });
    } catch (error) {
        console.error("Dashboard Error:", error);
        res.status(500).json({ message: "Server error" });
    }
};

export default Dashboard;
