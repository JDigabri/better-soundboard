<template>
  <div class="profile-wrap">
    <div class="board-card">
      <div class="card-bg" :style="{ backgroundImage: `url(${backgroundUrl})` }"></div>

      <div class="card-content">
        <!-- LEFT: avatar scales with the card’s min-height -->
        <img class="avatar" :src="profilePicture" alt="Profile picture" />

        <!-- RIGHT: frosted info -->
        <div class="info">
          <div class="info-inner">
            <div class="label">Profile</div>
            <h1 class="name" :title="userName">{{ userName }}</h1>

            <div class="meta">
              <span class="pill">
                {{ soundBoardCount }} Sound Board<span v-if="soundBoardCount !== 1">s</span>
              </span>
              <span class="dot" aria-hidden="true">•</span>
              <span class="pill">{{ soundsCount }} Sounds</span>
            </div>

            <p v-if="bio" class="bio">{{ bio }}</p>
            <div class="actions"><slot name="actions" /></div>
          </div>
        </div>
      </div><!-- /card-content -->
    </div><!-- /board-card -->
  </div>
</template>

<script>
export default {
  name: 'ProfileBoardCard',
  props: {
    backgroundUrl: {
      type: String,
      default:
        'https://pbs.twimg.com/profile_images/843289621102575618/adYB0YVe_400x400.jpg',
    },
    profilePicture: {
      type: String,
      default:
        'https://pbs.twimg.com/profile_images/843289621102575618/adYB0YVe_400x400.jpg',
    },
    userName: { type: String, default: 'Owais Hobbi' },
    soundBoardCount: { type: Number, default: 33 },
    soundsCount: { type: Number, default: 452 },
    bio: { type: String, default: '' },
  },
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap');

/* Full-width wrapper: NO max-widths; spacing only */
.profile-wrap {
  width: 100%;
  margin: 2rem auto;
}

/* The card is the scaler: its font-size grows with viewport,
   and all sizes use em, so the whole layout scales from here. */
.board-card {
  position: relative;
  width: 100%;
  border-radius: 1rem;
  overflow: hidden;
  background: rgba(17, 20, 26, 0.6);
  box-shadow: 0 8px 30px rgba(0,0,0,0.35);
  border: 1px solid rgba(255,255,255,0.06);

  /* global scaler (no max-widths anywhere) */
  font-size: clamp(12px, 0.95vw + 0.25rem, 18px);
  font-family: Inter, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif;
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

/* Grid: avatar column (in em so it scales with font-size) | info */
.card-content {
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: clamp(14em, 18em, 22em) 1fr;
  gap: 1em;
  padding: 1em;

  /* Card height also from font-size, no vw/px: roughly ≈ 275 → 380px at your clamp ends */
  min-height: clamp(18em, 21em, 24em);

  align-items: stretch; /* avatar = info height */
  min-width: 0;
}

/* Avatar fills left column; square by aspect-ratio */
.avatar {
  width: 100%;
  height: 100%;
  aspect-ratio: 1 / 1;
  object-fit: cover;
  border-radius: 0.9em;
  box-shadow: 0 0.25em 1em rgba(0,0,0,0.35);
  display: block;
}

/* Frosted info panel */
.info {
  display: flex;
  border-radius: 0.9em;
  color: #e9edf6;
  overflow: hidden;
  backdrop-filter: blur(10px) saturate(1.2);
  background: linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.04));
  border: 1px solid rgba(255,255,255,0.06);
}

.info-inner {
  display: flex;
  flex-direction: column;
  gap: 0.6em;
  padding: 1em 1.1em;
  min-width: 0;
  justify-content: center;
}

/* Typography all relative to card font-size (em) */
.label {
  font-size: 0.9em;
  font-weight: 500;
  letter-spacing: 0.02em;
  color: rgba(233,237,246,0.85);
  margin: 0;
}

.name {
  margin: 0;
  font-weight: 700;
  font-size: clamp(1.3em, 1.6em, 1.9em);
  line-height: 1.15;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: #fff;
}

.meta {
  display: inline-flex;
  align-items: center;
  gap: 0.6em;
  flex-wrap: wrap;
}
.pill {
  display: inline-flex;
  align-items: center;
  gap: 0.45em;
  padding: 0.35em 0.65em;
  font-size: 0.95em;
  border-radius: 999px;
  background: rgba(255,255,255,0.06);
  border: 1px solid rgba(255,255,255,0.08);
  color: #dbe3f3;
}
.dot { opacity: 0.6; user-select: none; }

.bio {
  margin: 0.2em 0 0;
  font-size: 1em;
  line-height: 1.35;
  color: #d7def1;
  opacity: 0.95;
}

.actions {
  margin-top: 0.2em;
  display: inline-flex;
  gap: 0.6em;
}
</style>
