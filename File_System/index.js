const express = require('express');
const app = express();
const multer = require('multer');
const path = require('path')
const fs = require("fs")


const fsenginee = multer.diskStorage({
    destination:(req,res,cb)=>{
        cb(null,'../File_System/images');
    },
    filename:(req, file ,cb) => {
        cb(null,file.originalname);
    }
});

const upload = multer({storage:fsenginee})

app.get("/",(req,res)=>{
    res.sendFile(path.join(__dirname,"../File_System/index.html"))
})

app.post('/single',upload.single('image'),(req,res)=>{
    console.log(req.file);
    res.send("uploaded")
});

app.post('/multiple',upload.array('images',3),(req,res)=>{
    console.log(req.files);
    res.send("uploaded multiple")
});




app.listen(5000)