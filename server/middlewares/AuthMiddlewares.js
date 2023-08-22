
const {verify} = require("jsonwebtoken");


 
const validateToken = (req, res, next) => 
{
   const acessToken = req.header("acessToken");

   if (!acessToken) return res.json({error: "User Not Logged In..."})

   try{

        const validToken = verify(acessToken,"thisisnotthewaybuttheonlyway101");
        req.user=validToken;        
        if(validToken)
        {
            return next();
        }

   }catch(err)
   {
        return res.json({error: err});
   }

};

module.exports = {validateToken};