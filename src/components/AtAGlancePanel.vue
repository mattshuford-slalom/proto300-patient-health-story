<script setup>
import { useHealthStore } from '../stores/health'
import { flagMeta } from '../utils/flags'

const store = useHealthStore()

const legend = [
  { flag: 'attention', key: 'attention' },
  { flag: 'watch', key: 'watch' },
  { flag: 'stable', key: 'stable' },
]
</script>

<template>
  <aside class="php-glance-panel">
    <v-card variant="tonal" color="surface-variant" class="pa-5 mb-4">
      <div class="php-glance-label mb-1">At a glance</div>
      <p class="php-glance-text mb-3">
        {{ store.patient.preferredName }} has
        <strong>{{ store.conditions.length }}</strong> tracked conditions
        across <strong>{{ store.flagSummary.attention + store.flagSummary.watch + store.flagSummary.stable }}</strong>
        body areas. Areas needing attention are marked on the map.
      </p>
      <v-alert
        v-if="store.flagSummary.attention"
        color="flag-attention"
        variant="tonal"
        density="comfortable"
        icon="mdi-alert-circle-outline"
        :text="`${store.flagSummary.attention} area(s) could use a closer look.`"
        class="php-glance-alert"
      />
    </v-card>

    <!-- Legend, stacked vertically -->
    <div class="d-flex flex-column ga-3">
      <div
        v-for="l in legend"
        :key="l.key"
        class="d-flex align-center ga-2"
      >
        <v-icon
          :icon="flagMeta(l.flag)?.icon"
          :color="flagMeta(l.flag)?.color"
          size="22"
        />
        <span class="php-legend-text">
          {{ store.isClinical ? flagMeta(l.flag)?.clinicalLabel : flagMeta(l.flag)?.patientLabel }}
          ({{ store.flagSummary[l.key] }})
        </span>
      </div>
    </div>
  </aside>
</template>

<style scoped>
.php-glance-panel {
  width: 100%;
  /* Sticky so it stays anchored in place if its container ever scrolls. */
  position: sticky;
  top: 0;
}

/* Full-opacity, theme-aware text for solid contrast in light and dark mode. */
.php-glance-label {
  font-size: 1rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: rgb(var(--v-theme-on-surface));
}

.php-glance-text {
  font-size: 1.1rem;
  line-height: 1.55;
  color: rgb(var(--v-theme-on-surface));
}

.php-glance-alert :deep(.v-alert-title),
.php-glance-alert :deep(.v-alert__content) {
  font-size: 1rem;
  color: rgb(var(--v-theme-on-surface));
}

.php-legend-text {
  font-size: 1.05rem;
  font-weight: 500;
  color: rgb(var(--v-theme-on-surface));
}

@media (max-width: 900px) {
  .php-glance-panel {
    position: static;
  }
}
</style>
