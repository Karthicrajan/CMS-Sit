const router = require("express").Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'images/'); // Folder where the uploaded images will be stored
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = uuidv4();
    const fileExtension = path.extname(file.originalname);
    cb(null, uniqueSuffix + fileExtension); // Generate a unique filename for each image
  },
});
const upload = multer({storage});

router.post('/profileImage',upload.single('file'),(req,res) =>{
    // if(!req.file){
    //     return res.status(400).json({message:'No image provided'});
    // }
    const storedFilename = req.file.filename;
    console.log(storedFilename);
    res.json({ success:true, storedFilename })
})

module.exports = router;