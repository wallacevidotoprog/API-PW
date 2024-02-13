const jwt = require('jsonwebtoken');
const { ExistToken } = require('../controller/UserController');

module.exports={
    eLogin: async (req,res,next)=>{
       const tk = req.headers["authorization"];
        try {
            if (!tk) {
                return res.status(401).json({
                    err:true,
                    message: "Authentication error",
                })
            }
            else{
                const decod = jwt.verify(tk,process.env.TOKEN)
                if (!decod){
                    return res.status(401).json({
                        err:true,
                        message: "Authentication error",
                    });  
                }
                if (ExistToken(decod.id,decod.email)) {   
                    req.TOKEN = tk;                
                    next();
                }                
            }           
        } catch (error) {
            return res.status(500).json({
                err:true,
                message: "Authentication error",
            })
        }
    }
}