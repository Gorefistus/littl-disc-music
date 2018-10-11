const queueCommand = {
    name: 'queue',
    execute: async (message, args, queueSystem, youtube) => {
        const voiceChannel = message.member.voiceChannel;
        if (!voiceChannel) return message.channel.send('I\'m sorry but you need to be in a voice channel to play music!');
        const permissions = voiceChannel.permissionsFor(message.client.user);
        if (!permissions.has('CONNECT')) {
            return message.channel.send('I cannot connect to your voice channel, make sure I have the proper permissions!');
        }
        if (!permissions.has('SPEAK')) {
            return message.channel.send('I cannot speak in this voice channel, make sure I have the proper permissions!');
        }

        if (args.length === 0) {
            return message.reply(queueSystem.getQueueString(message.guild.id));
        }
        const video = await youtube.getVideo(args[0]);
        await queueSystem.addSongToQueue(message.guild.id, video, voiceChannel);
        message.reply(`Song added to queue ${video.title}`);
    },
};

module.exports = queueCommand;
