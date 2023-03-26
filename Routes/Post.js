const express = require("express");
const postRoute = express.Router();

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const {Workmodel} = require("../Models/schema");


// REGISTER ROUTE----------------------------------------
postRoute.post("/register",async(req,res)=>{
    const {name,email,password} = req.body
    try{
        bcrypt.hash(password, 7, async (err, hash)=>{
            const user = new Workmodel({name,email,password:hash});
            await user.save();
            res.status(200).send({"msg": "Registered Successfully"});
        });
    }
    catch(err){
        res.status(400).send({"msg":err.message});
    }
});

// LOGIN ROUTE---------------------------------------------
postRoute.post("/login",async(req,res)=>{
    const {email,password} = req.body
    try{
        const user = await Workmodel.findOne({email});
        if(user){
            bcrypt.compare(password, works.password,(err, result)=>{
                if(result){
                    res.status(200).send({"msg": "Login Successfully","token": jwt.sign({ Avishek: 'singh' }, 'secret')});
                }
                else{
                    res.status(400).send({"msg": "Login failed"});
                }
            });
        }
    }
    catch(err){
        res.status(400).send({"msg":err.message});
    }
});

postRoute.get("/data",(req,res)=>{
    const token = req.headers.authorization
    jwt.verify(token, 'secret',(err, decoded)=>{
        if(decoded){
            res.status(200).send({"msg":"Data Showed"});
        }
        else{
            res.status(400).send({"msg":"Login required, Unable to get the token!"});
        }
      });
});

postRoute.get("/profile",(req,res)=>{
    const token = req.headers.authorization
    jwt.verify(token, 'secret',(err, decoded)=>{
        if(decoded){
            res.status(200).send({"msg":"Data Showed"});
        }
        else{
            res.status(400).send({"msg":"Login required, Unable to get the token!"});
        }
      });
});

module.exports = {postRoute};
