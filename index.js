const express = require("express");
const app = express();
app.use(express.json());

const { connection } = require("./Config/database");
require("dotenv").config();

const {postRoute} = require("./Routes/Post");

app.use("/user", postRoute);


app.get("/",(req,res)=>{
    res.status(200).send({"msg":"Welcome to my Cyclic Backend!!"});
});


app.listen(process.env.PORT,async()=>{
    try{
        await connection;
        console.log("Conected to Database");
    }
    catch(err){
        console.log({"msg": err.message});
    }
    console.log(`Server is Running on port ${process.env.PORT}`);
});