module.exports = (sequelize, DataTypes) => {
    return sequelize.define('guildmember', {
        guild_member_id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement:true
        },
    },{
        timestamps:false,
    });
};