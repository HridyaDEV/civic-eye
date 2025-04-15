import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import { getAllFeedbacks, updateFeedbackStatus } from "../api/feedbackApi";
import toast from "react-hot-toast";

const Reports = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);

  // Function to fetch feedbacks
  const fetchFeedbacks = async () => {
    try {
      const response = await getAllFeedbacks();
      console.log("API Response:", response.data);
  
      setFeedbacks(
        Array.isArray(response.data)
          ? response.data.map(feedback => ({
              ...feedback,
              status: feedback.status !== true && feedback.status !== false ? null : feedback.status, 
            }))
          : []
      );
    } catch (error) {
      console.error("Error fetching feedbacks:", error);
      setFeedbacks([]);
    } finally {
      setLoading(false);
    }
  };
  

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  // Function to update feedback status
  const handleUpdateStatus = async (feedbackId, status) => {
    try {
      console.log(`Updating feedback ID: ${feedbackId} to status: ${status}`);
      const response = await updateFeedbackStatus(feedbackId, status);
      console.log("Update API Response:", response);

      if (response && response.message === "Feedback status updated successfully") {
        toast.success(`Feedback ${status ? "approved" : "rejected"} successfully!`);

        //  Update state immediately
        setFeedbacks((prevFeedbacks) =>
          prevFeedbacks.map((feedback) =>
            feedback._id === feedbackId ? { ...feedback, status } : feedback
          )
        );
      } else {
        toast.error("Failed to update feedback status.");
      }
    } catch (error) {
      toast.error("Error updating feedback status!");
      console.error("Error updating feedback status:", error);
    }
  };

  return (
    <div className="flex bg-gray-100 min-h-screen">
      {/* Sidebar */}
      <div className="w-64">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        <h1 className="text-3xl font-semibold text-gray-800 mb-6">All Feedbacks</h1>

        <div className="bg-white shadow-lg rounded-lg p-6">
          {loading ? (
            <p className="text-gray-600 text-center">Loading feedbacks...</p>
          ) : feedbacks.length === 0 ? (
            <p className="text-gray-600 text-center">No feedbacks available.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full border border-gray-300 rounded-lg shadow-sm">
                <thead>
                  <tr className="bg-gray-200 text-gray-700 uppercase text-sm leading-normal">
                    <th className="border border-gray-300 px-6 py-3 text-left">User Name</th>
                    <th className="border border-gray-300 px-6 py-3 text-left">Email</th>
                    <th className="border border-gray-300 px-6 py-3 text-left">Feedback</th>
                    <th className="border border-gray-300 px-6 py-3 text-left">Status</th>
                    <th className="border border-gray-300 px-6 py-3 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {feedbacks.map((feedback) => (
                    <tr key={feedback._id} className="border-b border-gray-300 hover:bg-gray-50">
                      <td className="border border-gray-300 px-6 py-3">{feedback.user?.fullName || "Unknown"}</td>
                      <td className="border border-gray-300 px-6 py-3">{feedback.user?.email || "Unknown"}</td>
                      <td className="border border-gray-300 px-6 py-3">{feedback.message}</td>
                      <td className="border border-gray-300 px-6 py-3">
                        <span
                          className={`px-3 py-1 rounded-md text-white text-sm ${
                            feedback.status === true ? "bg-green-500" : feedback.status === false ? "bg-red-500" : "bg-yellow-500"
                          }`}
                        >
                          {feedback.status === true ? "Approved" : feedback.status === false ? "Rejected" : "Pending"}
                        </span>
                      </td>
                      <td className="border border-gray-300 px-6 py-3">
  {/*  Show buttons only when status is NULL (pending) */}
  {feedback.status === null ? (
    <div className="flex space-x-2">
      <button
        onClick={() => handleUpdateStatus(feedback._id, true)}
        className="px-4 py-2 rounded-md text-white bg-blue-500 hover:bg-blue-600"
      >
        Approve
      </button>
      <button
        onClick={() => handleUpdateStatus(feedback._id, false)}
        className="px-4 py-2 rounded-md text-white bg-red-500 hover:bg-red-600"
      >
        Reject
      </button>
    </div>
  ) : null}
</td>


                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Reports;
