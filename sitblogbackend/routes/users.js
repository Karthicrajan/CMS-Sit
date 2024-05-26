const router = require("express").Router();
const User = require("../model/users");
const jwt = require('jsonwebtoken');
router.post("/register", async(req,res)=>{
    try{
        const newUser = new User({
            userName:req.body.userName,
            password: req.body.password,
        });
        const user = await newUser.save();
        res.status(200).json(user);
    }catch(err){
        res.status(500).json(err);
    }
})
router.post('/image',async(req,res)=>{
   try{
    console.log("image uploaded");
   }catch(err){
    console.log(err);
   }
})

function generateToken(payload) {
    const token = jwt.sign(payload, 'your_secret_key');
    return token;
  }

router.post('/login', (req, res) => {
    const { email, password } = req.body;
    User.findOne({ email, password })
    .then((user) => {
      if (user) {
        console.log(user);
       const token = generateToken({userId:user._id,userName:user.userName});
        res.json(token);
      } else {
        res.status(401).json({ error: 'Invalid credentials' });
      }
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    });
  });
module.exports = router;