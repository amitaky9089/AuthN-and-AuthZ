const jwt=require("jsonwebtoken");
const { rawListeners } = require("../models/user");
require("dotenv").config();

//req.cookies.cookie_name
exports.auths=(req,res,next)=>{
    try{
         //fetching data from req body
         // here we are sending token separately
           console.log("cookie",req.cookies.token2);
           console.log("body",req.body.token)
           console.log("header",req.header("Authorization"))
           //|| req.header("Authorization").replace("Bearer ","")
           const token=req.body.token || req.cookies.token2 || req.header("Authorization").replace("Bearer ","");
           if(!token || token===undefined){
            return res.status(401).json({
                success:false,
                message:"token missing"
            })
           }
           //verify token
         try{
            // verify send decode token in object from
               //decode=payload
             const decode=jwt.verify(token,process.env.JWT_SECRET)
             console.log(decode)
             //beacuse we want furthure middle to work
             req.user=decode
         }catch(error){
              return res.status(401).json({
                success:false,
                message:"token is invalid"
              })
         }
         next();
    }catch(error){
      console.log(error)
      return res.status(404).json({
        success:false,
        message:"error in auth middleware"
      })
    }
}

exports.isStudent=(req,res,next)=>{
    
    try{
       if(req.user.role!=="Student"){
        return res.status(401).json({
            success:false,
            message:"this is a student protected portal"
        })
       }
       next();
    }
    catch(error){
         console.log(error)
         return res.status(500).json({
            success:false,
            message:"user student is not matched."
         })
    }
}


exports.isAdmin=(req,res,next)=>{
    try{
          if(req.user.role!=="Admin"){
            return res.status(500).json({
                success:false,
                message:"This is protected admin portal"
            })
          }
          next(); 
    }catch(error){

    //    console.log(error);
       console.error(error)
       return res.status(500).json({
        success:false,
        message:"user admin is not matched."
       })
    }
}