<script setup>
import { ref, computed } from 'vue'
import { useTheme } from 'vuetify'
import { useHealthStore } from '../stores/health'

const store = useHealthStore()
const hoveredId = ref(null)

const theme = useTheme()
const isDark = computed(() => theme.global.current.value.dark)
const silhouetteFill = computed(() => (isDark.value ? '#33403D' : '#DDE6E3'))
const neutralFill = computed(() => (isDark.value ? '#3C4744' : '#C6D6D3'))
const selectStroke = computed(() => (isDark.value ? '#5FB3AE' : '#3E8E8A'))

// Region geometry. Each region is drawn as an SVG <path> so we can loop
// uniformly; `cx`/`cy` anchor the floating flag indicator for that region.
const shapes = [
  {
    id: 'head',
    cx: 160, cy: 58,
    d: 'M160,16 C186,16 204,36 204,64 C204,92 186,112 160,112 C134,112 116,92 116,64 C116,36 134,16 160,16 Z',
  },
  {
    id: 'eyes',
    cx: 160, cy: 52,
    d: 'M132,50 C132,42 146,40 160,40 C174,40 188,42 188,50 C188,58 174,60 160,60 C146,60 132,58 132,50 Z',
  },
  {
    id: 'throat',
    cx: 160, cy: 122,
    d: 'M144,110 L176,110 L174,132 C174,140 146,140 146,132 Z',
  },
  {
    id: 'lungs',
    cx: 160, cy: 168,
    d: 'M110,140 C110,132 118,128 128,130 L192,130 C202,128 210,132 210,140 L210,204 C210,214 200,220 190,218 L130,218 C120,220 110,214 110,204 Z',
  },
  {
    id: 'chest',
    cx: 160, cy: 176,
    d: 'M160,196 C140,176 128,164 128,148 C128,138 136,130 146,130 C153,130 158,134 160,140 C162,134 167,130 174,130 C184,130 192,138 192,148 C192,164 180,176 160,196 Z',
  },
  {
    id: 'left-arm',
    cx: 92, cy: 200,
    d: 'M104,140 C112,138 118,144 118,152 L112,250 C111,262 102,268 92,266 C83,264 79,256 80,246 L92,150 C93,144 98,141 104,140 Z',
  },
  {
    id: 'right-arm',
    cx: 228, cy: 200,
    d: 'M216,140 C208,138 202,144 202,152 L208,250 C209,262 218,268 228,266 C237,264 241,256 240,246 L228,150 C227,144 222,141 216,140 Z',
  },
  {
    id: 'abdomen',
    cx: 160, cy: 246,
    d: 'M118,222 L202,222 L200,272 C200,282 190,288 180,288 L140,288 C130,288 120,282 120,272 Z',
  },
  {
    id: 'pelvis',
    cx: 160, cy: 312,
    d: 'M120,292 L200,292 L192,340 C190,350 182,356 172,356 L148,356 C138,356 130,350 128,340 Z',
  },
  {
    id: 'left-leg',
    cx: 142, cy: 460,
    d: 'M128,360 L156,360 L154,556 C154,568 146,574 140,574 C132,574 126,568 126,556 L124,372 C124,364 125,360 128,360 Z',
  },
  {
    id: 'right-leg',
    cx: 178, cy: 460,
    d: 'M164,360 L192,360 L196,372 L194,556 C194,568 188,574 180,574 C172,574 166,568 166,556 Z',
  },
]

const FILL = {
  attention: '#D9A05B',
  watch: '#C98B6B',
  stable: '#7FA88A',
  none: '#C6D6D3',
}

function fillFor(id) {
  const flag = store.regionFlag(id)
  return FILL[flag] || neutralFill.value
}

function isSelected(id) {
  return store.selectedRegionId === id
}

function opacityFor(id) {
  if (isSelected(id)) return 1
  if (hoveredId.value === id) return 0.95
  return 0.82
}

function onSelect(id) {
  store.selectRegion(id)
}

