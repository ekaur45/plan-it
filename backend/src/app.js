require("dotenv").config();
const express = require("express");
const config = require("./utils/config");
const apiRouter = require("./routes");
const app = express();
var bodyParser = require('body-parser')
const server = require("http").createServer(app);
const responser = require("./utils/res.util");
app.use(responser);
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.use("/api",apiRouter);

app.use("*",(req,res,next)=>{
    res.NotFound(req.originalUrl,"Resource not found.");
})

const port = config.PORT || 3000;
server.listen(port,()=>{
    console.log(`http://localhost:${port}/api-doc`);
})