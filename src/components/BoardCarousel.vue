<template>
  <div class="title-container">
    <p class="tp-title">Top Picks For You</p>
  </div>

  <div class="carousel-container">
    <!-- Left arrow -->
    <button class="arrow arrow-left" @click="scrollLeft" :disabled="leftDisabled">&#10094;</button>

    <!-- Scrollable carousel -->
    <div class="carousel" ref="carousel" @scroll="updateArrows">
      <div v-for="(item, index) in items" :key="index" class="carousel-item">
        <img :src="item.img" alt="cover" class="cover-art" />

        <!-- title: blue dot + continuous loop on hover (only if overflow) -->
        <div class="ci-name" @mouseenter="startLoop($event)" @mouseleave="stopLoop($event)">
          <div class="ci-scroll">
            <div class="ci-track">
              <span class="ci-text">{{ item.title }}</span>
              <span class="ci-gap" aria-hidden="true">&nbsp;&nbsp;•&nbsp;&nbsp;</span>
              <span class="ci-text clone" aria-hidden="true">{{ item.title }}</span>
              <span class="ci-gap" aria-hidden="true">&nbsp;&nbsp;•&nbsp;&nbsp;</span>
            </div>
          </div>
        </div>

        <p class="artist">{{ item.artist }}</p>
      </div>
    </div>

    <!-- Right arrow -->
    <button class="arrow arrow-right" @click="scrollRight" :disabled="rightDisabled">&#10095;</button>
  </div>
</template>

