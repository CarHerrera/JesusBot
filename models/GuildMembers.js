module.exports = (sequelize, DataTypes) => {
    return sequelize.define('guild_member', {
        balance: {
			type: DataTypes.INTEGER,
			defaultValue: 0,
			allowNull: false,
		}
    },{
        timestamps:false,
    });
};