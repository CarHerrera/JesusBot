module.exports = (sequelize, DataTypes) => {
	return sequelize.define('user_item', {
		user_id: DataTypes.STRING,
		item_id: DataTypes.INTEGER,
		amount: {
			type: DataTypes.INTEGER,
			allowNull: false,
			defaultValue: 0,
		},
	}, {
		timestamps: false,
	});
};