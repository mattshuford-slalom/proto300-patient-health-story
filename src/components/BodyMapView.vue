<script setup>
import { useHealthStore } from '../stores/health'
import { flagMeta } from '../utils/flags'
import AnatomyMap from './AnatomyMap.vue'
import RegionSummaryChips from './RegionSummaryChips.vue'

const store = useHealthStore()

const legend = [
  { flag: 'attention', key: 'attention' },
  { flag: 'watch', key: 'watch' },
  { flag: 'stable', key: 'stable' },
]
</script>

<template>
  <div class="php-map-view">
    <v-row align="center" no-gutters>
      <v-col cols="12" md="7" lg="8" class="px-md-6">
        <div class="text-center mb-2">
          <h1 class="text-h4 font-weight-bold php-patient-headline mb-1">
            Your health, head to toe
          </h1>
          <p class="text-body-1 text-medium-emphasis">
            Select any part of the body to explore what's going on there.
          </p>
        </div>

        <AnatomyMap />

        <!-- Legend -->
        <div class="d-flex justify-center flex-wrap ga-4 mt-3">
          <div
            v-for="l in legend"
            :key="l.key"
            class="d-flex align-center ga-2"
          >
            <v-icon
              :icon="flagMeta(l.flag)?.icon"
              :color="flagMeta(l.flag)?.color"
              size="18"
            />
            <span class="text-caption text-medium-emphasis">
              {{ store.isClinical ? flagMeta(l.flag)?.clinicalLabel : flagMeta(l.flag)?.patientLabel }}
              ({{ store.flagSummary[l.key] }})
            </span>
          </div>
        </div>
      </v-col>

      <v-col cols="12" md="5" lg="4" class="px-md-4 mt-6 mt-md-0">
        <v-card variant="tonal" color="surface-variant" class="pa-4 mb-4">
          <div class="text-overline text-medium-emphasis">At a glance</div>
          <p class="text-body-2 mb-3">
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
          />
        </v-card>

        <RegionSummaryChips />
      </v-col>
    </v-row>
  </div>
</template>

<style scoped>
.php-map-view {
  max-width: 1280px;
  margin: 0 auto;
  padding: 24px 16px 48px;
}
</style>
