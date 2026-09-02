<script setup>
import { useHealthStore } from '../stores/health'
import { formatDate } from '../utils/flags'

const props = defineProps({
  regionId: { type: String, required: true },
})

const store = useHealthStore()

const EVENT_META = {
  diagnosis: { icon: 'mdi-flag-variant-outline', color: 'flag-watch' },
  medication: { icon: 'mdi-pill', color: 'accent' },
  reading: { icon: 'mdi-chart-line', color: 'secondary' },
  note: { icon: 'mdi-note-text-outline', color: 'flag-stable' },
}

function meta(type) {
  return EVENT_META[type] || { icon: 'mdi-circle-small', color: 'secondary' }
}
</script>

<template>
  <div class="pa-2">
    <v-timeline
      v-if="store.timelineByRegion(regionId).length"
      side="end"
      align="start"
      density="comfortable"
      truncate-line="both"
      class="php-timeline"
    >
      <v-timeline-item
        v-for="e in store.timelineByRegion(regionId)"
        :key="e.id"
        :dot-color="meta(e.eventType).color"
        :icon="meta(e.eventType).icon"
        size="small"
      >
        <div class="text-caption text-medium-emphasis php-timeline-date">
          {{ formatDate(e.date) }}
        </div>
        <div class="text-body-2 font-weight-medium">
          {{ store.isClinical ? e.clinicalLabel : e.patientLabel }}
        </div>
      </v-timeline-item>
    </v-timeline>

    <v-alert
      v-else
      variant="tonal"
      density="comfortable"
      color="surface-variant"
      icon="mdi-timeline-clock-outline"
      text="No history recorded for this area yet."
    />
  </div>
</template>

<style scoped>
/* No opposite column, so each entry gets full row width for its date. */
.php-timeline :deep(.v-timeline-item__opposite) {
  display: none;
}

.php-timeline-date {
  white-space: nowrap;
}
</style>

