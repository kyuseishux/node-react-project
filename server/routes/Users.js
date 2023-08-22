const express = require('express');
const router = express.Router();
const {Users} = require('../models');
const bcrypt = require('bcrypt');

const {sign} = require('jsonwebtoken');

const {validateToken} = require("../middlewares/AuthMiddlewares");

router.post("/", async (req,res) => {
  
    const {username,password} = req.body;

    const user = await Users.findOne({where:{username:username}});

    if(user)
    {
        res.json({msg : "01"});
    }
    else
    {
            bcrypt.hash(password,10).then((hash) => 
        {
            Users.create(
            {
                username:username,
                password:hash,
            });
            res.json({msg : "00"});
        });
    }
     
 
});

router.post("/login", async (req,res) => {
    const {username,password} = req.body;

    const user = await Users.findOne({where:{username:username}});
    
    if(!user) 
    {
        // User Doesnt Exists //
        res.json({msg: "01"});
    }
    else
    {
        bcrypt.compare(password,user.password).then((match) => {
            if(!match)
            {
                // Password Combination //
                res.json({msg: "02"});
            }
            else
            {
                // Sucessfully Login //

                const acessToken = sign({username:user.username,id:user.id},"thisisnotthewaybuttheonlyway101",
                process.env.TOKEN_KEY,
                {
                  expiresIn: "2h",
                });

                res.json({msg: "00",token:acessToken,username:user.username,id:user.id});
                
            }
        });  
    }
 
});

router.get('/validate', validateToken ,(req,res) => 
{
    res.json(req.user);
});

 

module.exports = router;

