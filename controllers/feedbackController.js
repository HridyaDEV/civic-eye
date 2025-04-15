const FeedbackModel = require("../models/feedbackModel");  // Import the model

exports.submitFeedback = async (req, res) => {
    try {
        console.log("Request Body:", req.body);
        console.log("User in request:", req.user);
        const { userId, message } = req.body;
      

        if (!userId || !message) {
            return res.status(400).json({ error: "User ID and message are required" });
        }

        if (typeof userId !== "string") {
            return res.status(400).json({ error: "Invalid User ID format" });
        }

        // Create a new feedback entry using the model
        const newFeedback = new FeedbackModel({ user: userId, message });

        // Save it to the database
        await newFeedback.save(); 

        res.status(201).json({
            message: "Feedback submitted successfully!"
        });
    } catch (error) {
        console.error("Error submitting feedback:", error);
        res.status(500).json({
            message: "Error submitting feedback",
            error: error.message
        });
    }
};

exports.getAllFeedbacks = async (req, res) => {
    try {
        const feedbacks = await FeedbackModel.find().populate("user", "fullName email"); // Fetch feedbacks with user details
        res.status(200).json(feedbacks);
    } catch (error) {
        res.status(500).json({ error: "Error fetching feedbacks" });
    }
};

exports.updateFeedbackStatus = async (req, res) => {
    try {
        const { id } = req.params;  // Extract feedback ID from request parameters
        const { status } = req.body; // Extract status from request body

        if (typeof status !== "boolean") {
            return res.status(400).json({ error: "Invalid status value. It should be true or false." });
        }

        const feedback = await FeedbackModel.findById(id);
        if (!feedback) {
            return res.status(404).json({ error: "Feedback not found" });
        }

        feedback.status = status; // Update the status
        const updatedFeedback = await feedback.save(); // Save the updated feedback

        res.status(200).json({ message: "Feedback status updated successfully", feedback: updatedFeedback });
    } catch (error) {
        console.error("Error updating feedback status:", error);
        res.status(500).json({ message: "Error updating feedback status", error: error.message });
    }
};

