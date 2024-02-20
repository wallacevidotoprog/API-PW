const express = require('express'); const server = express(); server.use(express.json());
const fs = require('fs');
const Enum = require('enum');
require('dotenv').config();

const LiveChat = []
const xChanel = new Enum({
    0: 'Common',
    1: 'World',
    2: 'Squad',
    7: 'Trade',
    9: 'Broadcast',
    15: 'InterServer',
})
// Broadcast = 9
// Trade = 7
// Squad = 2
// World = 1
// Common = 0
// Chatroom = 

const bc = fs.readFile(process.env.LOGSSV, (err, data) => {
    data.toString().split('\n').forEach((line) => {
        if (line != null) {
            const tempChat = new CHAT();
            tempChat.DATE.push(line.split(' ')[0])
            tempChat.DATE.push(line.split(' ')[1])
            tempC = (line.substring(line.indexOf('chat : ') + 7)).substring(0, (line.substring(line.indexOf('chat : ') + 7)).indexOf(':')).toUpperCase();
            switch (tempC) {
                case 'CHAT':
                    tempChat.CHAT = tempC;
                    tempChat.CHANEL = (line.substring(line.indexOf('chl=') + 4)).substring(0, (line.substring(line.indexOf('chl=') + 4)).indexOf(' '));
                    console.log(xChanel.key); 
                    
                    break;
                case 'GUILD':
                    tempChat.CHAT = tempC;
                    tempChat.CHANEL = (line.substring(line.indexOf('fid=') + 4)).substring(0, (line.substring(line.indexOf('fid=') + 4)).indexOf(' '));
                    break;
                case 'GROUP':
                    tempChat.CHAT = tempC;
                    tempChat.CHANEL = (line.substring(line.indexOf('room=') + 5)).substring(0, (line.substring(line.indexOf('room=') + 5)).indexOf(' '));
                    break;

                default:
                    break;
            }
            tempChat.IDPLAYER = (line.substring(line.indexOf('src=') + 4)).substring(0, (line.substring(line.indexOf('src=') + 4)).indexOf(' '));
            tempChat.MSG = new Buffer(line.substring(line.indexOf('msg=') + 4), 'base64').toString('UTF-16LE');
            LiveChat.push(tempChat)
        }

    })

})

class CHAT {
    constructor(DATE = [], CHAT, IDPLAYER, CHANEL, MSG) {
        this.DATE = DATE, this.CHAT = CHAT, this.IDPLAYER = IDPLAYER, this.CHANEL = CHANEL, this.MSG = MSG
    }
}



module.exports = {
    Broadcast: async (req, res) => {
        return res.status(200).send(JSON.stringify(LiveChat))
    }
}