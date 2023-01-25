const Sequelize = require('sequelize');
// const { INSERT } = require('sequelize/types/query-types.js');

const sequelize = new Sequelize('database', 'username', 'password', {
	host: 'localhost',
	dialect: 'sqlite',
	logging: false,
	storage: 'database.sqlite',
});

const User = require('./models/User.js')(sequelize, Sequelize.DataTypes);
const CurrencyShop = require('./models/CurrencyShop.js')(sequelize, Sequelize.DataTypes);
const UserItems = require('./models/UserItems.js')(sequelize, Sequelize.DataTypes);
const Guilds = require('./models/Guilds.js')(sequelize, Sequelize.DataTypes);
const GuildMembers = require('./models/GuildMembers.js')(sequelize, Sequelize.DataTypes);

User.belongsToMany(Guilds, { through: GuildMembers, foreignKey: 'server'});
Guilds.belongsToMany(User, { through: GuildMembers, foreignKey: 'member'});
UserItems.belongsTo(CurrencyShop, { foreignKey: 'item_id', as: 'item' });

sequelize.sync({force:true}).then(() => {

}).catch((err)=>{
	console.log(err);
});

Reflect.defineProperty(User.prototype, 'addItem', {
	value: async item => {
		const userItem = await UserItems.findOne({
			where: { user_id: this.user_id, item_id: item.id },
		});

		if (userItem) {
			userItem.amount += 1;
			return userItem.save();
		}

		return UserItems.create({ user_id: this.user_id, item_id: item.id, amount: 1 });
	},
});

Reflect.defineProperty(User.prototype, 'getItems', {
	value: () => {
		return UserItems.findAll({
			where: { user_id: this.user_id },
			include: ['item'],
		});
	},
});

module.exports = { User, CurrencyShop, UserItems, Guilds,GuildMembers};