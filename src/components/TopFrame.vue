<template>
  <div id="window-controls" class="draggable">
    <button style="font-size: 25px; font-weight: 400" @click="minimize">
      -
    </button>
    <button @click="maximize"><div class="square" /></button>
    <button class="x" style="margin-right: 5px" @click="close">X</button>
  </div>
</template>

<script setup>
import TopNavBar from "./TopNavBar.vue";
</script>

<script>
export default {
  methods: {
    minimize() {
      window.electronAPI.minimize();
    },
    maximize() {
      window.electronAPI.maximize();
    },
    close() {
      window.electronAPI.close();
    },
  },
};
</script>

<style scoped>
.draggable {
  -webkit-app-region: drag;
  user-select: none;
  -webkit-user-select: none;
}

#window-controls {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  height: 30px;
  width: 100vw;
  background-color: #15181e;
  position: fixed;
  top: 0;
  z-index: 1000;
}

button {
  -webkit-app-region: no-drag;
  height: 100%;
  background-color: #15181e00;
  border: none;
  color: rgba(255, 255, 255, 0.308);
  font-family: "Inter", sans-serif;
  font-size: 16px;
  font-weight: 300;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30px;
  overflow-y: hidden;
}
button:hover {
  background-color: rgba(255, 255, 255, 0.062);
}

.x:hover {
  background-color: rgba(255, 0, 0, 0.329) !important;
}
.square {
  height: 10px;
  width: 10px;
  border: solid;
  border-width: 1px;
}
</style>
