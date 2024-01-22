require("dotenv").config();
const express = require("express");
const config = require("./utils/config");
const apiRouter = require("./routes");
const app = express();
var bodyParser = require('body-parser')
const server = require("http").createServer(app);
const multer = require("multer")();
const cors = require("cors")({origin:"*"})
app.use(cors);
const responser = require("./utils/res.util");
const { writeFileSync } = require("fs");
app.use(responser);
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.post("/api/upload",multer.any(),async (req,res,nex)=>{
    const file = req.files&&req.files.length>0 ? req.files[0] : req.file? req.file : null;
    if(file){
        let fileName = (+ new Date()) + "_" +file.originalname;
        writeFileSync("public/"+ fileName,file.buffer);
        return res.Ok({
            file:fileName,
            fileOriginalName:file.originalname,
            size:file.size,
            mimeType:file.mimetype
        });
    }
    return res.BadRequest({});
})
app.use("/api",apiRouter);

app.use("*",(req,res,next)=>{
    res.NotFound(req.originalUrl,"Resource not found.");
})

const port = config.PORT || 3000;
server.listen(port,()=>{
    console.log(`http://localhost:${port}/api-doc`);
})