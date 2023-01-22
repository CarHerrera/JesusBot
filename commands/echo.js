const { SlashCommandBuilder } = require('discord.js');
const { watchFile } = require('fs');
const wait = require('node:timers/promises').setTimeout;

module.exports = {
	data: new SlashCommandBuilder()
		.setName('echo')
		.setDescription('Get me to say whatever you want. only usable by Jesus.')
        .addStringOption(option =>
            option.setName('echo')
                .setDescription('The shit you want me to say.')
                .setRequired(true)
                .setMaxLength(1000))
        .addBooleanOption(option =>
            option.setName('ephemeral')
                .setDescription('If you want said shit to be public.')
                .setRequired(true)),
	async execute(interaction) {
        if(interaction.member.id != '213090776001937409') {
            interaction.reply('Hey you\'re not the CEO of Jesus. You\'re not allowed to use this command.')
        }
        const phrase = interaction.options.getString('echo');
        const vis = interaction.options.getBoolean('ephemeral');
        if(vis === true){
            await interaction.reply({content: `bet imma say that shit rn`, ephemeral:true});
            await interaction.channel.send(phrase);
        } else {
            await interaction.reply('ur the boss boss');
            await wait(1500);
            await interaction.channel.send(phrase);
        }

	},
};