const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");


// env file config
dotenv.config();
console.log("MONGO_URI =>", process.env.MONGO_URI);

// App init
const app = express();

//Middleware

app.use(cors());
app.use(express.json()); // parsing data into json

// importing Routes 
const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);


// dB config 

const connectDB = require("./config/db");
connectDB();

const PORT = process.env.PORT || 5000;


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
