<script setup>
import MainDisplay from "../components/MainDisplay.vue";
import TopNavBar from "../components/TopNavBar.vue";
import BoardCarousel from "../components/BoardCarousel.vue";
import ManySound from "../components/ManySound.vue";
</script>

<template>

  <div class="home">
    <TopNavBar />
    <MainDisplay />
    <BoardCarousel />
    <ManySound />
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
.home {
  width: 100%;
  height: 100%;

}
.button {
  background-color: #5c43f5;
  width: 150px;
  height: 50px;
  border-radius: 10px;
  margin-top: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 15px;
  font-family: "Inter", sans-serif;
  font-weight: 100;
  color: white;
  margin-left: 220px;
  cursor: pointer;
  margin-bottom: 15px;
}
</style>
