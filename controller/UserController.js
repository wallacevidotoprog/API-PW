const express = require('express'); const server = express(); server.use(express.json());
const connect = require("../database/db");
const users = require("../model/userDatabase");
const crypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();


async function UserExist(_email) {
    const result = await   users.findOne({
        attributes:['email'],
        where:{email:_email}
    });
    if (!result) {
        return false;
    }
    else{
        return true;
    }
}
module.exports = {
    RegisterUser: async (req,res)=> {
        console.log(req.body.passdev);
        console.log(process.env.PASSDEV );
        if (req.body.passdev != process.env.PASSDEV ) {
            return res.status(201).json({
                err:true,
                message:"err pass"
            })
        }
        if (!(await UserExist(req.body.email))) {
            req.body.pass = await crypt.hash(req.body.pass,10)
            await users.create(req.body).then((()=>{
                return res.status(200).json({
                    err:false,
                    messsage: "Registration Completed Successfully"
                });
            })).catch((err)=>{
                return res.status(400).json({
                    err:true,
                    messsage: `ERR: ${err}`
                });
            })
        }
        else{
            return  res.send('não pode coisar')
        }
    },
    LogIn: async (req,res)=>{
        const user = await users.findOne({attributes:['ID','email','pass'],where:{email:req.body.email}});
        if (!user){
            return res.status(400).json({
                err: true,
                message: "Something wrong when entering your email or password."
            });
        }
        else{
            if ((await crypt.compare(req.body.pass,user.pass))) {
                const tk = jwt.sign({id:user.ID,email:user.email},process.env.TOKEN,{expiresIn:'1d'});
                res.cookie('Authorization',tk);
                return res.status(200).json({
                    err: false,
                    message: "Logged in successfully",
                    token: tk
                });
            }else{
                return res.status(400).json({
                    err: true,
                    message: "Something wrong when entering your email or password."
                });
            }
        }
    },
    ExistToken: async (_id,_email)=>{
        const result = await   users.findOne({
            attributes:['email'],
            where:{email:_email,pass:_id}
        });
        if (!result) {
            return false;
        }
        else{
            return true;
        }
    }    
}