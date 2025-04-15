const express = require("express")
const { submitFeedback, getAllFeedbacks,  updateFeedbackStatus } = require("../controllers/feedbackController")


const router = express.Router()

router.post("/submit", submitFeedback)
router.get("/all", getAllFeedbacks)
router.put("/status/:id", updateFeedbackStatus)

module.exports=router