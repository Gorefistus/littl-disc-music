const Discord = require('discord.js');
const queueHandler = require('./queueHandler');

class EmbedWrapper {

    getNowPlayingEmbed(song) {
        const embed = new Discord.RichEmbed();
        embed.addField('Now playing', `[${song.title}](${song.url})`);
        return embed;
    }

    getQueueEmbed(guildId) {
        const embed = new Discord.RichEmbed();
        const serverQueue = queueHandler.getQueue(guildId);
        if (serverQueue.songs === 0) {
            embed.setColor('ff0000');
            embed.addField('', 'Queue is empty!');
            return embed;
        }
        let queueString = '';
        serverQueue.songs.forEach((song, index) => {
            queueString += `\n ${index + 1}) [${song.title}](${song.url})`;
        });
        embed.addField('Queue', queueString);
        return embed;
    }
}

module.exports = new EmbedWrapper();
