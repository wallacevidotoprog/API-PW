const express = require('express');
const server = express();
const routers = require('./routers/routerUser');
require('dotenv').config();
const { exec } = require('child_process');
const { GlinkServer } = require('./controller/GlinkServerController');
const { Broadcast } = require('./controller/BroadcastController');
const { Gshop } = require('./controller/GshopController');

server.use(express.json());
server.use(routers);

server.get("/verification",(req,res)=>{
    return res.status(200).send(true);
})

server.get('/broadcast',Broadcast)
server.get("/",GlinkServer)
//server.get('/gshop',Gshop) 


server.listen(process.env.SERVER_PORT,process.env.DB_HOST, () => {    
    console.log(`\x1b[33m[MyServer]\x1b[36m Server na porta ${process.env.SERVER_PORT}: http://${process.env.DB_HOST}:${process.env.SERVER_PORT} \x1b[0m`); 

    // exec('mkdir Directory1',(error,stout,sterr)=>{
    //     console.log(error);
    //     console.log(stout);
    //     console.log(sterr)
    // })
});
