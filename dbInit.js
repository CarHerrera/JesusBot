const Sequelize = require('sequelize');
// const { INSERT } = require('sequelize/types/query-types.js');

const sequelize = new 
Sequelize('database', 'username', 'password', {
	host: 'localhost',
	dialect: 'sqlite',
	logging: false,
	storage: 'database.sqlite',
});
require('./models/CurrencyShop.js');
require('./models/GuildMembers.js');
require('./models/Guilds.js');
require('./models/User.js');
require('./models/UserItems.js');

const force = process.argv.includes('--force') || process.argv.includes('-f');
sequelize.sync({force}).then(async => {
    console.log('Databse created');
    sequelize.close();
}).catch((err) => {
    console.log(err);
});