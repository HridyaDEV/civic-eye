const mongoose = require('mongoose')

const FeedbackSchema = new mongoose.Schema({
    user: {
         type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true 
        }, // Reference to User
    message: { 
        type: String,
         required: true
         },

         status: {
            type: Boolean,
            default: null, 
        },
   
   
  },{ timestamps: true });
  
  module.exports = mongoose.model("Feedback", FeedbackSchema)