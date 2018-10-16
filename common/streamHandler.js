const ytdl = require('ytdl-core');
const queueHandler = require('./queueHandler');

const songPlayer = {
    playYoutubeVideo: ({ id, index } = {}, youtube) => {
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
                console.log(`getCurrentSongIndex = ${queueHandler.getCurrentSongIndex(id)}`);

                if ((queueHandler.getCurrentSongIndex(id) === -1) && (queueHandler.getAutoplay(id))) {
                    console.log('in if');
                    console.log(`youtube = ${youtube}`);
                    youtube.searchVideos('', 1, { relatedToVideoId: videoObj.id })
                        .then((searchResults) => {
                            console.log(`searchresults = ${searchResults}`);
                            youtube.getVideo(searchResults[0].id)
                                .then((nextvideo) => {
                                    queueHandler.addSongToQueue(nextvideo);
                                });

                        }
                        );
                    // queueHandler.addSongToQueue(id);
                }
            })
                .on('error', error => console.error(error));
        }
    },

};

module.exports = songPlayer;
