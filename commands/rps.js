const { SlashCommandBuilder } = require('discord.js');
const wait = require('node:timers/promises').setTimeout;

module.exports = {
	data: new SlashCommandBuilder()
		.setName('rps')
		.setDescription('Play Rock Paper and Scissors against me.')
        .addStringOption(option =>
            option.setName('choices')
                .setDescription('Your typical rock paper and scissors options.')
                .setRequired(true)
                .addChoices(    
                    {name: 'Rock', value: 'rock'},
                    {name: 'Paper', value: 'paper'},
                    {name: 'Scissors', value: 'scissors'}
                )),
	async execute(interaction) {
        const choice = interaction.options.getString('choices');
        await interaction.reply("I Choose Rock!");
        await wait(0750);
        if (choice == 'rock'){
            interaction.followUp('Nice, we tied. 😎');
        } else if (choice == 'scissors'){
            interaction.followUp('Get fucked you idiot')
        } else {
            interaction.followUp('Fuck you, you sweat.')
        }
	},
};