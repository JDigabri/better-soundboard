<template>
  <section class="user-content">
    <header class="uc-header">
      <h2>User Content</h2>
      <div class="segmented" role="tablist" aria-label="User content views">
        <button
          role="tab"
          :aria-selected="activeTab === 'sounds'"
          :class="['seg-btn', { active: activeTab === 'sounds' }]"
          @click="selectTab('sounds')"
        >
          Sounds
        </button>
        <button
          role="tab"
          :aria-selected="activeTab === 'boards'"
          :class="['seg-btn', { active: activeTab === 'boards' }]"
          @click="selectTab('boards')"
        >
          Sound Boards
        </button>
      </div>
    </header>

    <div v-if="!activeTab" class="uc-empty">
      <p>Select <strong>Sounds</strong> or <strong>Sound Boards</strong> to view your items.</p>
    </div>

    <!-- SOUNDS PANEL -->
    <div v-if="activeTab === 'sounds'" class="uc-panel" key="sounds">
      <div v-if="selectedSoundIds.length" class="action-bar">
        <span class="selected-count">{{ selectedSoundIds.length }} selected</span>
        <div class="actions">
          <button class="ghost" @click="clearSelections('sounds')">Clear</button>

          <!-- CLICK-TO-OPEN MENU (prevents hover scroll) -->
          <div class="menu" :class="{ open: menuOpen }">
            <button
              class="primary"
              @click="toggleMenu"
              aria-haspopup="true"
              :aria-expanded="menuOpen.toString()"
            >
              Edit
            </button>
            <div v-show="menuOpen" class="menu-list" role="menu">
              <button role="menuitem" @click="fakeAction('Edit → Title'); closeMenu()">Title</button>
              <button role="menuitem" @click="fakeAction('Edit → Visibility'); closeMenu()">Visibility</button>
              <button role="menuitem" @click="fakeAction('Edit → Tags'); closeMenu()">Tags</button>
            </div>
          </div>

          <button class="ghost" @click="fakeAction('Add to Sound Board')">Add to Sound Board</button>
          <button class="danger" @click="fakeAction('Delete')">Delete</button>
        </div>
      </div>

      <div class="table-wrap">
        <table class="uc-table">
          <thead>
            <tr>
              <th class="checkbox">
                <input
                  type="checkbox"
                  :checked="allSoundsChecked"
                  @change="toggleAll('sounds', $event.target.checked)"
                  aria-label="Select all sounds"
                />
              </th>
              <th class="name">Name</th>
              <th class="meta">Length</th>
              <th class="meta">Added</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="s in soundsToRender" :key="s.id">
              <td class="checkbox">
                <input
                  type="checkbox"
                  :value="s.id"
                  v-model="selectedSoundIds"
                  :aria-label="`Select ${s.name}`"
                />
              </td>
              <td class="name">
                <span class="dot"></span>
                {{ s.name }}
              </td>
              <td class="meta">{{ s.length }}</td>
              <td class="meta">{{ s.added }}</td>
            </tr>
            <tr v-if="!soundsToRender.length">
              <td colspan="4" class="empty-row">No sounds yet.</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- SOUND BOARDS PANEL -->
    <div v-if="activeTab === 'boards'" class="uc-panel" key="boards">
      <div v-if="selectedBoardIds.length" class="action-bar">
        <span class="selected-count">{{ selectedBoardIds.length }} selected</span>
        <div class="actions">
          <button class="ghost" @click="clearSelections('boards')">Clear</button>
          <button class="primary" @click="fakeAction('Edit Board')">Edit</button>
          <button class="ghost" @click="fakeAction('Share')">Share</button>
          <button class="danger" @click="fakeAction('Delete')">Delete</button>
        </div>
      </div>

      <div class="table-wrap">
        <table class="uc-table">
          <thead>
            <tr>
              <th class="checkbox">
                <input
                  type="checkbox"
                  :checked="allBoardsChecked"
                  @change="toggleAll('boards', $event.target.checked)"
                  aria-label="Select all sound boards"
                />
              </th>
              <th class="name">Board</th>
              <th class="meta">Items</th>
              <th class="meta">Updated</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="b in boardsToRender" :key="b.id">
              <td class="checkbox">
                <input
                  type="checkbox"
                  :value="b.id"
                  v-model="selectedBoardIds"
                  :aria-label="`Select ${b.name}`"
                />
              </td>
              <td class="name">
                <span class="dot"></span>
                {{ b.name }}
              </td>
              <td class="meta">{{ b.items }} sounds</td>
              <td class="meta">{{ b.updated }}</td>
            </tr>
            <tr v-if="!boardsToRender.length">
              <td colspan="4" class="empty-row">No sound boards yet.</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'UserContentPanel',
  props: {
    sounds: {
      type: Array,
      default: () => [
        { id: 's1', name: 'Johnny is Bad At Rust', length: '2:02', added: '2d ago' },
        { id: 's2', name: 'Eph is Bad At Rust', length: '2:02', added: '2d ago' },
        { id: 's3', name: 'Da K is Bad At Rust', length: '2:02', added: '2d ago' },
      ],
    },
    boards: {
      type: Array,
      default: () => [
        { id: 'b1', name: 'Meme Clips', items: 12, updated: '3h ago' },
        { id: 'b2', name: 'Stream Deck – Stream', items: 8, updated: 'yesterday' },
      ],
    },
    initialTab: {
      type: String,
      default: null,
      validator: (v) => v === null || v === 'sounds' || v === 'boards',
    },
  },
  data() {
    return {
      activeTab: this.initialTab,
      selectedSoundIds: [],
      selectedBoardIds: [],
      menuOpen: false,
    };
  },
  computed: {
    soundsToRender() { return Array.isArray(this.sounds) ? this.sounds : []; },
    boardsToRender() { return Array.isArray(this.boards) ? this.boards : []; },
    allSoundsChecked() {
      return this.soundsToRender.length > 0 && this.selectedSoundIds.length === this.soundsToRender.length;
    },
    allBoardsChecked() {
      return this.boardsToRender.length > 0 && this.selectedBoardIds.length === this.boardsToRender.length;
    },
  },
  methods: {
    selectTab(tab) {
      if (this.activeTab === tab) return;
      this.activeTab = tab;
      this.selectedSoundIds = [];
      this.selectedBoardIds = [];
      this.$emit('tab-change', tab);
      this.closeMenu();
    },
    toggleAll(scope, checked) {
      if (scope === 'sounds') {
        this.selectedSoundIds = checked ? this.soundsToRender.map((s) => s.id) : [];
      } else {
        this.selectedBoardIds = checked ? this.boardsToRender.map((b) => b.id) : [];
      }
    },
    clearSelections(scope) {
      if (scope === 'sounds') this.selectedSoundIds = [];
      if (scope === 'boards') this.selectedBoardIds = [];
      this.closeMenu();
    },
    fakeAction(label) { this.$emit('action', { tab: this.activeTab, label }); },
    toggleMenu() { this.menuOpen = !this.menuOpen; },
    closeMenu() { this.menuOpen = false; },
    onClickOutside(e) {
      if (!this.$el.contains(e.target)) this.closeMenu();
    },
  },
  mounted() { window.addEventListener('click', this.onClickOutside); },
  beforeDestroy() { window.removeEventListener('click', this.onClickOutside); },
};
</script>

