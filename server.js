const express = require("express")
const app = express()
const cors= require('cors')
require('dotenv').config()

const mongoose = require('mongoose')

const userRoute = require('./routes/userRoute');
const userAuthRoute = require('./routes/userAuthRoute')
const complaintRoute = require('./routes/complaintRoute')
const feedbackRoute = require('./routes/feedbackRoute')


app.use(cors())
app.use(express.json())

app.use("/uploads", express.static("uploads")); 
app.use('/user',userRoute)
app.use('/auth',userAuthRoute)
app.use("/complaint",complaintRoute)
app.use("/feedback",feedbackRoute)


const url = process.env.DB_URL
const connectDB = async () => {
    try {
        await mongoose.connect(url)
        console.log("Database Connected")
    } catch (error) {
        console.log('connection error', error);
    }
}

const PORT = process.env.PORT || 5112

connectDB().then(()=>{
    app.listen(PORT, () =>{
        console.log(`server listen ${PORT}`);
        
    })
})