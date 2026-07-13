require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const authRouter = require("./Routes/authRoute");
const fileRouter = require("./Routes/fileRoute")


const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.get("/", (req, res) => {
    res.send("Backend Running");
});
app.use("/api/auth", authRouter);
app.use("/api/files", fileRouter)

mongoose.connect(process.env.MONGODB_URI)
.then(()=>console.log("MongoDB Connected"))
.catch(err=>console.log(err));


const PORT = process.env.PORT;
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})