<script setup>
import { computed } from 'vue'
import { useDisplay } from 'vuetify'
import { useHealthStore } from '../stores/health'
import { flagMeta, flagLabel, formatDate } from '../utils/flags'
import ConditionList from './ConditionList.vue'
import MedicationList from './MedicationList.vue'
import VitalsLabsSnapshot from './VitalsLabsSnapshot.vue'
import RegionTimeline from './RegionTimeline.vue'

const store = useHealthStore()
const { mdAndUp } = useDisplay()

const region = computed(() => store.selectedRegion)
const open = computed({
  get: () => store.drawerOpen,
  set: (v) => {
    if (!v) store.closeDrawer()
    else store.openDrawer()
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
    :scrim="mdAndUp ? false : 'rgba(51,53,47,0.25)'"
  >
    <template v-if="region">
      <!-- Header -->
      <div class="php-drawer-header pa-4">
        <div class="d-flex align-center justify-space-between">
          <v-btn
            v-if="store.timelineOpen"
            variant="text"
            size="small"
            prepend-icon="mdi-arrow-left"
            aria-label="Back to region overview"
            @click="store.toggleTimeline()"
          >
            Back
          </v-btn>
          <div v-else class="text-overline text-medium-emphasis">
            {{ store.isClinical ? region.clinicalBlurb : region.system }}
          </div>
          <v-btn
            icon="mdi-close"
            variant="text"
            size="small"
            aria-label="Close region details"
            @click="store.closeDrawer()"
          />
        </div>
        <h2 class="text-h5 font-weight-bold php-patient-headline">
          {{ region.label }}{{ store.timelineOpen ? ' — history' : '' }}
        </h2>
        <p v-if="!store.timelineOpen" class="text-body-2 text-medium-emphasis mb-3 mt-1">
          {{ store.isClinical ? region.clinicalBlurb : region.patientBlurb }}
        </p>

        <div v-if="!store.timelineOpen" class="d-flex align-center ga-2">
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
            prepend-icon="mdi-timeline-outline"
            @click="store.toggleTimeline()"
          >
            View history
          </v-btn>
        </div>
      </div>

      <v-divider />

      <!-- Scrollable body: region overview, or timeline when history is open -->
      <div class="php-drawer-scroll pa-4">
        <RegionTimeline v-if="store.timelineOpen" :region-id="region.id" />

        <template v-else>
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
        </template>
      </div>
    </template>

    <!-- Welcome prompt shown before any region is selected -->
    <template v-else>
      <div class="php-welcome pa-6">
        <v-btn
          icon="mdi-close"
          variant="text"
          size="small"
          aria-label="Close"
          class="php-welcome-close"
          @click="store.closeDrawer()"
        />
        <v-icon
          icon="mdi-gesture-tap"
          size="56"
          color="primary"
          class="mb-4"
        />
        <h2 class="text-h5 font-weight-bold php-patient-headline mb-2">
          Explore your health story
        </h2>
        <p class="text-body-1 text-medium-emphasis">
          Select any part of the body to see conditions, medications, and
          recent labs and vitals for that area.
        </p>
      </div>
    </template>
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

.php-welcome {
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.php-welcome-close {
  position: absolute;
  top: 12px;
  right: 12px;
}
</style>
