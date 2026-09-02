<script setup>
import { computed } from 'vue'
import { useHealthStore } from '../stores/health'
import { flagMeta, flagLabel, formatDate } from '../utils/flags'
import ConditionList from './ConditionList.vue'
import MedicationList from './MedicationList.vue'
import VitalsLabsSnapshot from './VitalsLabsSnapshot.vue'
import RegionTimeline from './RegionTimeline.vue'

const store = useHealthStore()

const region = computed(() => store.selectedRegion)
const open = computed({
  get: () => !!store.selectedRegionId,
  set: (v) => {
    if (!v) store.clearSelection()
  },
})

const topFlag = computed(() =>
  region.value ? store.regionFlag(region.value.id) : null
)
const notes = computed(() =>
  region.value ? store.notesByRegion(region.value.id) : []
)
</script>

<template>
  <v-navigation-drawer
    v-model="open"
    location="right"
    :width="440"
    temporary
    class="php-detail-drawer"
    scrim="rgba(51,53,47,0.25)"
  >
    <template v-if="region">
      <!-- Header -->
      <div class="php-drawer-header pa-4">
        <div class="d-flex align-center justify-space-between">
          <div class="text-overline text-medium-emphasis">
            {{ store.isClinical ? region.clinicalBlurb : region.system }}
          </div>
          <v-btn
            icon="mdi-close"
            variant="text"
            size="small"
            aria-label="Close region details"
            @click="store.clearSelection()"
          />
        </div>
        <h2 class="text-h5 font-weight-bold php-patient-headline">
          {{ region.label }}
        </h2>
        <p class="text-body-2 text-medium-emphasis mb-3 mt-1">
          {{ store.isClinical ? region.clinicalBlurb : region.patientBlurb }}
        </p>

        <div class="d-flex align-center ga-2">
          <v-chip
            v-if="topFlag"
            :color="flagMeta(topFlag)?.color"
            :prepend-icon="flagMeta(topFlag)?.icon"
            variant="flat"
            size="small"
          >
            {{ flagLabel(topFlag, store.isClinical) }}
          </v-chip>
          <v-btn
            variant="tonal"
            color="secondary"
            size="small"
            :prepend-icon="store.timelineOpen ? 'mdi-timeline-check' : 'mdi-timeline-outline'"
            @click="store.toggleTimeline()"
          >
            {{ store.timelineOpen ? 'Hide history' : 'View history' }}
          </v-btn>
        </div>
      </div>

      <v-divider />

      <!-- Scrollable body -->
      <div class="php-drawer-scroll pa-4">
        <ConditionList :region-id="region.id" />
        <v-divider class="my-4" />
        <MedicationList :region-id="region.id" />
        <v-divider class="my-4" />
        <VitalsLabsSnapshot :region-id="region.id" />

        <template v-if="notes.length">
          <v-divider class="my-4" />
          <div class="d-flex align-center mb-2">
            <v-icon icon="mdi-message-text-outline" class="me-2" color="secondary" />
            <span class="text-subtitle-1 font-weight-medium">Care-team notes</span>
          </div>
          <v-card
            v-for="n in notes"
            :key="n.id"
            variant="tonal"
            color="flag-stable"
            class="mb-2 pa-3"
          >
            <p class="text-body-2 mb-2">
              "{{ store.isClinical ? n.clinicalLabel : n.patientLabel }}"
            </p>
            <div class="text-caption text-medium-emphasis">
              — {{ n.author }}, {{ n.role }} · {{ formatDate(n.date) }}
            </div>
          </v-card>
        </template>
      </div>
    </template>

    <!-- Timeline bottom sheet, off the detail drawer -->
    <v-bottom-sheet v-model="store.timelineOpen" :scrim="false">
      <v-card rounded="t-xl">
        <div class="d-flex align-center justify-space-between px-4 pt-3">
          <span class="text-subtitle-1 font-weight-medium php-patient-headline">
            {{ region?.label }} — history
          </span>
          <v-btn
            icon="mdi-close"
            variant="text"
            size="small"
            aria-label="Close history"
            @click="store.timelineOpen = false"
          />
        </div>
        <v-divider class="mt-2" />
        <div class="php-timeline-scroll">
          <RegionTimeline v-if="region" :region-id="region.id" />
        </div>
      </v-card>
    </v-bottom-sheet>
  </v-navigation-drawer>
</template>

<style scoped>
.php-detail-drawer :deep(.v-navigation-drawer__content) {
  display: flex;
  flex-direction: column;
}

.php-drawer-header {
  background: linear-gradient(160deg, rgba(62, 142, 138, 0.08), transparent);
}

.php-drawer-scroll {
  overflow-y: auto;
  flex: 1 1 auto;
}

.php-timeline-scroll {
  max-height: 55vh;
  overflow-y: auto;
}
</style>
