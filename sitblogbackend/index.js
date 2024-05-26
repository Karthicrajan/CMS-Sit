const express = require('express');
const mongoose = require("mongoose");
const app = express();
const dotenv = require("dotenv");
const users = require("./routes/users");
const post = require("./routes/sitblogs");
const img = require("./routes/blogImageUpload");
const pfImg = require("./routes/profileImageUpload");
const fetchPosts = require("./routes/getAllBlogs");
const cors = require('cors');
app.use(cors());
dotenv.config();
app.use(express.json());
app.use('/images', express.static('images'));

mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(console.log("connected to monog")).catch((err) => console.log(err));
app.use("/api/auth",users);
app.use("/api/blogpost",post);
app.use("/api/blogimage",img);
app.use("/api/blogAuthorimage",pfImg);
app.use("/api/blogPosts",fetchPosts);
app.listen(5000,()=>{
    console.log('server is running');
})
