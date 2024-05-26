const router = require("express").Router();
const sitblogs = require("../model/sitblogs");
router.get('/getAllBlogs',async(req,res) =>{
    try {
        const posts = await sitblogs.find({});
        res.json(posts);
      } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
      }
})
router.get('/getActiveBlogs', async (req, res) => {
  try {
    const posts = await sitblogs.find({ isDelete: false });
    res.json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});
router.get('/getSingle/:id', async (req, res) => {
  try {
    const postId = req.params.id;
    console.log(postId);
    const posts = await sitblogs.findOne  ({ _id: postId });
    res.json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});
module.exports = router;