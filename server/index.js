const express = require("express");
const app= express();
const cors = require("cors");

const db = require('./models');

app.use(express.json());
app.use(cors());

// Routers //
const postRouter = require('./routes/Posts');
app.use("/posts", postRouter);
const commentRouter = require('./routes/Comments');
app.use("/comments", commentRouter);
const userRouter = require('./routes/Users');
app.use("/auth", userRouter);
const likeRouter = require('./routes/Likes');
app.use("/likes", likeRouter);

// Initialize Table Models (Create Table) = DB.SEQUELIZE.SYNC
db.sequelize.sync().then(()=>
{
    app.listen(3001,() => {
        console.log ("NODE-REACT-PROJECT-BACKEND01 : Started Sucessfully . ");
    });
});

 