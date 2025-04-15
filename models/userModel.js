const mongoose = require('mongoose')

const UserScheme = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    mobile: {
        type: String,
        required: true
    },
    dob: {
        type: Date,
        required: true
    },
    email: {
        type: "String",
        required: true,
    },
    password: {
        type: "String",
        required: true,
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    address: {
        type: "String",
        default: ""
    },
    state: { 
        type: "String",
         default: ""
         },
    idproof: {
         type:"String",
          default: "" 
        },
    idnumber: { 
        type: "String", 
        default: "" 
    }
})
module.exports = mongoose.model("User", UserScheme)