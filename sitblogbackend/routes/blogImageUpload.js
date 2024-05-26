const router = require("express").Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'images'); // Folder where the uploaded images will be stored
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = uuidv4();
      const fileExtension = path.extname(file.originalname);
      cb(null, uniqueSuffix + fileExtension); // Generate a unique filename for each image
    },
  }); 

const upload = multer({storage});

router.post("/imageupload",upload.single('file') , (req,res)=>{
    const storedFilename = req.file.filename;
  
    // Create the URL of the stored image based on your server's setup
    const imageUrl = storedFilename;
  console.log(imageUrl);
    // Save the image URL to MongoDB or perform any other necessary operations
  
    res.json({ success:true, imageUrl })
})
module.exports = router;