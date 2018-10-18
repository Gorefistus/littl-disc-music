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
            const nextYTVideo = await youtube.searchVideos('', 1, { relatedToVideoId: prevVideoObj.id });
            const nextYtVideoObj = await youtube.getVideoByID(nextYTVideo[0].id);
            const videoIndex = await queueHandler.addSongToQueue(guildId, nextYtVideoObj, queueHandler.getVoiceChannel(guildId));
            songPlayer.playYoutubeVideo({
                guildId,
                index: videoIndex,
            }, youtube);
        }
    },

};

module.exports = songPlayer;
