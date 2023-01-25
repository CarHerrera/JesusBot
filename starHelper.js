const db = require('./index.js');
const { User, Guilds } = require('./dbObjects.js');
const { Sequelize } = require('sequelize');
const GuildMembers = require('./models/GuildMembers.js');
const sequelize = new Sequelize('sqlite::memory:');
const stars = db.stars;

async function addBalance(guildId, userId, amount) {
	const user = await User.findByPk(userId);
	const guild = await Guilds.findByPk(guildId);
	if (guild && user) {
		const guild_member = await Guilds.findOne({
			include:[{
				model:User,
				through:{
					where:{
						member:userId
					}
				}
			}]
		});
		console.log(JSON.stringify(guild_member,null,4));
		// console.log(guild_member.users[0].guildmember.balance)
		guild_member.users[0].guildmember.balance += Number(amount);
		guild_member.users[0].save();
	} else if(user){
		const newGuild = await Guilds.create({guild_id:guildId});
		await newGuild.addUser(user, {through:{balance:Number(amount)}});
	} else if(guild){
		const newUser = await User.create({user_id:userId});
		await newGuild.addUser(newUser, {through:{balance: Number(amount)}});
	} else {
		const newGuild = await Guilds.create({guild_id:guildId});
		const newUser = await User.create({user_id:userId});
		await newGuild.addUser(newUser), {through:{balance: Number(amount)}};
	}

	sequelize.sync();
	return;
}

function getBalance(id) {
	const user = stars.get(id);
	return user ? user.balance : 0;
}

module.exports = {addBalance, getBalance};
