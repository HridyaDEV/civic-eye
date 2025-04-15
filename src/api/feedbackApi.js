import axios from "axios"

const url= "http://localhost:5111"


export const submitFeedback = async (data) =>{
    try {
        console.log("Submitting Feedback Data:", data);

        const { userId, message } = data;
        const response = await axios.post(`${url}/feedback/submit`, {
             userId, 
           message,
           
        });
        return response.data;
    } catch (error) {
        console.error("Error submitting feedback:", error);
        return null; 
    }
}

export const getAllFeedbacks = async () => {
    try {
        const response = await axios.get(`${url}/feedback/all`)
        console.log("API Response:", response.data);
        return response
    } catch (error) {
        console.error("Error fetching all feedbacks for admin:", error);
        return {data:[]};
    }
};

export const updateFeedbackStatus = async (feedbackId, status) => {
    try {

        const response = await axios.put(`${url}/feedback/status/${feedbackId}`, { status });
        return response.data;
    } catch (error) {
        console.error("Error updating feedback status:", error);
        throw error;
    }
};


