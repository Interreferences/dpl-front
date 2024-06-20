<script setup>
import {computed, onMounted, ref, watch} from "vue";
import {usePlayerStore} from "@/stores/playerStore";

const playerStore = usePlayerStore();
const volume = ref(80); // Initial volume
const duration = ref(0); // Track duration

const coverUrl = computed(() => {
  if (playerStore.currentTrack) {
    return `http://localhost:7000/${playerStore.currentTrack.release.cover}`;
  }
  return '';
});

const togglePlayPause = () => {
  playerStore.togglePlayPause();
};

const muteAudio = () => {
  playerStore.audioElement.muted = !playerStore.audioElement.muted;
};

const updateVolume = (event) => {
  const newVolume = event.target.value;
  volume.value = newVolume;
  playerStore.audioElement.volume = newVolume / 100;
};

const seek = (event) => {
  const seekTime = event.target.value;
  playerStore.currentTime = seekTime;
  playerStore.audioElement.currentTime = seekTime;
};

onMounted(() => {
  playerStore.audioElement.volume = volume.value / 100;
  duration.value = playerStore.audioElement.duration;

  playerStore.audioElement.addEventListener('loadedmetadata', () => {
    duration.value = playerStore.audioElement.duration;
  });
});

watch(
    () => playerStore.currentTrack,
    (newTrack) => {
      if (newTrack) {
        duration.value = 0;
        playerStore.audioElement.play();
      }
    }
);

</script>

<template>
  <div class="w-full bg-neutral-800 flex flex-row justify-between p-4" v-if="playerStore.currentTrack">
    <div class="flex items-center flex-row">
      <img :src="coverUrl" alt="Cover" class="w-8 h-8 md:w-12 md:h-12 xl:w-16 xl:h-16 2xl:w-24 2xl:h-24 3xl:w-48 3xl:h-48" v-if="playerStore.currentTrack"/>
      <div class="flex flex-col text-xs text-white invisible md:visible md:ml-2 xl:text-base 2xl:text-2xl 3xl:text-4xl" v-if="playerStore.currentTrack">
        <span>{{ playerStore.currentTrack.title }}</span>
        <span>{{ playerStore.currentTrack.artists.map(artist => artist.name).join(', ') }}</span>
      </div>
    </div>
    <div class="flex flex-col items-center text-white xl:pt-2 xl:text-base 2xl:pt-6">
      <div class="flex flex-row xl:text-base 2xl:text-2xl 3xl:text-4xl">
        <button @click="togglePlayPause">
          <i :class="playerStore.isPlaying ? 'fa-solid fa-pause' : 'fa-solid fa-play'"></i>
        </button>
      </div>
      <div class="flex flex-row">
        <div class="text-xs xl:text-base 2xl:text-xl 2xl:mr-4 3xl:text-4xl">
          {{ Math.floor(playerStore.currentTime / 60) }}:{{ Math.floor(playerStore.currentTime % 60).toString().padStart(2, '0') }}
        </div>
        <input
            type="range"
            name="duration"
            id="duration"
            :max="duration"
            :value="playerStore.currentTime"
            @input="seek"
            v-if="playerStore.currentTrack"
            class="xl:w-64 2xl:text-2xl"
        >
        <div class="text-xs xl:text-base 2xl:text-xl 2xl:ml-4 3xl:text-4xl">
          {{ Math.floor(duration / 60) }}:{{ Math.floor(duration % 60).toString().padStart(2, '0') }}
        </div>
      </div>
    </div>
    <div class="flex flex-row text-white xl:text-base 2xl:text-xl 3xl:text-4xl">
      <button @click="muteAudio"><i class="fa-solid fa-volume-high"></i></button>
      <input type="range" name="volume" id="volume" class="ml-2 w-8 md:w-16 xl:w-36" v-model="volume" @input="updateVolume">
    </div>
  </div>
</template>