<template>
  <div class="board-wrap">
    <div class="board-card">
      <div class="card-bg" :style="{ backgroundImage: `url(${artUrl})` }"></div>

      <div class="card-content">
        <!-- LEFT: cover art matches list height -->
        <img class="art" :src="artUrl" alt="Album art" />

        <!-- RIGHT: frosted list -->
        <div class="list">
          <div class="list-header">Hades Sound Board</div>

          <div class="rows">
            <div class="row" v-for="(s, i) in songs" :key="i">
              <div class="title">
                <!-- number + play occupy same width; swap on hover -->
                <span class="num">{{ i + 1 }}.</span>
                <span class="play" aria-hidden="true">
                  <svg viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                </span>
                <span class="name">{{ s.title }}</span>
              </div>
              <div class="artist">{{ s.artist }}</div>
              <div class="dur">{{ s.duration }}</div>
            </div>
          </div>
        </div>
      </div><!-- /card-content -->
    </div><!-- /board-card -->
  </div>
</template>

<script>
export default {
  name: 'HadesBoardCard',
  data() {
    return {
      artUrl:
        'https://assetsio.gnwcdn.com/hades-artwork.jpg?width=1200&height=1200&fit=bounds&quality=70&format=jpg&auto=webp',
      songs: [
        { title: 'Johnny is Bad at Rust', artist: 'Ephis', duration: '2:02' },
        { title: 'Ephis is Bad at Rust',  artist: 'Jibar', duration: '0:01' },
        { title: 'DA is Bad at Rust',     artist: 'DPA',   duration: '1:03' },
        { title: 'Emre is Bad at Rust',   artist: 'Ephis', duration: '2:52' },
        { title: 'Owais is fat',          artist: 'Ephis', duration: '4:09' },
      ],
    };
  },
};
</script>

<style scoped>
/* wrapper: fills whatever width the page gives it */
.board-wrap {
  width: 100%;
  margin: 0 auto 25px;
  margin-top: 25px;
}

/* card: no max-width; everything scales off font-size + clamp()s */
.board-card {
  position: relative;
  width: 100%;
  border-radius: 1rem;
  overflow: hidden;
  background: rgba(17, 20, 26, 0.6);
  box-shadow: 0 8px 30px rgba(0,0,0,0.35);
  border: 1px solid rgba(255,255,255,0.06);

  /* global scaler for this component */
  font-size: clamp(14px, 1vw + 0.25rem, 20px);
}

/* blurred backplate */
.card-bg {
  position: absolute;
  inset: 0;
  background-size: cover;
  background-position: center;
  filter: blur(22px) brightness(0.9) saturate(1.1);
  transform: scale(1.12);
  z-index: 0;
}

/* 2-column grid; uses clamp so the art column grows/shrinks smoothly */
.card-content {
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: clamp(14em, 26vw, 22em) 1fr; /* left art | right list */
  gap: 1em;
  padding: 0.9em;
  align-items: stretch; /* makes art and list equal height */
}

/* cover art exactly the height of the list */
.art {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 0.9em;
  box-shadow: 0 0.25em 1em rgba(0,0,0,0.35);
  display: block;
}

/* frosted list */
.list {
  display: flex;
  flex-direction: column;
  border-radius: 0.9em;
  color: #e9edf6;
  overflow: hidden; /* tidy corners */
  backdrop-filter: blur(10px) saturate(1.2);
  background: linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.04));
  font-family: Inter, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif;
}

/* header */
.list-header {
  padding: 0.7em 1em;
  font-size: 1.1em;
  font-weight: 600;
  border-bottom: 1px solid rgba(255,255,255,0.08);
}

/* rows define the card's height; art follows via align-items:stretch */
.rows { display: grid; }

.row {
  display: grid;
  grid-template-columns: 1fr clamp(8em, 14vw, 10em) clamp(3.5em, 6vw, 4.5em); /* title | artist | time */
  align-items: center;
  gap: 1em;
  padding: 0.65em 1em;
  border-bottom: 1px solid rgba(255,255,255,0.06);
}
.row:last-child { border-bottom: none; }
.row:hover { background: rgba(255,255,255,0.06); }

/* title cell with hover swap: number -> play icon */
.title {
  display: inline-flex;
  align-items: center;
  gap: 0.6em;
  min-width: 0; /* enable ellipsis */
}

/* reserve exact width so no layout jump when swapping */
.num, .play {
  width: 1.5em;          /* keeps column width stable */
  flex: 0 0 1.5em;
  display: inline-flex;
  justify-content: center;
  color: #c9d1e6;
  opacity: 0.85;
}
.play { display: none; }
.row:hover .num { display: none; }
.row:hover .play { display: inline-flex; }

.play svg {
  width: 0.9em;
  height: 0.9em;
  fill: currentColor;
}

.name {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* artist + duration */
.artist {
  color: #c9d1e6;
  opacity: 0.85;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.dur {
  color: #dbe3f3;
  text-align: right;
  white-space: nowrap;
}

/* responsive: stack on very narrow screens but still scale */
@media (max-width: 820px) {
  .card-content { grid-template-columns: 1fr; }
  .art { height: auto; aspect-ratio: 1/1; max-width: 28em; margin-inline: auto; }
}
</style>
