const express = require('express');
const router = express.Router();
const {Comments} = require('../models');
const {validateToken} = require("../middlewares/AuthMiddlewares");

router.get("/:postId", async (req,res) => {
    const postId = req.params.postId;
    const comment = await Comments.findAll({
        where: {PostId:postId}
    });
    res.json(comment);
 
 });

 router.post("/",validateToken,async (req,res) => {
    const comment = req.body;
    await Comments.create(comment);
    res.json(comment);
 });


 
router.delete("/:commentId",validateToken, async (req,res) => 
{
   const commentId = req.params.commentId;
   
   Comments.destroy({where: {
      id: commentId,
   }});

   res.json(commentId);
});
 
module.exports = router;

