module.exports = (sequelize,DataTypes) =>
{
    const Comments = sequelize.define("Likes");
    
    return Comments;
}