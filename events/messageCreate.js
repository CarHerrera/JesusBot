const { Events } = require('discord.js');
// const { User, CurrencyShop} = require('../dbObjects.js');
const {addBalance} = require('../starHelper.js');
module.exports = {
	name: Events.MessageCreate,
	async execute(message) {
        if(message.author.bot === true){
            return;                
        }
        console.log(`Message at ${message.channelId} in ${message.guildId}`);
		const floor = .15;
        const chance = Math.random();
        const words = ['YOOOOOOOOOOOOOOOOOOO', 'nice', 'sick','poggers', 'owa owa', 
        '+1 good meme', 'nice lmao', 'pog pog pog pog', 'W','mood', 'epic', 'epic sauce', 'this is the best thing since the invention of cheese', 
        'thats so based','🥴','🤯','💀','☠️','👀',];
        if(message.inGuild()){
            await addBalance(message.guildId, message.author.id, 1);
        }
        if(floor >= chance){
            channel = message.channel;
            const wordChoice = words[Math.floor(Math.random() * words.length)];
            channel.send(wordChoice);
        }
	},
};
