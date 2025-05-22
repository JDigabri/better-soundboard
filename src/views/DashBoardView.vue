<script setup>
import SoundBoard from '../components/SoundBoard.vue'
import OptionsMenu from '../components/OptionsMenu.vue'
</script>

<template>
    <div class="dashboard-view">
        <OptionsMenu />
        <SoundBoard />
    </div>
</template>



<style scoped>
div {
  animation: fadeIn 0.5s;
}
@keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
.dashboard-view {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  overflow-x: hidden;
  overflow-y: hidden;
  margin-top: 30px;
}

*{
    overflow-x: hidden;
}
</style>