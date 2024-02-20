const express = require('express'); const server = express(); server.use(express.json());
require('dotenv').config();
const fs = require('fs')

const folder =  process.env.FOLDER+"\\glinkd\\gamesys.conf"
const _GlinkServer=[];
const glinkServer = fs.readFile(folder,(err,data)=>{
    const temp = data.toString().split('\n');    
    let index=-1;
    temp.forEach((line)=>{        
        if (line.startsWith('[')) {
            index++;
            var gs = new GlinkServer();
            gs.HEADER = line.replace('[','').replace(']','').replace(/\t/g, '')
            _GlinkServer.push(gs);
        }
        else{
            const tempType = line.toString().replace('\t', '').split('=');
           
            if (tempType.length === 2) {
                const tempTV = []
                tempTV.push(tempType[0].toString().replace(/\t/g, ''),tempType[1].toString().replace(/\t/g, ''))
                _GlinkServer[index].VALUE.push(tempTV)
            }                       
        }
    })
    
});

class GlinkServer{
    constructor(
        HEADER,
        VALUE=[]
    ){
        this.HEADER=HEADER,
        this.VALUE=VALUE
    }
}

module.exports ={
    GlinkServer: async (req,res)=>{
        return res.status(200).json( _GlinkServer)
    }, 
}