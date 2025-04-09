<template>
  <div class="about">
    <div class="search">
      <svg
        width="25"
        height="25"
        viewBox="0 0 25 25"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style="margin-left: 15px; fill: rgba(255, 255, 255, 0.1)"
      >
        <g clip-path="url(#clip0_199_400)">
          <path
            d="M24.8474 24.1109L17.2407 16.5042C18.8207 14.7499 19.7917 12.437 19.7917 9.8958C19.7917 4.43931 15.3524 0 9.89585 0C4.43931 0 0 4.43931 0 9.89585C0 15.3524 4.43931 19.7917 9.89585 19.7917C12.437 19.7917 14.7499 18.8207 16.5042 17.2407L24.1109 24.8474C24.2126 24.9491 24.3459 25 24.4792 25C24.6125 25 24.7457 24.9491 24.8475 24.8474C25.0509 24.6439 25.0509 24.3144 24.8474 24.1109ZM9.89585 18.75C5.01406 18.75 1.0417 14.7781 1.0417 9.89585C1.0417 5.01357 5.01406 1.04165 9.89585 1.04165C14.7776 1.04165 18.75 5.01353 18.75 9.89585C18.75 14.7782 14.7776 18.75 9.89585 18.75Z"
          />
        </g>
        <defs>
          <clipPath id="clip0_199_400">
            <rect width="25" height="25" fill="white" />
          </clipPath>
        </defs>
      </svg>
      <div class="input-container">
        <input
          class="searchInput"
          style="background: none; border: none; margin-left: 15px"
          type="text"
          v-model="searchQuery"
          placeholder=""
        />
        <transition name="slide-up" mode="out-in">
          <span v-if="!searchQuery" class="placeholder-text" :key="placeholderIndex">{{ dynamicPlaceholder }}</span>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchQuery: "",
      placeholders: ["Search for Sounds...", "Search for Soundboards...", "Search for Users..."],
      placeholderIndex: 0,
      dynamicPlaceholder: "Search for Sounds..."
    };
  },
  mounted() {
    this.startPlaceholderCycle();
  },
  methods: {
    startPlaceholderCycle() {
      setInterval(() => {
        this.placeholderIndex = (this.placeholderIndex + 1) % this.placeholders.length;
        this.dynamicPlaceholder = this.placeholders[this.placeholderIndex];
      }, 3000);
    }
  }
}
</script>

<style scoped>
* {
  overflow-y: hidden;
}
.about {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  text-align: start;
  font-family: "Inter", sans-serif;
  font-weight: 100;
  font-size: 22px;
  color: white;
  position: relative;
  z-index: 11;
  margin-left: 165px;
  margin-top: 20px;
  width: 900px !important;
  transition: width 0.2s ease-in-out; /* Transition the width property */
  cursor: not-allowed;
}

.searchTextArea {
  width: 350px;
  height: 90px;

  margin-left: 15px;
}
.searchTextArea > p {
  font-family: "Inter", sans-serif;
  font-weight: 200;
  margin: 0px;
}
.searchInput {
  width: -webkit-fill-available;
  height: 48px;
}
a {
  text-decoration: none;
  color: white;
}
svg {
  margin: 0px;
}
input {
  color: rgba(255, 255, 255, 0.1);
}
input:focus {
  outline: none;
  box-shadow: none;
  color: white;
}

.search {
  width: -webkit-fill-available;
  height: 48px;
  background: rgba(78, 89, 109, 0.1);
  border-radius: 5px;
  display: flex;
  align-items: center;
  color: rgba(255, 255, 255, 0.1);
}

@media (min-width: 1500px) {
  .about {
    width: 1100px !important;
    margin-left: 220px;
  }
}

@media (min-width: 1700px) {
  .about {
    width: 1375px !important;
    margin-left: 207.5px;
  }
}

.input-container {
  position: relative;
  width: -webkit-fill-available;
}

.placeholder-text {
  position: absolute;
  left: 15px;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
  color: rgba(255, 255, 255, 0.1);
  font-size: 18px;
}

.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.2s ease;
}

.slide-up-enter {
  transform: translateY(20px);
  opacity: 0;
}

.slide-up-leave-to {
  transform: translateY(-20px);
  opacity: 0;
}
</style>
