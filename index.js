const express = require('express');
const server = express();
const routers = require('./routers/routerUser');
const fs = require('fs')
require('dotenv').config();


server.use(express.json());
server.use(routers);

server.get("/verification",(req,res)=>{
    return res.status(200).send("true");
})
server.get("/",(req,res)=>{
    let nan = process.env.DATAS;
    return res.status(200).send(nan);
})

server.listen(process.env.SERVER_PORT,process.env.DB_HOST, () => {    
    console.log(`\x1b[33m[MyServer]\x1b[36m Server na porta ${process.env.SERVER_PORT}: http://${process.env.DB_HOST}:${process.env.SERVER_PORT} \x1b[0m`); 
});
