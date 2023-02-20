const express=require("express");

const noteRouter=express.Router();

noteRouter.get("/", (req, res) => {
    res.send("get notes")
})

noteRouter.post("/create", (req, res) => {
    res.send("create notes")
})

noteRouter.get("/delete:id", (req, res) => {
    res.send("delete notes")
})

module.exports = {
    noteRouter
}