const { Events } = require('discord.js');
module.exports = {
    name: Events.VoiceStateUpdate,
    async execute(oldState, newState){
        print(oldstate.id)
        print(newState.id)
    },
};