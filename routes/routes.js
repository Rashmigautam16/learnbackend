const express=require("express")
const {UserModel}=require("../model/model.js")
const jwt=require("jsonwebtoken")
const bcrypt=require("bcrypt")
const userRoute=express.Router()

userRoute.post("/register", async(req, res) => {
    const {name,email,pass}=req.body
    try{
        bcrypt.hash(pass,5,async(err,hash)=>{
            if(err){
                res.send({"msg":"Something went wrong", "error":err.message})
            }else{
                const user= new UserModel({name, email, pass:hash});
                await user.save()
                res.send({"msg":"New User has been registered"})
            }
        });
       
    }catch(err){
        res.send({"msg":"user is not registered"})
    }
   // res.send({"msg":"New User has been registered"})
})

userRoute.post("/login", async(req, res) =>{
    const {email, pass}=req.body
    try{
        const user = await UserModel.find({email})
        if(user.length>0){
            bcrypt.compare(pass, user[0].pass,(err, result)=>{
             if(result){
                let token=jwt.sign({course:"backend"}, "masai")
                res.send({"msg":"Logged in successfully", "token":token})
             }else{
                res.send({"msg": "Something went wrong"})
             }
            })
        }else{
            res.send({"msg":"wrong credentials"})
        }
    }catch(err){
        res.send({"msg":"some error in login"})
    }
})


module.exports={
    userRoute
}