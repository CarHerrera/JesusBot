module.exports = (sequelize, DataTypes) => {
    return sequelize.define('guildmember', {
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement:true
        },
        balance: {
			type: DataTypes.INTEGER,
			defaultValue: 0,
			allowNull: false,
		}
    },{
        timestamps:false,
    });
};