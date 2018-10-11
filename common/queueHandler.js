let queue;

class QueueHandler {
    constructor() {
        queue = new Map();
    }

    getCurrentSongIndex(guildId) {
        const serverQueue = queue.get(guildId);
        return serverQueue.currentSongIndex;
    }

    getQueueString(guildId) {
        const serverQueue = queue.get(guildId);
        if (serverQueue.songs === 0) {
            return 'Queue is empty!';
        }
        let stringToReturn = '';
        serverQueue.songs.forEach((song, index) => {
            stringToReturn += `\n${song.title}`;
        });
        return stringToReturn;
    }

    getCurrentSong(guildId) {
        const serverQueue = queue.get(guildId);
        if (serverQueue.currentSongIndex > -1) {
            return serverQueue.songs[currentSongIndex];
        }
        return undefined;
    }

    getSongByIndex(guildId, index) {
        const serverQueue = queue.get(guildId);
        if (index > -1) {
            serverQueue.currentSongIndex = index;
        }
        return serverQueue.songs[index];
    }

    async addSongToQueue(guildId, video, voiceChannel) {
        const serverQueue = queue.get(guildId);
        if (!serverQueue) {
            const queueConstruct = {
                voiceChannel,
                connection: null,
                songs: [],
                volume: 5,
                playing: false,
                currentSongIndex: -1,
            };
            queue.set(guildId, queueConstruct);

            queueConstruct.songs.push(video);
            queueConstruct.connection = await voiceChannel.join();
            return queueConstruct.songs.length - 1;
        }
        serverQueue.songs.push(video);
        return serverQueue.songs.length - 1;
    }

    getNextSong(guildId) {
        const serverQueue = queue.get(guildId);
        if (serverQueue.currentSongIndex > -1) {
            if (serverQueue.currentSongIndex + 1 >= serverQueue.songs.length) {
                serverQueue.currentSongIndex = -1;
                return undefined;
            }
            serverQueue.currentSongIndex++;
            return serverQueue.songs[serverQueue.currentSongIndex];
        }
        if (serverQueue.songs.length > 0) {
            serverQueue.currentSongIndex = 0;
            return serverQueue.songs[0];
        }
        serverQueue.currentSongIndex = -1;
        return undefined;
    }

    getPreviousSong(guildId) {
        const serverQueue = queue.get(guildId);
        if (serverQueue.currentSongIndex > -1) {
            if (serverQueue.currentSongIndex - 1 < 0) {
                serverQueue.currentSongIndex = -1;
                return undefined;
            }
            serverQueue.currentSongIndex--;
            return serverQueue.songs[currentSongIndex];
        }
        if (serverQueue.songs.length > 0) {
            serverQueue.currentSongIndex = 0;
            return serverQueue.songs[0];
        }
        serverQueue.currentSongIndex = -1;
        return undefined;
    }

    getConnection(guildId) {
        return queue.get(guildId).connection;
    }

    getIsPlaying(guildId) {
        return queue.get(guildId).playing;
    }

    setIsPlaying(guildId, val) {
        console.log(val);
        queue.get(guildId).playing = val;
    }
}

module.exports = new QueueHandler();
