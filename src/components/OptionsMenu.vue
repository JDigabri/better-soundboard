<template>
  <div class="options-menu">
    <div class="options-list">
      <div class="profile-banner">
        <img class="profile-image" src="../assets/OW.png" alt="Profile" />
        <p class="profile-name">Owais Hobbi</p>
      </div>
      <button
        v-for="option in options"
        :key="option"
        @click="selectOption(option)"
        :class="{ selected: selectedOption === option }"
      >
        <img :src="getIconPath(option)" :alt="option" class="option-icon" />
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
    getIconPath(option) {
      switch (option) {
        case "Dashboard": return "src/assets/dashboard.svg";
        case "Analytics": return "src/assets/analytics.svg";
        case "Upload": return "src/assets/cloud-computing.svg";
        case "Send Feedback": return "src/assets/feedback.svg";
        default: return "";
      }
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
  font-family: 'Inter', sans-serif;
}

.options-list {
  display: flex;
  flex-direction: column;
  margin-right: 20px;
  background-color: rgba(78, 89, 109, 0.10); /* 10% */
  width: 450px;
  border-radius: 8px;
  height: fit-content;

}

.profile-banner {
  display: flex;
  align-items: center;
  background-color: rgba(78, 89, 109, 0.20); /* 20% */
  border-radius: 8px;
  margin-bottom: 15px;
  padding-left: 15px;
}

.profile-image {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  margin-right: 10px;
  border: 1px solid #266DD3;
}

.profile-name {
  color: white;
  font-weight: 200;
  font-size: 20px;
}

.options-list button {
  padding: 20px;
  background-color: transparent;
  color: white;
  border: none;
  text-align: left;
  cursor: pointer;
  transition: background-color 0.3s ease;
  border-radius: 6px;
  font-size: 16px;
  font-weight: 100;
  display: flex;
  align-items: center;
}

.options-list button:hover {
  background-color: rgba(92, 67, 245, 0.2);
}

.options-list button.selected {
  background-color: #15181E;
  border-radius: 0px;
}

.option-icon {
  width: 20px;
  height: 20px;
  margin-right: 12px;
  filter: brightness(0) invert(1);
}

.menu-display {
  color: white;
  width: 100%;

}
</style>
