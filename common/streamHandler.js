const queueHandler = require('./queueHandler');
const ytdl = require('ytdl-core');

const songPlayer = {

    playYoutubeVideoByIndex: (index) => {
        const videoObj = queueHandler.getSongByIndex(index);
        const dispatcher = queueHandler.getConnection().playStream(ytdl(videoObj.url));
        queueHandler.setIsPlaying(true);
        dispatcher.setVolume(0.06);
        dispatcher.on('end', (reason) => {
            console.log(`playYoutubeVideoByIndex dispatcher.on end ${videoObj.title}`);
            queueHandler.setIsPlaying(false);
            songPlayer.playYoutubeVideo();
        }).on('error', error => console.error(error));
    },

    playYoutubeVideo: ({ index }) => {
        let videoObj;
        if (index) {
            videoObj = queueHandler.getSongByIndex(index);
        } else {
            videoObj = queueHandler.getNextSong();
        }
        if (videoObj) {
            const dispatcher = queueHandler.getConnection().playStream(ytdl(videoObj.url));
        }

        queueHandler.setIsPlaying(true);
        dispatcher.setVolume(0.06);
        dispatcher.on('end', (reason) => {
            console.log(`playYoutubeVideo dispatcher.on end ${videoObj.title}`);
            queueHandler.setIsPlaying(false);
            songPlayer.playYoutubeVideo();
        }).on('error', error => console.error(error));
    },

};

module.exports = songPlayer;
