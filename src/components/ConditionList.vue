<script setup>
import { useHealthStore } from '../stores/health'
import { flagMeta, flagLabel, formatDate } from '../utils/flags'

const props = defineProps({
  regionId: { type: String, required: true },
})

const store = useHealthStore()
</script>

<template>
  <section>
    <div class="d-flex align-center mb-2">
      <v-icon icon="mdi-clipboard-pulse-outline" class="me-2" color="secondary" />
      <span class="text-subtitle-1 font-weight-medium">Conditions</span>
    </div>

    <template v-if="store.conditionsByRegion(regionId).length">
      <v-card
        v-for="c in store.conditionsByRegion(regionId)"
        :key="c.id"
        variant="tonal"
        color="surface-variant"
        class="mb-3 pa-3"
      >
        <div class="d-flex align-start justify-space-between ga-2">
          <div>
            <div class="text-body-1 font-weight-medium">
              {{ store.isClinical ? c.clinicalLabel : c.patientLabel }}
            </div>
            <div class="text-caption text-medium-emphasis">
              Since {{ formatDate(c.onsetDate) }}
            </div>
          </div>
          <v-chip
            :color="flagMeta(c.flag)?.color"
            :prepend-icon="flagMeta(c.flag)?.icon"
            size="small"
            variant="flat"
          >
            {{ flagLabel(c.flag, store.isClinical) }}
          </v-chip>
        </div>
        <p class="text-body-2 mt-2 mb-0">
          {{ store.isClinical ? c.clinicalNote : c.patientNote }}
        </p>
      </v-card>
    </template>

    <v-alert
      v-else
      type="success"
      variant="tonal"
      density="comfortable"
      icon="mdi-check-circle-outline"
      color="flag-stable"
      text="No conditions recorded for this area."
    />
  </section>
</template>
