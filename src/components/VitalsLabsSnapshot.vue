<script setup>
import { useHealthStore } from '../stores/health'
import { measurementColor, formatDate } from '../utils/flags'

const props = defineProps({
  regionId: { type: String, required: true },
})

const store = useHealthStore()

function statusLabel(status) {
  if (status === 'high') return 'High'
  if (status === 'low') return 'Low'
  return 'In range'
}
</script>

<template>
  <section>
    <div class="d-flex align-center mb-2">
      <v-icon icon="mdi-heart-pulse" class="me-2" color="secondary" />
      <span class="text-subtitle-1 font-weight-medium">Recent labs &amp; vitals</span>
    </div>

    <template v-if="store.measurementsByRegion(regionId).length">
      <v-row dense>
        <v-col
          v-for="m in store.measurementsByRegion(regionId)"
          :key="m.id"
          cols="12"
          sm="6"
        >
          <v-card variant="outlined" class="pa-3 h-100">
            <div class="d-flex align-center justify-space-between">
              <span class="text-caption text-medium-emphasis">{{ m.metric }}</span>
              <v-chip
                :color="measurementColor(m.status)"
                size="x-small"
                variant="flat"
              >
                {{ statusLabel(m.status) }}
              </v-chip>
            </div>
            <div class="d-flex align-baseline ga-1 mt-1">
              <span class="text-h5 font-weight-bold">{{ m.value }}</span>
              <span class="text-caption text-medium-emphasis">{{ m.unit }}</span>
            </div>
            <div class="text-caption text-medium-emphasis mt-1">
              Normal {{ m.normalRange }} · {{ formatDate(m.date) }}
            </div>
            <div v-if="!store.isClinical" class="text-caption mt-1">
              {{ m.patientHint }}
            </div>
          </v-card>
        </v-col>
      </v-row>
    </template>

    <v-alert
      v-else
      variant="tonal"
      density="comfortable"
      color="surface-variant"
      icon="mdi-chart-line"
      text="No recent readings for this area."
    />
  </section>
</template>
