const express=require("express");
const { connection } = require("./db");
const { userRouter } = require("./Routes/userRoutes");
const { blogRouter } = require("./Routes/blogRoutes");
const cors=require("cors")

const app=express()
app.use(cors())
app.use(express.json())
app.use("/users",userRouter)
app.use("/blogs",blogRouter)



app.listen(8000, async()=>{

try {
    await connection
    console.log("connected to the db");
    console.log("server runnng at port 8080");
} catch (error) {
    console.log(error);
}


})