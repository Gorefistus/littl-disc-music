const Discord = require('discord.js');
const ytdl = require('ytdl-core');
const client = new Discord.Client();
const broadcast = client.createVoiceBroadcast();
let songPlayer;


client.on('message', msg => {
        if (msg.content.startsWith('!play')) {
            msg.react('👌');
            const youtubeLink = msg.content.split(' ')[1];

            if (msg.member.voiceChannel) {
                msg.member.voiceChannel.join()
                    .then(connection => { // Connection is an instance of VoiceConnection
                        if (youtubeLink) {
                            const stream = ytdl(youtubeLink, {filter: 'audioonly'});
                            broadcast.playStream(stream);
                            songPlayer = connection.playBroadcast(broadcast);
                            songPlayer.setVolume(0.06);
                        } else {
                            msg.reply('ty pidor 4e pishesh');
                        }
                    })
                    .catch(console.log);
            } else {
                msg.reply('You need to join a voice channel first!');
            }
        } else if (msg.content.startsWith('!stop')) {
            if (songPlayer) {
                msg.react('👌');
                songPlayer.end();
            } else {
                msg.reply('No song');
            }
        } else if (msg.content.startsWith('!pause')) {
            if (songPlayer) {
                msg.react('⏸');
                songPlayer.pause();
            } else {
                msg.reply('No song');
            }
        } else if (msg.content.startsWith('!resume')) {
            if (songPlayer) {
                msg.react('▶');
                songPlayer.resume();
            } else {
                msg.reply('No song');
            }
        }else if (msg.content.startsWith('!volume')) {
            if(songPlayer){
                msg.react('👌');
                const volume = msg.content.split(' ')[1];
                if(volume){
                    const volumeParsed = Number.parseFloat(volume)/100;
                    songPlayer.setVolume(volumeParsed);
                }
            }else {
                msg.reply('No song is playing');
            }


        }
    }
);


client.login('MTkxODA5OTQyMzE4MDg4MTky.Dp0yFA.m8vpMoraUGGnKLxPRZM7JYJhUtQ');
