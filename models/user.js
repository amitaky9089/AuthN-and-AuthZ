const mongoose=require("mongoose");

// the trim option is used to remove any leading or trailing white spaces from the value of the name field.
//enum restricts the values of role to these three only.
const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        trim:true,
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        enum:["Admin","Student","Visitor"]
    }
});

module.exports=mongoose.model("User",userSchema);