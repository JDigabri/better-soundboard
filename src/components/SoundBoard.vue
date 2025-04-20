<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import SoundButton from "./modules/SoundButton.vue";
import PlaySound from "./modules/PlaySound.vue";

const soundFiles = ref([]);

// Function to refresh the sound files by calling the IPC API
async function refreshSoundFiles() {
  if (window.audioAPI && typeof window.audioAPI.getSoundFiles === 'function') {
    const files = await window.audioAPI.getSoundFiles();
    console.log('Refreshed sound files:', files);
    soundFiles.value = files;
  } else {
    console.error('audioAPI.getSoundFiles is not available.');
  }
}

// Debounce the refresh to avoid multiple rapid updates
let refreshTimeout;
function handleSoundFilesChanged(data) {
  console.log('Sound files changed:', data);
  clearTimeout(refreshTimeout);
  refreshTimeout = setTimeout(() => {
    refreshSoundFiles();
  }, 500); // adjust delay as needed
}

onMounted(async () => {
  // Initial load of sound files
  await refreshSoundFiles();

  // Listen for file change events using the correct API name (audioAPI)
  if (window.audioAPI && typeof window.audioAPI.onSoundFilesChanged === 'function') {
    window.audioAPI.onSoundFilesChanged(handleSoundFilesChanged);
  } else {
    console.error('audioAPI.onSoundFilesChanged is not available.');
  }
});

// Optional: Remove listener on unmount if needed
// (If your preload API supports removing listeners, you could do it here.)
</script>

<template>
    <div class="switch-section">
      <SoundButton />
    </div>
    <div class="board">
      <PlaySound
        v-for="sound in soundFiles"
        :key="sound"
        :soundName="sound"
      />
    </div>
</template>

<style scoped>

.switch-section {
  background-color: rgba(0, 0, 0, 0.15);
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: start;
  width: 600px;
  margin-top: 10px;
  padding: 5px;
  z-index: 5;
}
.board {
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: start;
  width: 600px;
  margin-top: 10px;
  padding: 5px;
  gap: 15px;
  flex-wrap: wrap;
  z-index: 5;
}
</style>
