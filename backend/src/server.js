import express from "express"
// import path from "path"
import multer from "multer"
import connect from './db/db.js'
// import cors from "cors"

const app = express()
app.use(express.json())
app.get("/favico.ico",(req,res)=>{
    res.status(204).end()
})
connect()
// app.use("/",express.static(path.join(import.meta.dirname,"../../frontend")))
// app.get("/successful-upload",(req,res)=>{
//     res.sendFile(path.join(import.meta.dirname,"../../frontend","uploadsuccess.html"))
// })
// app.use(cors({
//     origin:"http://localhost:5500"
// }))
const mySto = multer.diskStorage({
    destination: "upload/",
    filename:(req,file,cb)=>{
        const name = Date.now()+file.originalname;
        cb(null, name)
    }
})

const upload = multer(
    {
        storage:mySto,
        limits:{
            fileSize:2 * 1024 * 1024
        }
    }
)
//WIP : upload to individual user folder
app.post("/api/upload",(req,res)=>{
    upload.single("myFile")(req,res,function(err){
        if(err){
            if(err.code==="LIMIT_FILE_SIZE"){
                // console.log("File exceed limit")
                res.status(400).json({msg:"File Size Exceeded the limit",err})
            }else{
                console.log(err.code)
            }
        }else{
            res.status(201).json({msg:"File Uploaded"})
        }
    })
})
// WIP : for URL, Add GroupID+userID
// note : Mongo not working with U26 (currently)
app.get("/api/download")

app.listen(5001,()=>{
    console.log("Connected to port 5001 :",`http://localhost:${5001}`)
})