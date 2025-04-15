const { saveFileToDisk } = require("../config/multer");
const Complaint = require("../models/complaintModel")
const jwt = require("jsonwebtoken");

exports.submitComplaint = async (req, res) => {
    try {
        

        //  Extract token from headers
        const token = req.header("Authorization")?.replace("Bearer ", "");
        if (!token) {
           
            return res.status(401).json({ message: "Access denied! No token provided." });
        }

        //  Verify token
        let decoded;
        try {
            decoded = jwt.verify(token, process.env.JWT_KEY);
        } catch (err) {
           
            return res.status(401).json({ message: "Invalid token. Please log in again." });
        }

        const createdBy = decoded.userId // Extract user ID
        //  Validate required fields
        const { model, complaint, place, date } = req.body

        if (!model || !complaint || !place || !date) {
           
            return res.status(400).json({ message: "Provide all required fields" });
        }


        //  Save complaint in MongoDB
        const newComplaint = new Complaint({
            createdBy, 
            model,
            complaint,
            place,
            date,
            proof: null,
            status: "Pending"
        });

     const savedComplaint=   await newComplaint.save()

      // Now save the file (if uploaded) and update the complaint
    if (req.file) {
        const proofPath = saveFileToDisk(req.file);
        savedComplaint.proof = proofPath;
        await savedComplaint.save();
      }
        
        res.status(201).json({ message: "Complaint registered successfully!" ,
            complaintId : savedComplaint._id
        });

    } catch (error) {
      
        res.status(500).json({ message: "Error occurred", error: error.message });
    }
};



exports.getUserComplaints = async (req, res) =>{
    try {
       // Extract token from headers
        const token = req.header("Authorization")?.replace("Bearer ", "")
        if(!token){
            return res.status(401).json({message : "Access deneid ! no token provided"})
        }
        let decoded;
        try{
            decoded = jwt.verify(token, process.env.JWT_KEY)
            console.log("Token verified:" ,decoded);
            
        }


    catch (error) {
        console.error(" Token verification failed:", error.message);
        return res.status(401).json({ message: "Invalid token. Please log in again." });
    }
    const userId = decoded.userId

    const complaints = await Complaint.find({ createdBy: userId }).select('model complaint place date status createdAt proof')

    res.status(200).json({ complaints });
} catch (error) {
    console.error(" Error fetching complaints:", error);
    res.status(500).json({ message: "Error fetching complaints", error: error.message });
}
}

exports.getComplaintById = async (req, res) => {
    try {
        const complaintId = req.params.id
        const token = req.header("Authorization")?.replace("Bearer ", "")

        if(!token){
            return res.status(401).json({message:"Access denied! No token provided"})
        }

        let decoded
        try {
           decoded = jwt.verify(token,process.env.JWT_KEY) 
        } catch (error) {
            return res.status(401).json({ message: "Invalid token. Please log in again." })
        }

        const userRole = decoded.role
        const userId = decoded.userId

        let complaint
        if(userRole === 'admin'){
         complaint = await Complaint.findById(complaintId).select("model complaint place date status createdAt proof");

          }
          else{
            complaint = await Complaint.findOne({ _id: complaintId, createdBy: userId }).select("model complaint place date status createdAt proof")
          }

        if (!complaint) {
            return res.status(404).json({ message: "Complaint not found" });
        }

        res.status(200).json(complaint);
    } catch (error) {
        console.error("Error fetching complaint:", error);
        res.status(500).json({ message: "Error fetching complaint", error: error.message });
    }
};


exports.getAllComplaints = async (req, res) => {
    try {
        const complaints = await Complaint.find({}).sort({ createdAt :-1});

        return res.status(200).json({ complaints });
    } catch (error) {
        console.error("Error fetching all complaints:", error);
        return res.status(500).json({ message: "Error fetching complaints", error: error.message });
    }
};


exports.updateComplaintStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const { id } = req.params;

        if (!["Solved", "Rejected","Pending"].includes(status)) {
            return res.status(400).json({ message: "Invalid status update" });
        }

        const complaint = await Complaint.findByIdAndUpdate(id, { status }, { new: true })

        if (!complaint) {
            return res.status(404).json({ message: "Complaint not found" })
        }

        res.status(200).json({ message: "Complaint status updated", complaint })
    } catch (error) {
        console.error("Error updating complaint:", error);
        res.status(500).json({ message: "Error updating complaint", error: error.message })
    }
}

exports.getComplaintStats = async (req,res) => {

    try {
        const totalComplaints = await Complaint.countDocuments()
        const pendingComplaints = await Complaint.countDocuments({ status: "Pending" })
        const solvedComplaints = await Complaint.countDocuments({ status: "Solved" })
        const rejectedComplaints = await Complaint.countDocuments({ status: "Rejected" })

        res.status(200).json({
            totalComplaints,
            pendingComplaints,
            solvedComplaints,
            rejectedComplaints,
        })

    } catch (error) {
         console.error("Error fetching dashboard stats:", error)
        res.status(500).json({ message: "Error fetching statistics", error: error.message })
    }
    }

// Fetch Complaints by Model 
exports.getComplaintsByModel = async (req, res) => {
    try {
      const models = await Complaint.aggregate([
        { $group: { _id: "$model", count: { $sum: 1 } } },
        { $project: { name: "$_id", count: 1, _id: 0 } }
      ]);
  
      res.json(models);
    } catch (error) {
      res.status(500).json({ error: "Server error" });
    }
  };
