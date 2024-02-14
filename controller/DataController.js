const { log, table } = require('console');
const express = require('express'); const server = express(); server.use(express.json());
require('dotenv').config();

const fs = require('fs/promises');
const path = require('path');


const datasFolder = process.env.DATAS;


async function InfoAllData() {
    const sizeFiles = {};
    try {
        
        const tempF = (await fs.readdir(datasFolder)).filter(f => (path.extname(f) === '.data') || (path.extname(f) === '.sev'));
        if (tempF.length === 0) {
            console.error('InfoAllData -  if (tempF.length === 0)')
            return sizeFiles          
        }

        for (const arq of tempF) {
            const folderFile = path.join(datasFolder, arq);
            const stats =await fs.stat(folderFile);            
            sizeFiles[arq] = stats.size;
        }
        
        return sizeFiles

    } catch (error) {
        console.error('InfoAllData -   try')
    }

}

module.exports = {
    INFO: async (req, res) => {
        await InfoAllData().then((sizes) => {
             return res.status(200).json(sizes);
         }).catch((err) => {
             console.error(err)
             return res.status(401).json({
                 err: true,
                 message: err
             })
         });
    }

}