function onKey(e, id) {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault()
    onSelect(id)
  }
}

const flaggedShapes = computed(() =>
  shapes
    .map((s) => ({ ...s, flag: store.regionFlag(s.id) }))
    .filter((s) => s.flag)
)

function regionLabel(id) {
  return store.regions.find((r) => r.id === id)?.label || id
}
</script>

<template>
  <div class="php-map-wrap">
    <svg
      class="php-body-map"
      viewBox="0 0 320 600"
      role="group"
      aria-label="Interactive body map. Select a region to see details."
      preserveAspectRatio="xMidYMid meet"
    >
      <!-- Soft body silhouette behind the interactive regions -->
      <g opacity="0.35">
        <path
          d="M160,14 C188,14 208,36 208,66 C208,88 196,104 180,112 C206,116 216,132 216,150 L232,246 C236,262 224,272 214,268 C208,266 205,260 204,254 L198,214 L202,300 C204,338 196,352 194,556 C194,570 186,578 178,578 C170,578 164,570 164,556 L160,392 L156,556 C156,570 150,578 142,578 C134,578 126,570 126,556 C124,352 116,338 118,300 L122,214 L116,254 C115,260 112,266 106,268 C96,272 84,262 88,246 L104,150 C104,132 114,116 140,112 C124,104 112,88 112,66 C112,36 132,14 160,14 Z"
          :fill="silhouetteFill"
        />
      </g>

      <!-- Interactive regions -->
      <path
        v-for="s in shapes"
        :key="s.id"
        :d="s.d"
        :fill="fillFor(s.id)"
        :fill-opacity="opacityFor(s.id)"
        :stroke="selectStroke"
        :stroke-width="isSelected(s.id) ? 3 : 0"
        class="php-region"
        :class="{ 'php-region--selected': isSelected(s.id) }"
        tabindex="0"
        role="button"
        :aria-label="regionLabel(s.id)"
        :aria-pressed="isSelected(s.id)"
        @click="onSelect(s.id)"
        @keydown="onKey($event, s.id)"
        @mouseenter="hoveredId = s.id"
        @mouseleave="hoveredId = null"
      />

      <!-- Floating flag indicators per region -->
      <g
        v-for="s in flaggedShapes"
        :key="`flag-${s.id}`"
        class="php-flag-dot"
        pointer-events="none"
      >
        <circle
          :cx="s.cx"
          :cy="s.cy"
          r="9"
          :fill="FILL[s.flag]"
          stroke="#FFFFFF"
          stroke-width="2.5"
        />
        <circle :cx="s.cx" :cy="s.cy" r="3" fill="#FFFFFF" opacity="0.85" />
      </g>
    </svg>

    <!-- Accessible hover/selection hint -->
    <transition name="php-fade">
      <div v-if="hoveredId" class="php-map-hint">
        {{ regionLabel(hoveredId) }}
      </div>
    </transition>
  </div>
</template>

<style scoped>
.php-map-wrap {
  position: relative;
  width: 100%;
  max-width: 460px;
  margin: 0 auto;
}

.php-body-map {
  width: 100%;
  height: auto;
  display: block;
  filter: drop-shadow(0 8px 24px rgba(62, 142, 138, 0.12));
}

.php-map-hint {
  position: absolute;
  bottom: 4px;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(51, 53, 47, 0.88);
  color: #fff;
  padding: 4px 14px;
  border-radius: 999px;
  font-size: 0.85rem;
  pointer-events: none;
  white-space: nowrap;
}

.php-flag-dot {
  animation: php-pulse 2.4s ease-in-out infinite;
  transform-origin: center;
}

@keyframes php-pulse {
  0%, 100% { opacity: 0.9; }
  50% { opacity: 1; }
}

.php-fade-enter-active,
.php-fade-leave-active {
  transition: opacity 200ms ease;
}
.php-fade-enter-from,
.php-fade-leave-to {
  opacity: 0;
}
</style>
