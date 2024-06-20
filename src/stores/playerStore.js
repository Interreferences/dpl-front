import { defineStore } from 'pinia';
import { ref } from 'vue';

export const usePlayerStore = defineStore('player', () => {
    const currentTrack = ref(null);
    const isPlaying = ref(false);
    const currentTime = ref(0);

    // Singleton audio element
    const audioElement = new Audio();

    const playTrack = (track) => {
        currentTrack.value = track;
        isPlaying.value = true;
        currentTime.value = 0;

        audioElement.src = `http://localhost:7000/${track.audio}`;
        audioElement.play();
    };

    const togglePlayPause = () => {
        if (isPlaying.value) {
            audioElement.pause();
        } else {
            audioElement.play();
        }
        isPlaying.value = !isPlaying.value;
    };

    const stopTrack = () => {
        currentTrack.value = null;
        isPlaying.value = false;
        currentTime.value = 0;

        audioElement.pause();
        audioElement.src = '';
    };

    audioElement.ontimeupdate = () => {
        currentTime.value = audioElement.currentTime;
    };

    audioElement.onended = () => {
        isPlaying.value = false;
    };

    return {
        currentTrack,
        isPlaying,
        currentTime,
        playTrack,
        togglePlayPause,
        stopTrack,
        audioElement, // Expose audioElement
    };
});
