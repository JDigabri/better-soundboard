<template>
  <div class="title-container">
    <p class="title" style="font-size: 24px;">Top Picks For You</p>
  </div>
  <div class="carousel-container">
    <!-- Left arrow -->
    <button class="arrow arrow-left" @click="scrollLeft">&#10094;</button>

    <!-- Scrollable carousel -->
    <div class="carousel" ref="carousel">
      <div v-for="(item, index) in items" :key="index" class="carousel-item">
        <img :src="item.img" alt="cover" class="cover-art" />
        <p class="title" style="font-weight: 200;">{{ item.title }}</p>
        <p class="artist">{{ item.artist }}</p>
      </div>
    </div>

    <!-- Right arrow -->
    <button class="arrow arrow-right" @click="scrollRight">&#10095;</button>
  </div>
</template>

<script>
export default {
  name: "SpotifyStyleCarousel",
  data() {
    return {
      items: [
        // Example data – replace these with your actual images and text
        {
          img: "https://picsum.photos/id/1015/100/100",
          title: "Daily Mix 01",
          artist: "Artist 01",
        },
        {
          img: "https://picsum.photos/id/1016/100/100",
          title: "Daily Mix 02",
          artist: "Artist 02",
        },
        {
          img: "https://picsum.photos/id/1018/100/100",
          title: "Daily Mix 03",
          artist: "Artist 03",
        },
        {
          img: "https://picsum.photos/id/1025/100/100",
          title: "Daily Mix 04",
          artist: "Artist 04",
        },
        {
          img: "https://picsum.photos/id/1027/100/100",
          title: "Daily Mix 05",
          artist: "Artist 05",
        },
        {
          img: "https://picsum.photos/id/1032/100/100",
          title: "Daily Mix 06",
          artist: "Artist 06",
        },
        {
          img: "https://picsum.photos/id/1037/100/100",
          title: "Daily Mix 07",
          artist: "Artist 07",
        },
        {
          img: "https://picsum.photos/id/1039/100/100",
          title: "Daily Mix 08",
          artist: "Artist 08",
        },
        {
          img: "https://picsum.photos/id/1040/100/100",
          title: "Daily Mix 09",
          artist: "Artist 09",
        },
        {
          img: "https://picsum.photos/id/1042/100/100",
          title: "Daily Mix 10",
          artist: "Artist 10",
        },
        // add more items as needed
      ],
    };
  },
  methods: {
    scrollLeft() {
      // Scroll 300px to the left
      this.$refs.carousel.scrollBy({ left: -300, behavior: "smooth" });
    },
    scrollRight() {
      // Scroll 300px to the right
      this.$refs.carousel.scrollBy({ left: 300, behavior: "smooth" });
    },
  },
};
</script>

<style scoped>
/* Container for carousel and arrows */
.carousel-container {
  position: relative;
  margin-left: 165px;
  width: 900px !important;
  height: 250px;
  font-family: "Inter", sans-serif;
  font-weight: 100;
  font-size: 22px;
  color: white;
  /* No background color so it stays transparent */
  transition: width 0.2s ease-in-out;
  overflow: hidden;
  z-index: 5;
}
.title-container {
    width: 900px !important;
    margin-left: 165px;
    margin-bottom: 10px;
    z-index: 5;
    transition: width 0.2s ease-in-out;
}
/* The horizontally scrollable area */
.carousel {
  display: flex;
  align-items: center;
  height: 100%;
  scroll-behavior: smooth;
  overflow: hidden;
}

/* Each carousel item */
.carousel-item {
  flex: 0 0 auto;
  width: 200px;
  margin-right: 20px;
  text-align: center;
}

/* Item images styling */
.cover-art {
  width: 200px;
  height: 200px;
  display: block;
  margin: 0 auto 0px;
  border-radius: 25px;
}

/* Arrow buttons styling:
     Hidden by default, they will appear on hover */
.arrow {
  opacity: 0;
  transition: opacity 0.3s ease;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 2;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #15181e;
  color: white;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.title {
  font-size: 16px;
  font-weight: 600;
  margin-top: 0px;
  text-align: start;
  margin-bottom: 0px;
  font-family: "Inter", sans-serif;
  font-weight: 300;
  color: white;
}

.artist {
  font-size: 14px;
  font-weight: 400;
  text-align: start;
  margin-top: 0px;
  margin-bottom: 0px;
  font-family: "Inter", sans-serif;
  font-weight: 100;
  color: rgba(255, 255, 255, 0.5);
}

/* Position adjustments for left/right arrows */
.arrow-left {
  left: 10px;
}

.arrow-right {
  right: 10px;
}

/* Fade overlay for carousel edges:
     Hidden by default and shown on hover */
.carousel-container::before,
.carousel-container::after {
  content: "";
  position: absolute;
  top: 0;
  bottom: 0;
  width: 50px;
  pointer-events: none;
  z-index: 1;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.carousel-container::before {
  left: 0;
  background: linear-gradient(to right, #15181e 0%, rgba(21, 24, 30, 0) 100%);
}

.carousel-container::after {
  right: 0;
  background: linear-gradient(to left, #15181e 0%, rgba(21, 24, 30, 0) 100%);
}

/* Show overlay and arrows on hover */
.carousel-container:hover::before,
.carousel-container:hover::after,
.carousel-container:hover .arrow {
  opacity: 1;
}

/* MEDIA QUERIES */
@media (min-width: 1500px) {
  .carousel-container {
    width: 1100px !important;
    margin-left: 220px;
  }
  .title-container {
    width: 1100px !important;
    margin-left: 220px;

}
}

@media (min-width: 1700px) {
  .carousel-container {
    width: 1375px !important;
    margin-left: 207.5px;
  }
  .title-container {
    width: 1375px !important;
    margin-left: 207.5px;

}
}
</style>
