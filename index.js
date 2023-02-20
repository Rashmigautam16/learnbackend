const express=require("express");
const {connection}=require("./configs/db.js")
const {userRoute}=require("./routes/routes.js")
const {noteRouter}=require("./notes/notes");
const { authentication } = require("./middlewares/authenticate.js");

require('dotenv').config()

const app= express()

app.use(express.json())
app.get("/", (req, res)=>{
    res.send("Home Page")
})
app.use("/user", userRoute)
app.use(authentication)
app.use("/notes", noteRouter)
app.listen(process.env.port,async()=>{
    try{
        await connection;
        console.log("Connected to db server")
        console.log(`Connected to db server ${process.env.port}`)
    }catch(err){
        console.log("Couldn't connect to db server")
    }
})