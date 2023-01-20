const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('choose')
		.setDescription('I choose one out of your list')
        .addStringOption(option =>
            option.setName('input')
                .setDescription("List of things to choose.")),
	async execute(interaction) {
        const msg = interaction.toString().substring(14);
        const list = msg.split(" ");
        const rand = Math.floor(Math.random() * list.length);
        await interaction.reply(`Hmmmmmm I choose ${list[rand]}`);
	},
};