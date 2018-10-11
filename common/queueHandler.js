let queue;
let currentSongIndex;
let connection;
let isPlaying;

class QueueHandler {
    constructor() {
        queue = [];
        currentSongIndex = -1;
        isPlaying = false;
    }

    getCurrentSongIndex() {
        return currentSongIndex;
    }

    getQueueString() {
        if (queue.length === 0) {
            return 'Queue is empty!';
        }
        let stringToReturn = '';
        queue.forEach((song, index) => {
            stringToReturn += `\n${song.title}`;
        });
        return stringToReturn;
    }

    getCurrentSong() {
        if (currentSongIndex > -1) {
            return queue[currentSongIndex];
        }
        return undefined;
    }

    getSongByIndex(index) {
        if (index > -1) {
            currentSongIndex = index;
        }
        return queue[index];
    }

    async addSongToQueue(video, voiceChannel) {
        connection = await voiceChannel.join();
        queue.push(video);
        return queue.length - 1;
    }

    getNextSong() {
        if (currentSongIndex > -1) {
            if (currentSongIndex + 1 >= queue.length) {
                currentSongIndex = 0;
            } else {
                currentSongIndex++;
            }
            return queue[currentSongIndex];
        }
        if (queue.length > 0) {
            currentSongIndex = 0;
            return queue[0];
        }
        currentSongIndex = -1;
        return undefined;
    }

    getPreviousSong() {
        if (currentSongIndex > -1) {
            if (currentSongIndex - 1 < 0) {
                currentSongIndex = queue.length - 1;
            } else {
                currentSongIndex--;
            }
            return queue[currentSongIndex];
        }
        if (queue.length > 0) {
            currentSongIndex = 0;
            return queue[0];
        }
        currentSongIndex = -1;
        return undefined;
    }

    getConnection() {
        return connection;
    }

    getIsPlaying() {
        return isPlaying;
    }

    setIsPlaying(val) {
        isPlaying = val;
    }
}

module.exports = new QueueHandler();
