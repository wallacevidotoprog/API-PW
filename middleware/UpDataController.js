const multer = require('multer');
require('dotenv').config();
module.exports = (multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, process.env.DATAS)
        },
        filename: (req, file, cb) => {            
            cb(null, file.originalname)              
        }
    })
}));
