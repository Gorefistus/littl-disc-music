const songPlayer = require('../common/streamHandler');

const leaveCommand = {
    name: 'leave',
    execute:
        async (message) => {
            const voiceChannel = message.member.voiceChannel;
            if (!voiceChannel) return message.channel.send('I\'m sorry but you need to be in a voice channel to play music!');
            return voiceChannel.leave();
        },
};
module.exports = leaveCommand;
