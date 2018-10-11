const songPlayer = require('../common/streamHandler');

const volumeCommand = {
    name: 'volume',
    execute:
        async (message, args, queueSystem, youtube) => {
            const voiceChannel = message.member.voiceChannel;
            if (!voiceChannel) return message.channel.send('I\'m sorry but you need to be in a voice channel to play music!');
            const permissions = voiceChannel.permissionsFor(message.client.user);
            if (!permissions.has('CONNECT')) {
                return message.channel.send('I cannot connect to your voice channel, make sure I have the proper permissions!');
            }
            if (!permissions.has('SPEAK')) {
                return message.channel.send('I cannot speak in this voice channel, make sure I have the proper permissions!');
            }

            if (queueSystem.getIsPlaying()) {
                console.log(args);
                message.react('😂');
                const volumeParsed = Number.parseFloat(args) / 100;
                if (volumeParsed) {
                    queueSystem.getConnection().dispatcher.setVolume(volumeParsed);
                    console.log('changing volume to '+volumeParsed+' 😂');
                }
            }
        }
};
module.exports = volumeCommand;