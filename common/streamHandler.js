const ytdl = require('ytdl-core');
const queueHandler = require('./queueHandler');

const songPlayer = {
    playYoutubeVideo: async ({ guildId, index } = {}, youtube) => {
        let videoObj;
        if (index) {
            videoObj = queueHandler.getSongByIndex(guildId, index);
        } else {
            videoObj = queueHandler.getNextSong(guildId);
        }
        if (videoObj) {
            queueHandler.getTextChannel(guildId).send(`Now playing - ${videoObj.title}`);
            const dispatcher = queueHandler.getConnection(guildId)
                .playStream(ytdl(videoObj.url));

            queueHandler.setIsPlaying(guildId, true);
            dispatcher.setVolume(0.06);
            dispatcher.on('end', (reason) => {
                queueHandler.setIsPlaying(guildId, false);
                songPlayer.playYoutubeVideo({ guildId }, youtube);
            })
                .on('error', error => console.error(error));
        } else if (queueHandler.getAutoplay(guildId)) {
            const prevVideoObj = queueHandler.getLastSong(guildId);
            const maxSearchResults = 2;
            const nextYTVideo = await youtube.searchVideos('', maxSearchResults, { relatedToVideoId: prevVideoObj.id });
            const randomId = Math.floor(Math.random() * (nextYTVideo.length));
            const nextYtVideoObj = await youtube.getVideoByID(nextYTVideo[randomId].id);
            const videoIndex = await queueHandler.addSongToQueue(guildId, nextYtVideoObj, queueHandler.getVoiceChannel(guildId));
            songPlayer.playYoutubeVideo({
                guildId,
                index: videoIndex,
            }, youtube);
        }
    },

};

module.exports = songPlayer;
