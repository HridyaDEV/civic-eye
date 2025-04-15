import axios from "axios"

const url = 'http://localhost:5111'

export const register = async (data) => {
    try {
        const response = await axios.post(`${url}/auth/register`,data)
        return response

    } catch (error) {
        return error
    }
}

export const userlogin = async (data)=>{
    try {
        const response = await axios.post(`${url}/auth/login`,data)
        return response
        
    } catch (error) {
        console.error("Login API Error:", error.response?.data || error.message);
        return error.response ? error.response.data : { message: "Something went wrong" };
    }
}