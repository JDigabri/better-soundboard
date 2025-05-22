<template>
  <div class="options-menu">
    <div class="options-list">
      <button v-for="option in options" :key="option" @click="selectOption(option)">
        {{ option }}
      </button>
    </div>
    <div class="menu-display" v-if="selectedOption">
      <component :is="currentModule" />
    </div>
  </div>
</template>

<script>
import DashboardModule from './modules/DashboardModule.vue';
import AnalyticsModule from './modules/AnalyticsModule.vue';
import UploadModule from './modules/UploadModule.vue';
import FeedbackModule from './modules/FeedbackModule.vue';

export default {
  name: "OptionsMenu",
  components: {
    DashboardModule,
    AnalyticsModule,
    UploadModule,
    FeedbackModule,
  },
  data() {
    return {
      options: ["Dashboard", "Analytics", "Upload", "Send Feedback"],
      selectedOption: "Dashboard",
    };
  },
  computed: {
    currentModule() {
      switch (this.selectedOption) {
        case "Dashboard":
          return "DashboardModule";
        case "Analytics":
          return "AnalyticsModule";
        case "Upload":
          return "UploadModule";
        case "Send Feedback":
          return "FeedbackModule";
        default:
          return null;
      }
    },
  },
  methods: {
    selectOption(option) {
      this.selectedOption = option;
    },
  },
};
</script>

<style scoped>
.options-menu {
  display: flex;
  flex-direction: row;
  height: 500px;
  width: 900px;
  margin-left: 170px;
}
.options-list {
  display: flex;
  flex-direction: column;
  margin-right: 20px;
}
.options-list button {
  margin-bottom: 10px;
  padding: 10px;
  background-color: red;
  color: white;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease;
}
.options-list button:hover {
  background-color: #5C43F5;
}
.menu-display {
  background-color: #242424;
  color: white;
  border-radius: 5px;
  width: 100%;
}
</style> 