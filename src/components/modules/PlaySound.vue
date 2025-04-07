<script setup>
const props = defineProps({
  soundName: {
    type: String,
    required: true,
  },
});

async function playSoundToBoth() {
  // Construct the file path relative to the public folder
  const filePath = `/sounds/${props.soundName}`;

  const audioVirtual = new Audio(filePath);
  const audioDefault = new Audio(filePath);

  const devices = await navigator.mediaDevices.enumerateDevices();
  const vbOut = devices.find(
    (d) => d.kind === 'audiooutput' && d.label.includes('VB-Audio Virtual Cable')
  );

  if (vbOut) {
    await audioVirtual.setSinkId(vbOut.deviceId);
  } else {
    console.warn("VB‑Audio Virtual Cable not found. Using default output.");
  }

  // Reset playback positions
  audioVirtual.currentTime = 0;
  audioDefault.currentTime = 0;

  // Attempt to play both audio elements
  await Promise.all([audioVirtual.play(), audioDefault.play()]);
}
</script>

<template>
  <button class="sound_button" @click="playSoundToBoth">
    ▶ Play {{ soundName }}
  </button>
</template>

<style scoped>
.sound_button {
  height: 125px;
  width: 135px;
  cursor: pointer;
}
</style>
