module.exports = (sequelize, DataTypes) => {
	return sequelize.define('user', {
		user_id: {
			type: DataTypes.STRING,
			primaryKey: true,
		},
		birthday:{
			type: DataTypes.STRING,
			defaultValue: null, 
			validate:{
				is: /^(0|1)-[0-9](0|1|2|3)[0-9]-([0-9]){1,4}/,
			}
		}
	}, {
		timestamps: false,
	});
};