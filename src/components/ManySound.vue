<template>
  <div class="recently-played" aria-label="Most Recently Played">
    <h2 class="rp-title">Most Recently Played</h2>

    <div class="rp-grid">
      <div v-for="(track, index) in tracks" :key="index" class="rp-item" tabindex="0">
        <div class="rp-cover">
          <img :src="track.cover" :alt="`Cover of ${track.title}`" />
        </div>

        <div class="rp-meta">
          <!-- Title: blue dot + continuous loop on hover (only if overflow) -->
          <div class="rp-name" @mouseenter="startLoop($event)" @mouseleave="stopLoop($event)">
            <div class="rp-scroll">
              <div class="rp-track">
                <span class="rp-text">{{ track.title }}</span>
                <span class="rp-gap" aria-hidden="true">&nbsp;&nbsp;•&nbsp;&nbsp;</span>
                <!-- second copy for seamless loop -->
                <span class="rp-text clone" aria-hidden="true">{{ track.title }}</span>
                <span class="rp-gap" aria-hidden="true">&nbsp;&nbsp;•&nbsp;&nbsp;</span>
              </div>
            </div>
          </div>

          <div class="rp-artist">{{ track.artist }}</div>
        </div>

        <div class="rp-action">
          <span class="rp-time">{{ track.duration }}</span>
          <span class="rp-play" aria-hidden="true">
            <svg viewBox="0 0 24 24" focusable="false" aria-hidden="true">
              <path d="M8 5v14l11-7z"/>
            </svg>
          </span>
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
        { title: "Johnny Is Bad At Rust", duration: "2:02", artist: "Ephis", cover: "https://pbs.twimg.com/profile_images/843289621102575618/adYB0YVe_400x400.jpg" },
        { title: "Owais is Fat",          duration: "2:02", artist: "Ephis", cover: "https://pbs.twimg.com/profile_images/843289621102575618/adYB0YVe_400x400.jpg" },
        { title: "Erme Is Bad At Rust",   duration: "2:02", artist: "Ephis", cover: "https://pbs.twimg.com/profile_images/843289621102575618/adYB0YVe_400x400.jpg" },
        { title: "DA is Bad At Rust",     duration: "2:02", artist: "Ephis", cover: "https://pbs.twimg.com/profile_images/843289621102575618/adYB0YVe_400x400.jpg" },
        { title: "Johnny Is Bad At Rust", duration: "2:02", artist: "Ephis", cover: "https://pbs.twimg.com/profile_images/843289621102575618/adYB0YVe_400x400.jpg" },
        { title: "Owais is Fat",          duration: "2:02", artist: "Ephis", cover: "https://pbs.twimg.com/profile_images/843289621102575618/adYB0YVe_400x400.jpg" },
        { title: "Erme Is Bad At Rust",   duration: "2:02", artist: "Ephis", cover: "https://pbs.twimg.com/profile_images/843289621102575618/adYB0YVe_400x400.jpg" },
        { title: "DA is Bad At Rust",     duration: "2:02", artist: "Ephis", cover: "https://pbs.twimg.com/profile_images/843289621102575618/adYB0YVe_400x400.jpg" }
      ]
    };
  },
  methods: {
    startLoop(e) {
      const scroll = e.currentTarget.querySelector('.rp-scroll');
      const track  = scroll?.querySelector('.rp-track');
      const text   = track?.querySelector('.rp-text');     // first copy
      const gap    = track?.querySelector('.rp-gap');      // gap after first copy
      if (!scroll || !track || !text) return;

      // visible width excludes the blue dot (good)
      const visibleW = scroll.clientWidth;
      const textW    = text.scrollWidth;
      if (textW <= visibleW + 2) return; // nothing to loop; leave as-is

      const gapW     = gap ? gap.scrollWidth : 24;
      const distance = textW + gapW;      // amount to move left before repeating

      // speed ~ 120px/s; clamp 1.2–10s so it feels smooth but not too fast/slow
      const speed    = 120;
      const dur      = Math.min(10, Math.max(1.2, distance / speed));

      // set CSS vars & enable loop
      scroll.style.setProperty('--loop-dist', `-${distance}px`);
      scroll.style.setProperty('--loop-dur',  `${dur}s`);
      scroll.classList.add('is-looping');
    },
    stopLoop(e) {
      const scroll = e.currentTarget.querySelector('.rp-scroll');
      if (!scroll) return;
      scroll.classList.remove('is-looping');
      scroll.style.removeProperty('--loop-dist');
      scroll.style.removeProperty('--loop-dur');
    }
  }
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap');

