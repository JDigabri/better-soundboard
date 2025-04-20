<template>
  <!-- Outer container with sizing constraints -->
  <div class="profile-container">
    <!-- Profile header with a blurred background (like the .Purchase div) -->
    <div
      class="blurred-bg-behind"
      :style="{ backgroundImage: `url(${backgroundUrl})` }"
    ></div>
    <div class="profile-header">
      <!-- Blurred background layer -->

      <div
        class="blurred-bg"
        :style="{ backgroundImage: `url(${backgroundUrl})` }"
      ></div>

      <!-- Foreground content (profile picture, name, stats) -->
      <div class="foreground-content">
        <div class="profile-picture-wrapper">
          <img :src="profilePicture" alt="Profile Picture" />
        </div>
        <div class="profile-info">
          <p class="profile-label">Profile</p>
          <h1 class="profile-name">{{ userName }}</h1>
          <p class="profile-stats">
            {{ soundBoardCount }} Sound Board, {{ soundsCount }} Sounds
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProfileHeader",
  props: {
    /* Background image for the header */
    backgroundUrl: {
      type: String,
      default:
        "https://pbs.twimg.com/profile_images/843289621102575618/adYB0YVe_400x400.jpg",
    },
    /* Profile picture URL */
    profilePicture: {
      type: String,
      default:
        "https://pbs.twimg.com/profile_images/843289621102575618/adYB0YVe_400x400.jpg",
    },
    /* User display name */
    userName: {
      type: String,
      default: "Owais Hobbi",
    },
    /* Number of sound boards */
    soundBoardCount: {
      type: Number,
      default: 33,
    },
    /* Number of sounds */
    soundsCount: {
      type: Number,
      default: 452,
    },
  },
};
</script>

<style scoped>
/* Outer container sizing based on your provided constraints */
.profile-container {
  width: 900px !important;
  margin-left: 165px;
  height: 275px; /* Adjust height as needed */
  margin-bottom: 25px;
  transition: width 0.2s ease-in-out;
}

/* Media query adjustments */
@media (min-width: 1500px) {
  .profile-container {
    width: 1100px !important;
    margin-left: 220px;
  }
  .blurred-bg-behind {
    position: absolute;
    height: 100px; /* Adjust height as needed */
    width: 950px !important;
    background-position: center;
    filter: blur(100.5px) brightness(100%);
    z-index: 1;
    align-self: center;
    margin-top: 250px;
  }
}

@media (min-width: 1700px) {
  .profile-container {
    width: 1375px !important;
    height: 375px; /* Adjust height as needed */

    margin-left: 207.5px;
  }
  .blurred-bg-behind {
    width: 1175px !important;
    margin-left: 100px !important;
  }
  .profile-picture-wrapper {
    width: 325px !important;
    height: 325px !important;
    border-radius: 10px;
    overflow: hidden;
    flex-shrink: 0;
  }
}

/* Profile header with blurred background (similar to .Purchase) */
.profile-header {
  position: relative;
  height: 100%; /* Adjust height as needed */
  border-radius: 25px 25px 0 0;
  overflow: hidden; /* Clips the blur to the rounded corners */
  z-index: 99;
}

/* Blurred background layer */
.blurred-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  filter: blur(25.5px) brightness(70%);
  clip-path: inset(0 0 0 0 round 0px);
  z-index: 0;
}
.blurred-bg-behind {
  position: absolute;
  height: 100px; /* Adjust height as needed */
  width: 750px;
  background-position: center;
  filter: blur(100.5px) brightness(100%);
  z-index: 1;
  align-self: center;
  margin-top: 250px;
  margin-left: 75px;
}

/* Foreground content layered above the background */
.foreground-content {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  height: 100%;
  padding-left: 20px;
  gap: 20px;
}

/* Profile picture */
.profile-picture-wrapper {
  width: 230px;
  height: 230px;
  border-radius: 10px;
  overflow: hidden;
  flex-shrink: 0;
}

.profile-picture-wrapper img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* Profile text styling */
.profile-info {
  display: flex;
  flex-direction: column;
  color: white;
  line-height: 1.3;
  text-align: left;
  font-family: "Inter", sans-serif;
}

.profile-label {
  margin: 0;
  font-size: 14px;
  font-weight: 300;
  opacity: 0.5;
}

.profile-name {
  margin: 5px 0;
  font-size: 32px;
  font-weight: 700;
}

.profile-stats {
  margin: 0;
  font-size: 15px;
  font-weight: 200;
  opacity: 0.5;
}
</style>
