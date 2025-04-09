<template>
    <div class="recently-played-container">
      <h2 style="font-size: 24px;font-weight: 300;text-align: left;">Most Recently Played</h2>
      <div class="recently-played-list">
        <div
          v-for="(track, index) in tracks"
          :key="index"
          class="track-item"
        >
          <div class="track-cover">
            <img :src="track.cover" alt="cover art" />
          </div>
          <div class="track-details">
            <div class="track-title">{{ track.title }}</div>
            <div class="track-artist">{{ track.artist }}</div>
          </div>
          <!-- Action container: shows duration by default and the play button on hover -->
          <div class="track-action">
            <span class="track-duration">{{ track.duration }}</span>
            <span class="track-play">&#9658;</span>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "RecentlyPlayedGrid",
    data() {
      return {
        tracks: [
          {
            title: "Johnny Is Bad At Rust",
            duration: "2:02",
            artist: "Ephis",
            cover: "https://pbs.twimg.com/profile_images/843289621102575618/adYB0YVe_400x400.jpg"
          },
          {
            title: "Owais is Fat",
            duration: "2:02",
            artist: "Ephis",
            cover: "https://pbs.twimg.com/profile_images/843289621102575618/adYB0YVe_400x400.jpg"
          },
          {
            title: "Erme Is Bad At Rust",
            duration: "2:02",
            artist: "Ephis",
            cover: "https://pbs.twimg.com/profile_images/843289621102575618/adYB0YVe_400x400.jpg"
          },
          {
            title: "DA is Bad At Rust",
            duration: "2:02",
            artist: "Ephis",
            cover: "https://pbs.twimg.com/profile_images/843289621102575618/adYB0YVe_400x400.jpg"
          },
          {
            title: "Johnny Is Bad At Rust",
            duration: "2:02",
            artist: "Ephis",
            cover: "https://pbs.twimg.com/profile_images/843289621102575618/adYB0YVe_400x400.jpg"
          },
          {
            title: "Owais is Fat",
            duration: "2:02",
            artist: "Ephis",
            cover: "https://pbs.twimg.com/profile_images/843289621102575618/adYB0YVe_400x400.jpg"
          },
          {
            title: "Erme Is Bad At Rust",
            duration: "2:02",
            artist: "Ephis",
            cover: "https://pbs.twimg.com/profile_images/843289621102575618/adYB0YVe_400x400.jpg"
          },
          {
            title: "DA is Bad At Rust",
            duration: "2:02",
            artist: "Ephis",
            cover: "https://pbs.twimg.com/profile_images/843289621102575618/adYB0YVe_400x400.jpg"
          }
        ]
      };
    }
  };
  </script>
  
  <style scoped>
  /* Container with sizing requirements */
  .recently-played-container {
    margin-left: 165px;
    width: 900px !important;
    color: white;
    font-family: "Inter", sans-serif;
    font-weight: 100;
    transition: width 0.2s ease-in-out;
  }
  
  /* Responsive widths */
  @media (min-width: 1500px) {
    .recently-played-container {
      width: 1100px !important;
      margin-left: 220px;
    }
  }
  @media (min-width: 1700px) {
    .recently-played-container {
      width: 1375px !important;
      margin-left: 207.5px;
    }
  }
  
  /* Header styling */
  .recently-played-container h2 {
    margin-bottom: 20px;
    font-size: 24px;
  }
  
  /* Grid container for tracks */
  .recently-played-list {
    display: grid;
    grid-gap: 16px;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  }
  
  /* Each track item has no default background */
  .track-item {
    display: grid;
    grid-template-columns: 60px auto 50px; /* cover, details, action */
    align-items: center;
    gap: 10px;
    padding: 10px;
    border-radius: 6px;
    transition: background-color 0.3s ease;
  }
  
  /* Background appears only on hover */
  .track-item:hover {
    background-color: #4e596d10;
  }
  
  /* Cover image styling */
  .track-cover img {
    width: 60px;
    height: 60px;
    object-fit: cover;
    border-radius: 4px;
  }
  
  /* Track details styling */
  .track-details {
    display: flex;
    flex-direction: column;
    text-align: left;
  }
  
  .track-title {
    font-weight: 300;
    margin-bottom: 4px;
    font-size: 14px;
  }
  
  .track-artist {
    font-size: 12px;
    color: #ffffff80;
    font-weight: 200;
  }
  
  /* Action container for the duration and play button */
  .track-action {
    position: relative;
    width: 50px;
    text-align: right;
  }
  
  /* Duration text is visible by default */
  .track-duration {
    transition: opacity 0.3s ease;
  }
  
  /* Play button is hidden by default */
  .track-play {
    position: absolute;
    top: 50%;
    right: 0;
    transform: translateY(-50%);
    opacity: 0;
    transition: opacity 0.3s ease;
    font-size: 16px; /* Adjust icon size as needed */
  }
  
  /* On hover: hide duration text and show play button */
  .track-item:hover .track-duration {
    opacity: 0;
  }
  
  .track-item:hover .track-play {
    opacity: 1;
  }
  </style>
  