<script setup>
import { ref } from 'vue'

const isActive = ref(false)
const busy = ref(false)


async function toggleSoundboard() {
  busy.value = true
  try {
    if (isActive.value) {
      await window.audioAPI.activate()
      console.log('✅ Activated')
    } else {
      await window.audioAPI.restore()
      console.log('✅ Restored')
    }
  } catch (err) {
    console.error('Toggle error:', err)
  } finally {
    busy.value = false
  }
}

</script>

<template>
  <label class="switch">
    <input 
      type="checkbox" 
      v-model="isActive" 
      @change="toggleSoundboard" 
      :disabled="busy" 
    />
    <span class="slider"></span>
  </label>
</template>


<style scoped>
.switch {
  position: relative;
  display: inline-block;
  width: 50px;
  height: 28px;
}
.switch input { display: none; }

.slider {
  position: absolute;
  cursor: pointer;
  top: 0; left: 0; right: 0; bottom: 0;
  background-color: #ccc;
  transition: .3s;
  border-radius: 6px;  /* slight rounding */
}

.slider::before {
  position: absolute;
  content: "";
  height: 24px;
  width: 24px;
  left: 2px;
  bottom: 2px;
  background-color: white;
  transition: .3s;
  border-radius: 4px;  /* squareish knob */
}

input:checked + .slider {
  background-color: #2196F3;  /* blue */
}

input:checked + .slider::before {
  transform: translateX(22px);
}
</style>
