const router = require ("express").Router();
const User = require ('../models/User');
const Post = require ('../models/Post');


//CREATE POST
router.post("/", async (req, res)=> {
    const newPost = new Post(req.body);
    try {
        const savedPost = await newPost.save()
        res.status(200).json(savedPost)

    } catch (err) {
        res.status(500).json(err)
    }

})

//UPDATE POST
router.put("/:id", async(req, res)=> {
    try{
        const updatePost = await Post.findById(req.params.id);
        if(updatePost.username === req.body.username){
            try {
                const updateUser = await Post.findByIdAndUpdate(
                    req.params.id,
                    {$set: req.body},
                    {new:true}
                )
                res.status(200).json(updateUser)
            } catch (err) {
                res.status(500).json(err)
            }
        }
        try {
            
        } catch (err) {
            res.status(404).json("you can only upate your posts")
        }
    }catch(err){
        res.status(500).json(err)
    }
})

//DELETE POST
router.delete("/:id", async(req, res)=> {
    try{
        const deletePost = await Post.findById(req.params.id);
        if(deletePost.username === req.body.username){
            try {
                // const del = await deletePost.findByIdAndDelete()
                await deletePost.delete()
                res.status(200).json("post has been deleted successfully")
            } catch (err) {
                res.status(500).json(err)
            }
        } else {
            res.status(401).json("you cannot delete this post!")
        }
    }catch(err){
        res.status(500).json(err)
    }
})

module.exports = router