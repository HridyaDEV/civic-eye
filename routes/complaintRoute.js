const express = require("express")
const { submitComplaint, getUserComplaints, getComplaintById, getAllComplaints, updateComplaintStatus, getComplaintStats, getComplaintsByModel } = require("../controllers/complaintController")
const {upload} = require('../config/multer')

const router = express.Router()

router.get("/complaint-count", getComplaintStats)
router.post("/complaints",upload.single('proof'), submitComplaint)
router.get("/mycomplaints", getUserComplaints)
router.get("/viewcomplaint/:id",  getComplaintById)
router.get("/allcomplaints",getAllComplaints)
router.put("/complaints/:id/status", updateComplaintStatus)
router.get('/dashboard-status',getComplaintStats)
router.get('/dashboard-model',getComplaintsByModel)



module.exports = router