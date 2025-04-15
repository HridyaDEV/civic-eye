import React, { useEffect, useState } from 'react'
import { getAllFeedbacks } from '../api/feedbackApi'

const FeedbackSection = () => {
    const [feedbacks, setFeedbacks] = useState([])

    useEffect(() => {
        const fetchFeedbacks = async () => {
            try {
                const response = await getAllFeedbacks()
                
                const feedbackList = response?.data || [] 
                
                if (Array.isArray(feedbackList)) {
                    setFeedbacks(feedbackList.filter(fb => fb.status === true))
                } else {
                    console.error("Unexpected data format:", feedbackList)
                    setFeedbacks([])
                }
            } catch (error) {
                console.error("Error fetching feedbacks:", error)
            }
        };

        fetchFeedbacks()
    }, []);

    return (
        <div className="py-10 bg-white text-center px-6">
            <h2 className="text-3xl font-bold mb-6">User Feedback</h2>
            {feedbacks.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {feedbacks.map((feedback, index) => (
                        <div key={index} className="bg-gray-100 p-6 rounded-2xl shadow-lg text-center hover:scale-105 transition">
                            <h3 className="text-xl font-semibold">
                                {feedback.user?.fullName || "Anonymous"} 
                            </h3>
                            <p className="text-gray-600 mt-2">"{feedback.message}"</p>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-gray-600">No approved feedback available.</p>
            )}
        </div>
    );
};

export default FeedbackSection;
