import React, { useState, useEffect } from "react"
import { submitFeedback } from "../api/feedbackApi"
import toast from "react-hot-toast"



const Feedback = () => {
  
  const [feedback, setFeedback] = useState("")
  const [userId, setUserId] = useState("")

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    if (storedUserId) {
      setUserId(storedUserId);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userId) {
      toast.error("User not logged in!")
      return;
    }

    try {
      const feedbackData = {
        userId: userId,
        message: feedback,
      }

      const response = await submitFeedback(feedbackData)

      if (response) {
        toast.success("Feedback submitted successfully!")
        setFeedback("")
      } else {
        toast.error("Failed to submit feedback.")
      }
    } catch (error) {
      console.error("Error submitting feedback:", error);
      toast.error("Error submitting feedback.")
    }
  };

  return (
    <div className="relative flex justify-center items-center  p-4">
      
      <div className="max-w-lg w-full bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Give Feedback</h2>
        <form onSubmit={handleSubmit}>
         
          <textarea
            className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Write your feedback here..."
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            required
          ></textarea>

          <button
            type="submit"
            className="mt-4 w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
          >
            Submit Feedback
          </button>
        </form>
      </div>
    </div>
  );
};

export default Feedback;
