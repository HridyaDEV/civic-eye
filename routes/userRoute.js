const express = require("express")
const {registerUser,  getUserProfile, updateUserProfile, getAllUsers}= require("../controllers/userController")

const router = express.Router()

router.post("/register",registerUser)
router.get("/profile/:id",getUserProfile)
router.put("/profile/:id",updateUserProfile)
router.get("/alluser",getAllUsers)


module.exports = router