/* predictable sizing + hide stray scrollbars inside this component */
*, *::before, *::after { box-sizing: border-box; }
.recently-played, .recently-played * { scrollbar-width: none; }
.recently-played::-webkit-scrollbar,
.recently-played *::-webkit-scrollbar { width: 0; height: 0; }

/* —— tokens —— */
.recently-played {
  --gap: 18px;
  --cover: 60px;
  --row-h: 72px;
  --bg: #0f141b;
  --bg-hover: #131a24;
  --stroke: #1e2531;
  --stroke-hover: #2a3445;
  --ink: #ffffff;
  --muted: #c9d1e6cc;
  --accent: #4a80ff;

  color: var(--ink);
  font-family: "Inter", system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  overflow-x: clip;
}

/* title */
.rp-title {
  margin: 0 0 14px 0;
  font-size: 24px;
  font-weight: 300;
  text-align: left;
}

/* 3 per row (desktop) */
.rp-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: var(--gap);
}

/* row card */
.rp-item {
  display: grid;
  grid-template-columns: var(--cover) 1fr 64px; /* cover | meta | action */
  align-items: center;
  gap: 12px;
  min-height: var(--row-h);
  padding: 12px;
  border-radius: 10px;
  background: var(--bg);
  border: 1px solid var(--stroke);
  position: relative;
  cursor: pointer;
  transition: background .15s ease, border-color .15s ease, box-shadow .15s ease, transform .08s ease;
  overflow: hidden;
}
.rp-item:hover {
  background: var(--bg-hover);
  border-color: var(--stroke-hover);
  box-shadow: 0 8px 22px rgba(0,0,0,.28);
}

/* cover */
.rp-cover img {
  width: var(--cover);
  height: var(--cover);
  object-fit: cover;
  border-radius: 10px;
  display: block;
  box-shadow: 0 2px 10px rgba(0,0,0,.35);
}

/* meta */
.rp-meta { display: flex; flex-direction: column; min-width: 0; text-align: left; }

/* title line: blue dot + scroll window */
.rp-name {
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 0 0 4px 0;
  line-height: 1.25;
  max-height: 1.25em;        /* no y-axis bars */
  color: var(--ink);
  font-weight: 600;
  font-size: 15px;
}

.rp-dot {
  width: 6px; height: 6px; border-radius: 999px; flex: 0 0 6px;
  background: var(--accent);
  box-shadow: 0 0 0 3px rgba(74,128,255,.16);
}

/* visible window for title (no scrollbar) */
.rp-scroll {
  position: relative;
  display: block;
  flex: 1 1 auto;
  min-width: 0;
  overflow: hidden;
}

/* track: two copies + gaps for seamless loop */
.rp-track {
  display: inline-flex;
  align-items: center;
  white-space: nowrap;
  will-change: transform;
  transform: translateX(0);
}
.rp-text { display: inline-block; }
.rp-gap  { display: inline-block; }

/* enable continuous loop */
.rp-scroll.is-looping .rp-track {
  animation: rp-loop var(--loop-dur, 6s) linear infinite;
  /* soft edge fade during motion */
  -webkit-mask-image: linear-gradient(to right, transparent 0, #000 10px, #000 calc(100% - 10px), transparent 100%);
          mask-image: linear-gradient(to right, transparent 0, #000 10px, #000 calc(100% - 10px), transparent 100%);
}

/* artist */
.rp-artist {
  font-size: 12px;
  font-weight: 200;
  color: var(--muted);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 1.25;
  max-height: 1.25em;
}

/* action (duration ↔ play) */
.rp-action {
  position: relative;
  width: 64px;     /* stable cell */
  text-align: right;
  color: var(--muted);
  overflow: visible;
}
.rp-time { transition: opacity .15s ease; }

.rp-play {
  position: absolute;
  top: 50%; right: 0; transform: translateY(-50%);
  display: flex; align-items: center; justify-content: center;
  width: 32px; height: 32px; border-radius: 999px;
  background: var(--accent); color: #0b1020;
  box-shadow: 0 6px 16px rgba(74,128,255,.35);
  opacity: 0; transition: opacity .15s ease, transform .15s ease;
}
.rp-play svg { width: 14px; height: 14px; display: block; fill: currentColor; }

.rp-item:hover .rp-time { opacity: 0; }
.rp-item:hover .rp-play { opacity: 1; transform: translateY(-50%) scale(1.02); }

/* loop from 0 to -(text + gap) -> seamless restart */
@keyframes rp-loop {
  to { transform: translateX(var(--loop-dist, -120px)); }
}

/* reduced motion */
@media (prefers-reduced-motion: reduce) {
  .rp-item, .rp-time, .rp-play, .rp-track { transition: none; animation: none !important; }
}
</style>
