const express=require("express");
const router=express.Router();

const{signup,login}=require("../controllers/auth");
const{auths,isStudent,isAdmin}=require("../middleware/Auth")
router.post("/login",login)
router.post("/signup",signup)

//testing route for single middleware
//here auth is middleware and then we have our handler
router.get("/test",auths,(req,res)=>{
    res.json({
        success:true,
        message:"Welcome to test portal"
    })
})

//auth and isStudent are middleware and then handler
router.get("/students",auths,isStudent,(req,res)=>{
    res.json({
        success:true,
        message:"welcome to Students Portal."
    })
})

//auth and isAdmin is middleware and then handler
router.get("/admin",auths,isAdmin,(req,res)=>{
    res.json({
        success:true,
        message:"welcome to admin portal."
    })
})


module.exports=router;