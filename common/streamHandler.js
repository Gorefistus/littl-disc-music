const ytdl = require('ytdl-core');
const queueHandler = require('./queueHandler');

const songPlayer = {
    playYoutubeVideo: ({ id, index } = {}) => {
        let videoObj;
        if (index) {
            videoObj = queueHandler.getSongByIndex(id, index);
        } else {
            videoObj = queueHandler.getNextSong(id);
        }
        if (videoObj) {
            const dispatcher = queueHandler.getConnection(id)
                .playStream(ytdl(videoObj.url));

            queueHandler.setIsPlaying(id, true);
            dispatcher.setVolume(0.06);
            dispatcher.on('end', (reason) => {
                console.log(`playYoutubeVideo dispatcher.on end ${videoObj.title}`);
                queueHandler.setIsPlaying(id, false);
                songPlayer.playYoutubeVideo({ id: id });
            })
                .on('error', error => console.error(error));
        }
    },

};

module.exports = songPlayer;
