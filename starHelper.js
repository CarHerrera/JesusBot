const db = require('./index.js');
const { User, Guilds } = require('./dbObjects.js');
const { Sequelize } = require('sequelize');
const sequelize = new Sequelize('sqlite::memory:');
const stars = db.stars;

async function addBalance(guildId, userId, amount) {
	const guild = stars.get(guildId);
	// const user = stars.get(id);

	if (guild) {

		if(await guild.hasUser(userId)){
			console.log('In guild has USer');
			console.log(await guild.getUsers());
			// console.log(JSON.stringify(users,null,2));
		} else {
			console.log(guild);
		}
		
		// console.log(guild.getMember());
		console.log('Before return');
		return guild.save();
		// user.balance += Number(amount);
		// return user.save();
	}
	const newGuild = await Guilds.create({guild_id: guildId});
	console.log('New guild created');
	const newUser = await User.create({user_id: userId, balance: amount});
	await newGuild.addUser(newUser);
	console.log('new user created');
	stars.set(guildId, newGuild);
	console.log('set in collection');
	console.log(newGuild);
	console.log(await newGuild.countUsers());
	sequelize.sync();
	return newGuild;
}

function getBalance(id) {
	const user = stars.get(id);
	return user ? user.balance : 0;
}

module.exports = {addBalance, getBalance};
