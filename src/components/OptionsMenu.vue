<template>
  <div class="options-menu">
    <div class="options-list">
      <div class="profile-banner">
        <img class="profile-image" src="" alt="Profile" />
        <p class="profile-name">Owais Hobbi</p>
      </div>
      <button
        v-for="option in options"
        :key="option"
        @click="selectOption(option)"
        :class="{ selected: selectedOption === option }"
      >
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
        case "Dashboard": return "DashboardModule";
        case "Analytics": return "AnalyticsModule";
        case "Upload": return "UploadModule";
        case "Send Feedback": return "FeedbackModule";
        default: return null;
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
  background-color: rgba(78, 89, 109, 0.10); /* 10% */
  width: 250px;
  border-radius: 8px;
}

.profile-banner {
  display: flex;
  align-items: center;
  background-color: rgba(78, 89, 109, 0.20); /* 20% */
  padding: 10px;
  border-radius: 8px;
  margin-bottom: 15px;
}

.profile-image {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  margin-right: 10px;
}

.profile-name {
  color: white;
  font-weight: 500;
}

.options-list button {
  margin-bottom: 10px;
  padding: 10px;
  background-color: transparent;
  color: white;
  border: none;
  text-align: left;
  cursor: pointer;
  transition: background-color 0.3s ease;
  border-radius: 6px;
}

.options-list button:hover {
  background-color: rgba(92, 67, 245, 0.2);
}

.options-list button.selected {
  background-color: #15181E;
  border-radius: 0px;
}

.menu-display {
  background-color: #242424;
  color: white;
  border-radius: 5px;
  width: 100%;
  padding: 20px;
}
</style>
