const { SlashCommandBuilder } = require('discord.js');
const { GuildMembers } = require('../dbObjects.js');
// const { manager } = require('../starHelper.js');
async function getBalance(user_id, guild_id) {
	try{
		const guild_member = await GuildMembers.findOne({
			where:{
				server_id:guild_id,
				member_id: user_id
			}
		});
		return guild_member.balance;
	} catch {
		return 0;
	}
}
module.exports = {
	data: new SlashCommandBuilder()
		.setName('stars')
		.setDescription('Check the number of stars you have')
        .addBooleanOption(option => 
            option.setName('ephemeral')
                .setDescription('private or public display')),
	async execute(interaction) {
		// interaction.user is the object representing the User who ran the command
		// interaction.member is the GuildMember object, which represents the user in the specific guild
		const vis = interaction.options.getBoolean('ephemeral');
        const membId = interaction.user.id;
        const guildId = interaction.guildId;
        const msg = `${interaction.user} has ${await getBalance(membId,guildId)}`
        if(vis){
            await interaction.reply({content:msg, ephemeral:true});
        } else {
            await interaction.reply(msg);
        }
	},
};