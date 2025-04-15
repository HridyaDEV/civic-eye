const mongoose = require("mongoose")

const complaintSchema = new mongoose.Schema({

    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    model: {
        type: String,
        required: true
    },
    complaint: {
        type: String,
        required: true
    },
    place: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: "Pending"
    },
    proof: {
        type: String
    },

}, { timestamps: true }

)

module.exports = mongoose.model("Complaint", complaintSchema)