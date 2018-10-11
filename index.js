const Discord = require('discord.js');
const fs = require('fs');
const ytdl = require('ytdl-core');
const YouTube = require('simple-youtube-api');
const settings = require('./settings.json');

const youtube = new YouTube(settings.youtubeToken);
const commandFiles = fs.readdirSync('./commands')
    .filter(file => file.endsWith('.js'));
const queueSystem = require('./common/queueHandler');

const client = new Discord.Client();
client.commands = new Discord.Collection();

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);

    // set a new item in the Collection
    // with the key as the command name and the value as the exported module
    client.commands.set(command.name, command);
}

client.on('message', (message) => {
    const { prefix } = settings;

    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length)
        .split(/ +/);
    const command = args.shift()
        .toLowerCase();

    if (!client.commands.has(command)) return;

    try {
        client.commands.get(command)
            .execute(message, args, queueSystem, youtube);
    } catch (error) {
        console.error(error);
        message.reply('there was an error trying to execute that command!');
    }

});


client.login(settings.discordToken);
