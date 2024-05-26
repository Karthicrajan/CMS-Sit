const router = require("express").Router();
const sitBlogs = require("../model/sitblogs");

router.post("/create", async(req,res)=>{
    try{
        const createPost = new sitBlogs({
           ...req.body
        });
        const post = await createPost.save();
        res.status(200).json(post);
    }catch(err){
        res.status(500).json(err);
    }
})
router.put("/update/:id", async(req,res)=>{
    const postId = req.params.id;
    const updatedData = req.body;
    sitBlogs.findByIdAndUpdate(postId , updatedData,{new:true})
    .then((updatedPost) => {
        res.json(updatedPost);
      })
      .catch((error) => {
        res.status(500).json({ error: 'Failed to update post' });
      });
})
router.delete("/deletepost/:id", async(req,res)=>{
    const postId = req.params.id;
    const updatedData = req.body;
    sitBlogs.findByIdAndRemove(postId)
    .then((updatedPost) => {
        res.json(updatedPost);
      })
      .catch((error) => {
        res.status(500).json({ error: 'Failed to update post' });
      });
})
module.exports = router;