<style scoped>
/* Float naturally with parent; fully responsive */
.user-content {
  /* define shared palette but keep the outer bg transparent */
  --panel: #151a22;
  --panel-2: #0f141b;
  --text: #e6eaf2;
  --muted: #9aa4b2;
  --accent: #5b8cff;

  width: 100%;
  max-width: 100%;
  padding: 0;              /* no outer padding */
  background: transparent; /* remove only the far-back bg */
  color: var(--text);
}

.uc-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 0 8px 0;
}

.uc-header h2 {
  font-size: clamp(16px, 1.6vw, 22px);
  font-weight: 600;
  margin: 0;
}

/* bring back local chrome */
.segmented {
  display: inline-flex;
  border-radius: 8px;
  padding: 2px;
  gap: 4px;
  background: var(--panel);
  border: 1px solid #1e2531;
}
.seg-btn {
  appearance: none; border: none; background: transparent; color: #a6b0c2;
  padding: 6px 10px; border-radius: 6px; font-weight: 600; cursor: pointer;
}
.seg-btn.active { color: #ffffff; box-shadow: inset 0 0 0 1px rgba(91,140,255,.6); background: rgba(91,140,255,.12); }

.uc-empty {
  display: grid; place-items: center; height: 120px; color: var(--muted);
  border: 1px dashed #233045; border-radius: 10px; background: var(--panel-2);
}

/* Inner panel gets its background back */
.uc-panel { background: var(--panel-2); border: 1px solid #1e2531; border-radius: 12px; overflow: hidden; }

/* Action bar */
.action-bar { display: flex; justify-content: space-between; align-items: center; padding: 6px 10px; background: rgba(35,48,69,0.6); border-bottom: 1px solid #243147; }
.selected-count { color: var(--muted); }
.actions { display: inline-flex; align-items: center; gap: 8px; }

button.primary { background: var(--accent); color: #0b1020; border: none; padding: 6px 10px; border-radius: 8px; font-weight: 700; cursor: pointer; }
button.ghost { background: transparent; color: var(--text); border: 1px solid #2a364c; padding: 6px 10px; border-radius: 8px; font-weight: 600; cursor: pointer; }
button.danger { background: transparent; border: 1px solid rgba(255,93,93,.5); color: #ff5d5d; padding: 6px 10px; border-radius: 8px; font-weight: 700; cursor: pointer; }
button.primary:hover { filter: brightness(1.05); }
button.ghost:hover { background: #1b2332; }
button.danger:hover { background: rgba(255,93,93,.08); }

/* Click menu */
.menu { position: relative; }
.menu-list { position: absolute; right: 0; top: calc(100% + 6px); background: #0e1420; border: 1px solid #2a364c; border-radius: 8px; padding: 6px; min-width: 160px; box-shadow: 0 10px 25px rgba(0,0,0,0.35); display: none; max-height: 240px; overflow: auto; }
.menu.open .menu-list { display: grid; gap: 4px; }
.menu-list > button { text-align: left; border: none; background: transparent; color: var(--text); padding: 8px; border-radius: 6px; cursor: pointer; }
.menu-list > button:hover { background: #172034; }

/* Table */
.table-wrap { overflow: auto; }
.uc-table { width: 100%; border-collapse: collapse; }
.uc-table thead th { font-size: 12px; text-transform: uppercase; letter-spacing: .08em; color: var(--muted); background: #0f1623; border-bottom: 1px solid #243147; padding: 8px 10px; }
.uc-table tbody td { padding: 10px; border-bottom: 1px solid #1c2638; }
.uc-table .checkbox { width: 44px; text-align: center; }
.uc-table .name { font-weight: 600; }
.uc-table .meta { color: var(--muted); width: 120px; }
.uc-table .empty-row { text-align: center; color: var(--muted); padding: 20px; }

.dot { display: inline-block; width: 6px; height: 6px; margin-right: 10px; border-radius: 999px; background: #4a80ff; box-shadow: 0 0 0 3px rgba(74,128,255,0.15); }

input[type='checkbox'] { width: 16px; height: 16px; accent-color: var(--accent); }
</style>
