const express=require("express");
const { blogModel } = require("../Model/blogModel");
const { auth } = require("../Middleware/auth");

const blogRouter=express.Router();


blogRouter.post("/post",auth,async(req,res)=>{

try {
    const user=new blogModel(req.body)
    await user.save()
    res.send({"msg":"post request succesfull"})
} catch (error) {
    res.send({"error":error})
}

})


blogRouter.get("/",auth,async(req,res)=>{
    const filter={}
    const sort={};
     if(req.query.filter){
        filter.category=req.query.filter;

     }
     if(req.query.sort){
        let order=req.query.order || "asc";
        if(req.query.sort=="date"){
            if(order=="asc"){
                sort.date=1
            }
            else if(order=="desc"){
                sort.date=-1
            }
        }
     }
     if(req.query.search){
        filter.title={$regex: `${req.query.search}`,$options: "i"}
     }

    try {
        const blog= await blogModel.find(filter).sort(sort)
        res.send(blog)
    } catch (error) {
        res.send({"error":error})
    }

})

blogRouter.patch("/update/:id",auth,async(req,res)=>{
const {id}=req.params;
const blog=await blogModel.findOne({_id:id})
try {
    if(req.body.userID!=blog.userID){
        res.send({"msg":"you are not authorized"})
    }
    else{
        await blogModel.findByIdAndUpdate({_id:id},req.body)
        res.send({"msg":"id has been updeted"})
    }
} catch (error) {
    res.send({"error":error})
}
})


blogRouter.delete("/delete/:id",auth,async(req,res)=>{
    const {id}=req.params;
    const blog=await blogModel.findOne({_id:id})
    try {
        if(req.body.userID!=blog.userID){
            res.send({"msg":"you are not authorized"})
        }
        else{
            await blogModel.findByIdAndDelete({_id:id})
            res.send({"msg":"id has been updeted"})
        }
    } catch (error) {
        res.send({"error":error})
    }
    
})

module.exports={
    blogRouter
}