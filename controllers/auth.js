// npm install bcrypt
const bcrypt=require("bcrypt");
const User=require("../models/user")
const jwt=require("jsonwebtoken")
require("dotenv").config();

exports.signup=async(req,res)=>{
    try{
    //fetching data
    const{name,email,password,role}=req.body;
    //checking whether user exist or not
    const userExist=await User.findOne({email});
    // if exist then
    if(userExist){
        return res.status(400).json({
            success:false,
            message:"User already Exist"
        })
    }

    //securing our password
    let hashedpassword;
    try{
        //two parameters password want to hash and no.of rounds
       hashedpassword=await bcrypt.hash(password,10);
    }
    catch(error){
       return res.status(400).json({
        success:false,
        message:"error while hashing"
       })
    }

    // creating entry for user in db
    const user=await User.create({
        name,email,password:hashedpassword,role 
    })
    
    return res.status(200).json({
        success:true,
        message:"entry created successfully"
    })
}
catch(error){
    console.log(error)
    return res.status(400).json({
        success:false,
        message:"error in creating entry of user in db, try again later."
    })
}
}

//login

exports.login=async(req,res)=>{
    try{
    //fetching data using body parser
      const{email,password}=req.body;
    // verify whether valid data is enterd or not
      if(!email || !password){
        return res.status(400).json({
            success:false,
            message:"Please fill the details carefully."
        })
      }
   // verify registered user
      let user=await User.findOne({email});
      if(!user){
        return res.status(401).json({
            success:false,
            message:"User is not registered."
        })
      }
   //verify password and generate JWT
   // creating a payload
   const payload={
       email:user.email,
       id:user._id,
       role:user.role,
   }
     if(await bcrypt.compare(password,user.password)){
         //if password matches
         //npm install jsonwebtoken for jwt 
         let token=jwt.sign(payload,process.env.JWT_SECRET,
            {
                expiresIn:"100000h"
            }
         )
         user=user.toObject();
         //adding extra parameter/field in user and add into it.(user->object)
         user.token=token
         //removing password from user object not from database as we want to send data back to user
         user.password=undefined
         //for cookie creation we have to write name,data,options
         const options={
            // in milliseconds
            expires:new Date( Date.now()+3*24),
            //client have no access to cookie
            httpOnly:true
         }
         res.cookie("token2",token,options).status(200).json({
            success:true,
            token,
            user,
            message:"User logged in successfully."
         });  
     }
     else {
        // if password not matches
        return res.status(403).json({
            success:false,
            message:"Incorrect Password "
        })
     }
    }
    catch(error){
          console.log(error)
          return res.status(500).json({
            success:false,
            message:"login failure"
          })
    }
}