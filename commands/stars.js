// import {addBalance, getBalance} from '../starHelper.js';

const { SlashCommandBuilder, Collection } = require('discord.js');
const { User, CurrencyShop} = require('../dbObjects.js');
const manager = require('../starHelper.js')
const db = require('../index.js');
const stars = db.stars;

function getBalance(id) {
	const user = stars.get(id);
	return user ? user.balance : 0;
}
module.exports = {
	data: new SlashCommandBuilder()
		.setName('stars')
		.setDescription('Check the number of stars that you have.')
        .addBooleanOption(option =>
            option.setName('ephemeral')
                .setDescription('Whether you want command to be public or not')),
	async execute(interaction) {
        const vis = interaction.options.getBoolean('ephemeral');
		const target = interaction.user.id;
		const user = stars.get(target);
		const msg = `${interaction.user} has ${manager.getBalance(target)}`;
		if(vis){
			interaction.reply({content: msg, ephemeral:true});
		} else {
			interaction.reply(msg);
		}
	},
}