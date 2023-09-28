const mongoose=require("mongoose");


const blogSchema=mongoose.Schema({
title:{
    type:String,
    required:true
},
content:{
    type:String,
    required:true
},
category:{
    type:String,
    enum:["Business","Tech","Lifestyle","Entertainment"],
    required:true
},
date:{
    type:String,
    required:true
}
})

const blogModel=mongoose.model("blog",blogSchema)

module.exports={
    blogModel
}