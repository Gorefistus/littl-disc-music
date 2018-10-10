const Discord = require('discord.js');
const fs = require('fs');
const ytdl = require('ytdl-core');
const YouTube = require('simple-youtube-api');
const settings = require('./settings.json');
const youtube = new YouTube(settings.youtubeToken);
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
const queueSystem = require('./common/queueHandler');

const client = new Discord.Client();
client.commands = new Discord.Collection();

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);

    // set a new item in the Collection
    // with the key as the command name and the value as the exported module
    client.commands.set(command.name, command);
}



client.on('message', message => {

    const {prefix} = settings;

    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();


    if (!client.commands.has(command)) return;

    try {
        client.commands.get(command).execute(message, args, queueSystem, youtube);
    }
    catch (error) {
        console.error(error);
        message.reply('there was an error trying to execute that command!');
    }

        // if (msg.content.toLowerCase().startsWith('!playlist')) {
        //     msg.react('👌');
        //     const playlistLink = msg.content.split(' ')[1];
        //     youtube.getPlaylist(playlistLink).then(playlist => {
        //         if (msg.member.voiceChannel) {
        //             msg.member.voiceChannel.join()
        //                 .then(connection => { // Connection is an instance of VoiceConnection
        //                     playlist.getVideos(5).then(playlistArray => {
        //                         playYoutubeVideo(playlistArray[0].url, connection)
        //                     })
        //
        //                 })
        //                 .catch(console.log);
        //         } else {
        //             msg.reply('You need to join a voice channel first!');
        //         }
        //     }).catch(console.error);
        //
        //
        // } else if (msg.content.toLowerCase().startsWith('!play')) {
        //     msg.react('👌');
        //     const youtubeLink = msg.content.split(' ')[1];
        //
        //     if (msg.member.voiceChannel) {
        //         msg.member.voiceChannel.join()
        //             .then(connection => { // Connection is an instance of VoiceConnection
        //                 playYoutubeVideo(youtubeLink, connection)
        //             })
        //             .catch(console.log);
        //     } else {
        //         msg.reply('You need to join a voice channel first!');
        //     }
        // } else if (msg.content.toLowerCase().startsWith('!stop')) {
        //     if (songPlayer) {
        //         msg.react('👌');
        //         songPlayer.end('test');
        //     } else {
        //         msg.reply('No song');
        //     }
        // } else if (msg.content.toLowerCase().startsWith('!pause')) {
        //     if (songPlayer) {
        //         msg.react('⏸');
        //         songPlayer.pause();
        //     } else {
        //         msg.reply('No song');
        //     }
        // } else if (msg.content.toLowerCase().startsWith('!resume')) {
        //     if (songPlayer) {
        //         msg.react('▶');
        //         songPlayer.resume();
        //     } else {
        //         msg.reply('No song');
        //     }
        // } else if (msg.content.toLowerCase().startsWith('!volume')) {
        //     if (songPlayer) {
        //         msg.react('👌');
        //         const volume = msg.content.split(' ')[1];
        //         if (volume) {
        //             const volumeParsed = Number.parseFloat(volume) / 100;
        //             songPlayer.setVolume(volumeParsed);
        //         }
        //     } else {
        //         msg.reply('No song is playing');
        //     }
        //
        //
        // }
        // else if (msg.content.toLowerCase().startsWith('!queue')) {
        //     if (songPlayer) {
        //         msg.react('👌');
        //         const youtubeLink = msg.content.split(' ')[1];
        //         // addToQueue(populateQueueElement(youtubeLink));
        //         populateQueueElement(youtubeLink).then((queueElement)=>{
        //            addToQueue(queueElement);
        //             let queueMessage='';
        //             queue.forEach(function (item,i,) {
        //                 queueMessage+='index = ';
        //                 queueMessage+=i;
        //                 queueMessage+='\n';
        //                 queueMessage+='item = ';
        //                 queueMessage+=item.title;
        //                 queueMessage+='\n';
        //             });
        //             msg.reply('current queue is: \n' + queueMessage);
        //         });
        //
        //
        //
        //     } else {
        //         msg.reply('No song is playing');
        //     }
        //
        //
        // }
    }
);

function getQueue() {
}

function addToQueue(queueElement) {
            queue.push(queueElement);
}

function populateQueueElement(youtubeLink) {
    return new Promise((resolve, reject) => {
        let queueElement = {};
        youtube.getVideo(youtubeLink).then(results => {
            queueElement.title = results.title;
            console.log('results.title :' + results.title, ' queueElement.title :' + queueElement.title);
            queueElement.url = results.url;
            resolve(queueElement);
        });
    });

}

function playYoutubeVideo(youtubeLink, connection) {
    if (youtubeLink) {
        console.log(youtubeLink);
        const stream = ytdl(youtubeLink, {filter: 'audioonly'});
        songPlayer = connection.playStream(stream);
        songPlayer.setVolume(0.06);
        songPlayer = connection.dispatcher;
        songPlayer.on('end', () => {
            console.log('song ended')
            // connection.disconnect();
        })
    } else {
        msg.reply('ty pidor 4e pishesh');
    }
}

client.login(settings.discordToken);
