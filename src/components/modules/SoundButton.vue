<template>
    <div class="sound-button">
      <button @click="activate">🔊 Activate Soundboard</button>
      <button @click="playSound">▶ Play Sound</button>
      <button @click="restore">🔙 Restore Audio</button>
      <audio ref="audio" src="/sound.mp3" preload="auto" />
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  
  const audio = ref(null)
  
  async function activate() {
    if (!window.audioAPI) {
      console.error('audioAPI missing')
      return
    }
    try {
      await window.audioAPI.activate()
      console.log('✅ Soundboard activated')
    } catch (e) {
      console.error('Failed to activate soundboard:', e)
    }
  }
  
  function playSound() {
    if (!audio.value) return
    audio.value.currentTime = 0
    audio.value.play().catch(err => console.error('Play error:', err))
  }
  
  async function restore() {
    if (!window.audioAPI) {
      console.error('audioAPI missing')
      return
    }
    try {
      await window.audioAPI.restore()
      console.log('✅ Audio devices restored')
    } catch (e) {
      console.error('Failed to restore audio:', e)
    }
  }
  
  onMounted(() => {
    console.log('Bridge exists?', !!window.audioAPI)
  })
  </script>
  
  <style scoped>
  .sound-button {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    align-items: center;
    margin-top: 2rem;
  }
  button {
    padding: 0.75rem 1.5rem;
    font-size: 1rem;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  </style>
  