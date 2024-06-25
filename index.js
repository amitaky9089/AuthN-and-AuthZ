const express=require("express")
const app=express();

require("dotenv").config();

const PORT=process.env.PORT || 4000;

//for fetching data from cookie
const cookieParser=require("cookie-parser")
app.use(cookieParser());
//for fetching data from request body
app.use(express.json());

require("./config/database").connect();

const user=require("./routes/user");
app.use("/api/v1",user)

app.listen(PORT,(()=>{
    console.log(`Server is running at ${PORT} PORT.`)
}))
