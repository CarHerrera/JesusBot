const db = require('./index.js');
const { User, Guilds,GuildMembers } = require('./dbObjects.js');
const { Sequelize } = require('sequelize');
const sequelize = new Sequelize('sqlite::memory:');

async function addBalance(guildId, userId, amount) {
	const user = await User.findByPk(userId);
	const guild = await Guilds.findByPk(guildId);
	const createUser = {balance:Number(amount), server_id:guildId, member_id:userId};
	if (guild && user) {
		const guild_member = await GuildMembers.findOne({
			where:{
				server_id:guildId,
				member_id: userId
			}
		});
		guild_member.balance += Number(amount);
		return guild_member.save();
	} else if(user){
		await Guilds.create({guild_id:guildId});
		await GuildMembers.create(createUser);
	} else if(guild){
		await User.create({user_id:userId});
		await GuildMembers.create(createUser);

		// await newGuild.addUser(newUser, {through:{balance: Number(amount)}});
	} else {
		await Guilds.create({guild_id:guildId});
		await User.create({user_id:userId});
		await GuildMembers.create(createUser); 
	}

	sequelize.sync();
	return;
}


module.exports = {addBalance};
