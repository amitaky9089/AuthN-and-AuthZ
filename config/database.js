const mongoose=require("mongoose")

require("dotenv").config();

exports.connect=()=>{
         mongoose.connect(process.env.MONGODB_URL)
         .then(()=>{console.log("connection with db successfull.")})
         .catch((err)=>{
            console.log("Db connection is facing some issue.")
            console.error(err);
            process.exit(1);
         });
    }
