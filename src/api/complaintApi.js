import axios from "axios";

const url = "http://localhost:5111";

export const submitComplaint = async (data) => {
    try {
        //  Declare token correctly
        const token = localStorage.getItem("token"); 

        if (!token) {
            console.error("No token found! Please log in.");
            return { message: "Unauthorized: Please log in first" };
        }

         // First, send complaint details without proof
         const formData = new FormData();
         formData.append("model", data.get("model"));
         formData.append("complaint", data.get("complaint"));
         formData.append("place", data.get("place"));
         formData.append("date", data.get("date"));
         if (data.get("proof")) {
            formData.append("proof", data.get("proof")); // Attach proof file
        }


        const response = await axios.post(`${url}/complaint/complaints`, data, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${token}` // Send token in request headers
            },
        })

       

        return response;
    } catch (error) {
        return error.response ? error.response.data : { message: "Something went wrong" };
    }
};

export const getUserComplaints = async () => {
    try {
        const token = localStorage.getItem("token")
        if(!token){
            console.log("No authentication token found")
            return{ message :"Unauthorized: Please log in first"}
            
        }
        const response = await axios.get(`${url}/complaint/mycomplaints`, {
            headers: { 'Authorization': `Bearer ${token}` }
        })

        return response.data;
    } catch (error) {
        console.log(("Error fetching complaints:", error.response?.data || error.message));
        return error.response ? error.response.data : { message: "Something went wrong" };
    }
}

export const getComplaintById = async (id) => {
    try {
        const token = localStorage.getItem("token");

        if (!token) {
            return { message: "Unauthorized: Please log in first" };
        }

        const response = await axios.get(`${url}/complaint/viewcomplaint/${id}`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });

        return response.data;
    } catch (error) {
        console.log("Error fetching complaint:", error.response?.data || error.message);
        return error.response ? error.response.data : { message: "Something went wrong" };
    }
};

export const getAllComplaints = async () => {
    try {
        const token = localStorage.getItem("token");
        if (!token) {
            console.error("No token found! Please log in.");
            return [];
        }

        const response = await axios.get(`${url}/complaint/allcomplaints`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });

        console.log("API Response from Backend:", response.data); // Debugging
        return response.data.complaints || []; // Return data directly
    } catch (error) {
        console.error("Error fetching complaints:", error.response?.data || error.message);
        return [];
    }
};


export const updateComplaintStatus = async (id, status) => {
    try {
        const token = localStorage.getItem("token");
        if (!token) {
            return { message: "Unauthorized: Please log in first" };
        }

        const response = await axios.put(
            `${url}/complaint/complaints/${id}/status`,
            { status },
            {
                headers: { 'Authorization': `Bearer ${token}` }
            }
        );

        return response.data;
    } catch (error) {
        console.log("Error updating complaint:", error.response?.data || error.message);
        return { message: "Something went wrong" };
    }
};

export const getComplaintStats = async () => {
    try {
      const token = localStorage.getItem("token");
    
  
      if (!token) {
        return { message: "Unauthorized: Please log in first" };
      }
  
      const response = await axios.get(`${url}/complaint/dashboard-status`, {
        headers: { 'Authorization': `Bearer ${token}` },
      });
  
      return response.data;
    } catch (error) {
      console.log("Error fetching user stats:", error.response?.data || error.message);
      return error.response ? error.response.data : { message: "Something went wrong" };
    }
  };

  export const getComplaintModel = async () => {
    try {
      const token = localStorage.getItem("token");
  
      if (!token) {
        return { message: "Unauthorized: Please log in first" };
      }
  
      const response = await axios.get(`${url}/complaint/dashboard-model`, {
        headers: { 'Authorization': `Bearer ${token}` },
      });
  
      return response.data;
    } catch (error) {
      console.log("Error fetching user stats:", error.response?.data || error.message);
      return error.response ? error.response.data : { message: "Something went wrong" };
    }
  };
  
  export const getPublicComplaintStats = async () => {
    try {
      const response = await axios.get(`${url}/complaint/complaint-count`);
      return response.data;
    } catch (error) {
      console.log("Error fetching public stats:", error.response?.data || error.message);
      return error.response ? error.response.data : { message: "Something went wrong" };
    }
  };
  