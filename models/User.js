module.exports = (sequelize, DataTypes) => {
	return sequelize.define('user', {
		user_id: {
			type: DataTypes.STRING,
			primaryKey: true,
		},
	}, {
		timestamps: false,
	});
};