<script>
export default {
  name: "SpotifyStyleCarousel",
  data() {
    return {
      items: [
        { img: "https://picsum.photos/id/1015/400/400", title: "Daily Mix 01", artist: "Artist 01" },
        { img: "https://picsum.photos/id/1016/400/400", title: "Daily Mix 02", artist: "Artist 02" },
        { img: "https://picsum.photos/id/1018/400/400", title: "Daily Mix 03", artist: "Artist 03" },
        { img: "https://picsum.photos/id/1025/400/400", title: "Daily Mix 04", artist: "Artist 04" },
        { img: "https://picsum.photos/id/1027/400/400", title: "Daily Mix 05", artist: "Artist 05" },
        { img: "https://picsum.photos/id/1032/400/400", title: "Daily Mix 06", artist: "Artist 06" },
        { img: "https://picsum.photos/id/1037/400/400", title: "Daily Mix 07", artist: "Artist 07" },
        { img: "https://picsum.photos/id/1039/400/400", title: "Daily Mix 08", artist: "Artist 08" },
        { img: "https://picsum.photos/id/1040/400/400", title: "Daily Mix 09", artist: "Artist 09" },
        { img: "https://picsum.photos/id/1042/400/400", title: "Daily Mix 10", artist: "Artist 10" },
      ],
      leftDisabled: true,
      rightDisabled: false,
    };
  },
  mounted() {
    // initial arrow state
    this.$nextTick(this.updateArrows);
  },
  methods: {
    scrollLeft() {
      const rail = this.$refs.carousel;
      const page = Math.max(1, Math.floor(rail.clientWidth * 0.9)); // page by ~viewport width
      rail.scrollBy({ left: -page, behavior: "smooth" });
    },
    scrollRight() {
      const rail = this.$refs.carousel;
      const page = Math.max(1, Math.floor(rail.clientWidth * 0.9));
      rail.scrollBy({ left: page, behavior: "smooth" });
    },
    updateArrows() {
      const rail = this.$refs.carousel;
      const max = rail.scrollWidth - rail.clientWidth - 1; // tolerance
      this.leftDisabled = rail.scrollLeft <= 1;
      this.rightDisabled = rail.scrollLeft >= max;
    },

    // Title loop behavior: only run when it actually overflows
    startLoop(e) {
      const scroll = e.currentTarget.querySelector('.ci-scroll');
      const track  = scroll?.querySelector('.ci-track');
      const text   = track?.querySelector('.ci-text'); // first copy
      const gap    = track?.querySelector('.ci-gap');
      if (!scroll || !track || !text) return;

      const visibleW  = scroll.clientWidth;
      const textW     = text.scrollWidth;
      const tolerance = 4;
      if (textW <= visibleW + tolerance) {
        scroll.classList.remove('is-looping');
        scroll.style.removeProperty('--loop-dist');
        scroll.style.removeProperty('--loop-dur');
        return;
      }

      const gapW     = gap ? gap.scrollWidth : 24;
      const distance = textW + gapW;
      const speed    = 120; // px/s
      const dur      = Math.min(10, Math.max(1.2, distance / speed));

      scroll.style.setProperty('--loop-dist', `-${distance}px`);
      scroll.style.setProperty('--loop-dur',  `${dur}s`);
      scroll.classList.add('is-looping');
    },
    stopLoop(e) {
      const scroll = e.currentTarget.querySelector('.ci-scroll');
      if (!scroll) return;
      scroll.classList.remove('is-looping');
      scroll.style.removeProperty('--loop-dist');
      scroll.style.removeProperty('--loop-dur');
    }
  },
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap');

/* sizing tokens */
.carousel-container {
  --gap: 35px;
  --card: clamp(180px, 18vw, 240px);  /* card width bounds */
  --bg: #0f141b;
  --bg-hover: #131a24;
  --stroke: #1e2531;
  --stroke-hover: #2a3445;
  --ink: #ffffff;
  --muted: #c9d1e6cc;
  --accent: #4a80ff;

  position: relative;
  width: 100%;
  color: var(--ink);
  font-family: "Inter", system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif;
  overflow: hidden;
  z-index: 5;
}

.title-container { width: 100%; margin: 0 0 10px 0; }
.tp-title { margin: 0; font-size: 24px; font-weight: 300; text-align: left; font-family: 'Inter', sans-serif; color: #ffffff; }

/* horizontally scrollable rail */
.carousel {
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: var(--card);
  gap: var(--gap);
  align-items: start;
  width: 100%;
  overflow-x: auto;
  overflow-y: hidden;
  scroll-snap-type: x mandatory;
  scroll-behavior: smooth;
  padding: 2px var(--gap);
  -webkit-overflow-scrolling: touch;
}
.carousel::-webkit-scrollbar { display: none; } /* hide bar */

/* card: same style as your row cards */
.carousel-item {
  scroll-snap-align: start;
  width: var(--card);
  border-radius: 12px;
  background: var(--bg);
  border: 1px solid var(--stroke);
  padding: 12px;
  transition: background .15s ease, border-color .15s ease, box-shadow .15s ease, transform .08s ease;
  cursor: pointer;
}
.carousel-item:hover {
  background: var(--bg-hover);
  border-color: var(--stroke-hover);
  box-shadow: 0 8px 22px rgba(0,0,0,.28);
  transform: translateY(-1px);
}

/* cover: square */
.cover-art {
  width: 100%;
  aspect-ratio: 1 / 1;
  display: block;
  border-radius: 10px;
  object-fit: cover;
  box-shadow: 0 2px 10px rgba(0,0,0,.35);
  margin-bottom: 10px;
}

/* title row (blue dot + marquee window) */
.ci-name {
  display: flex; align-items: center; gap: 10px;
  font-size: 15px; font-weight: 600; color: var(--ink);
  margin: 0 0 4px 0;
  line-height: 1.25; max-height: 1.25em; /* no y-scrollbars */
}
.ci-dot {
  width: 6px; height: 6px; border-radius: 999px; flex: 0 0 6px;
  background: var(--accent);
  box-shadow: 0 0 0 3px rgba(74,128,255,.16);
}
/* visible window (no scrollbar) */
.ci-scroll {
  position: relative; flex: 1 1 auto; min-width: 0; overflow: hidden;
}
/* track: two copies + gap for seamless loop */
.ci-track {
  display: inline-flex; align-items: center; white-space: nowrap;
  will-change: transform; transform: translateX(0);
}
.ci-track .clone, .ci-track .ci-gap { display: none; } /* hidden unless looping */
.ci-scroll.is-looping .ci-track .clone,
.ci-scroll.is-looping .ci-track .ci-gap { display: inline-block; }
.ci-scroll:not(.is-looping) .ci-track { transform: none !important; }

/* loop animation (continuous wrap) */
.ci-scroll.is-looping .ci-track {
  animation: ci-loop var(--loop-dur, 6s) linear infinite;
  -webkit-mask-image: linear-gradient(to right, transparent 0, #000 10px, #000 calc(100% - 10px), transparent 100%);
          mask-image: linear-gradient(to right, transparent 0, #000 10px, #000 calc(100% - 10px), transparent 100%);
}

/* artist */
.artist {
  font-size: 13px;
  font-weight: 200;
  margin: 0;
  color: var(--muted);
  white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
}

/* arrows in your theme */
.arrow {
  opacity: 0;
  transition: opacity 0.25s ease, background .15s ease, transform .08s ease;
  position: absolute;
  top: 50%; transform: translateY(-50%);
  z-index: 2;
  width: 40px; height: 40px; border-radius: 50%;
  background-color: #15181e;
  color: white; border: 1px solid #1e2531;
  display: grid; place-items: center; cursor: pointer;
}
.arrow:hover { background: #1b2332; }
.arrow:disabled { opacity: .35; cursor: not-allowed; }
.arrow-left { left: 8px; }
.arrow-right { right: 8px; }
.carousel-container:hover .arrow { opacity: 1; }

/* edge fades (match bg) */
.carousel-container::before,
.carousel-container::after {
  content: ""; position: absolute; top: 0; bottom: 0; width: 50px;
  pointer-events: none; z-index: 1; opacity: 0; transition: opacity 0.25s ease;
}
.carousel-container::before {
  left: 0; background: linear-gradient(to right, #15181e 0%, rgba(21,24,30,0) 100%);
}
.carousel-container::after {
  right: 0; background: linear-gradient(to left, #15181e 0%, rgba(21,24,30,0) 100%);
}
.carousel-container:hover::before,
.carousel-container:hover::after { opacity: 1; }

/* loop by distance set in JS */
@keyframes ci-loop {
  to { transform: translateX(var(--loop-dist, -120px)); }
}
</style>
