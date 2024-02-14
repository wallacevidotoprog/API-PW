const express = require('express');
const server = express();
const routers = require('./routers/routerUser');
require('dotenv').config();
const { exec } = require('node:child_process');

server.use(express.json());
server.use(routers);

server.get("/verification",(req,res)=>{
    return res.status(200).send(true);
})

server.get("/",(req,res)=>{

    exec('"/home/server.sh" start');
    console.log('EXEX');
    return res.status(200).send(true);
})

server.listen(process.env.SERVER_PORT,process.env.DB_HOST, () => {    
    console.log(`\x1b[33m[MyServer]\x1b[36m Server na porta ${process.env.SERVER_PORT}: http://${process.env.DB_HOST}:${process.env.SERVER_PORT} \x1b[0m`); 
});
