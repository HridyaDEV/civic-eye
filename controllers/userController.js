const User = require("../models/userModel")

exports.registerUser = async (req , res) => {
    try {
        const {fullName, mobile,dob,email,password} = req.body

        if (!fullName || !mobile || !dob || !email || !password) {
            return res.status(400).json({ message: 'Provide valid data' })
        }

        const existingUser = await User.findOne({email})
        if (existingUser)
            return res.status(400).json({error:"User already exists"})
        
        const newUser = new User({fullName,mobile,dob,email,password})
        await newUser.save()

        res.status(201).json({message : "User registered successfully "})
    } catch (error) {
        res.status(500).json({error: "Registration failed"})
        
    }
}

exports.getUserProfile = async (req,res) =>{
   try {

    console.log("Fetching user with ID:", req.params.id); 
    
    const user = await User.findById(req.params.id)
    if (!user){
        return res.status(400).json({message:"User not found"})
    }
    res.status(200).json({
        fullName: user.fullName,
        mobile: user.mobile,
        dob:user.dob,
        email: user.email,
        password: user.password,
        address:user.address || "",
        state : user.state || "",
        idproof : user.idproof || "",
        idnumber : user.idnumber || ""
    })
   } catch (error) {
    console.error("Error fetching user:", error.message); //
    res.status(500).json({message:"Error fetching user", error : error.message})
    
   }
}
exports.updateUserProfile = async (req, res) => {
    try {
        const userId = req.params.id;
        const updateData = req.body;


        // Ensure userId exists
        if (!userId) {
            return res.status(400).json({ message: "User ID is required" });
        }

        // Ensure updateData is not empty
        if (!updateData || Object.keys(updateData).length === 0) {
            return res.status(400).json({ message: "No update data provided" });
        }

        // Validate ID proof & number (if provided)
        if (updateData.idproof && updateData.idnumber) {
            const idValidationRules = {
                "Aadhar Card": /^\d{12}$/,  
                "PAN Card": /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, 
                "Voter ID": /^[A-Z]{3}[0-9]{7}$/, 
                "Passport": /^[A-Z0-9]{6,9}$/, 
                "Driving License": /^[A-Z]{2}[0-9]{13}$/ 
            };

            const selectedProof = updateData.idproof;

            if (idValidationRules[selectedProof]) {
                const isValidId = idValidationRules[selectedProof].test(updateData.idnumber);

                if (!isValidId) {
                    return res.status(400).json({ message: `Invalid ${selectedProof} number format` });
                }
            } else {
                return res.status(400).json({ message: "Invalid ID proof type" });
            }
        }

        // Proceed with user update
        const updatedUser = await User.findByIdAndUpdate(userId, updateData, { new: true });

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        console.log("Updated User:", updatedUser);  // Debugging

        res.status(200).json({ message: "Profile updated successfully", user: updatedUser });

    } catch (error) {
        console.error("Error updating profile:", error);  // Debugging
        res.status(500).json({ message: "Error updating profile", error: error.message });
    }
};



exports.getAllUsers = async (req,res)=> {
    try {
      
        const users= await User.find({},"-password")
        res.status(200).json(users)
    } catch (error) {
        res.status(500).json({message : "Error fetching users",error:error.message})
    }
}