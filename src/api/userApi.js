
import axios from "axios"

const url= "http://localhost:5111"

export const viewUserProfile = async (id) =>{
    try {
        const response = await axios.get(`${url}/user/profile/${id}`)
        return response.data
    } catch (error) {
        console.log("Error fetching user profile:",error)
        return null
        
    }
}

export const updateUserProfile = async (id, profileData) => {
    try {
        const response = await axios.put(`${url}/user/profile/${id}`, profileData);
        return response.data;
    } catch (error) {
        console.error("Error updating user profile:", error);
        return null;
    }
}

export const getAllUsers = async () =>{
    try {
        const response = await axios.get(`${url}/user/alluser`)
        return response.data
    } catch (error) {
        console.error("Error fetching users:", error)
    return [];
    }
}

export const getUserById = async (id) => {
    try {
        
        
        const response = await axios.get(`${url}/user/profile/${id}`);
        console.log(response);
        
        return response.data
    } catch (error) {
        console.error("Error fetching user details:", error)
        return null
    
}}

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
