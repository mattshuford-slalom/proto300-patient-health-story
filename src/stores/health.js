import { defineStore } from 'pinia'
import patient from '../data/patient.json'
import regions from '../data/regions.json'
import conditions from '../data/conditions.json'
import medications from '../data/medications.json'
import measurements from '../data/measurements.json'
import timelineEvents from '../data/timelineEvents.json'
import careNotes from '../data/careNotes.json'

// Softened flag ranking so the highest-priority flag wins per region.
const FLAG_RANK = { attention: 3, watch: 2, stable: 1 }

export const useHealthStore = defineStore('health', {
  state: () => ({
    patient,
    regions,
    conditions,
    medications,
    measurements,
    timelineEvents,
    careNotes,
    selectedRegionId: null,
    // Open by default so the drawer prompts the user to select a region.
    drawerOpen: true,
    // 'patient' = plain language, 'clinical' = clinical language
    languageMode: 'patient',
    timelineOpen: false,
  }),

  getters: {
    isClinical: (state) => state.languageMode === 'clinical',

    selectedRegion(state) {
      return state.regions.find((r) => r.id === state.selectedRegionId) || null
    },

    conditionsByRegion: (state) => (regionId) =>
      state.conditions.filter((c) => c.regionId === regionId),

    medicationsByRegion: (state) => (regionId) =>
      state.medications.filter((m) => m.regionId === regionId),

    measurementsByRegion: (state) => (regionId) =>
      state.measurements.filter((m) => m.regionId === regionId),

    timelineByRegion: (state) => (regionId) =>
      [...state.timelineEvents]
        .filter((e) => e.regionId === regionId)
        .sort((a, b) => new Date(b.date) - new Date(a.date)),

    notesByRegion: (state) => (regionId) =>
      state.careNotes.filter((n) => n.regionId === regionId),

    // Highest-severity flag present in a region, for the body-map indicators.
    regionFlag: (state) => (regionId) => {
      const flags = state.conditions
        .filter((c) => c.regionId === regionId)
        .map((c) => c.flag)
      if (!flags.length) return null
      return flags.reduce((top, f) =>
        (FLAG_RANK[f] || 0) > (FLAG_RANK[top] || 0) ? f : top
      )
    },

    // Rollup counts for the header summary.
    flagSummary(state) {
      const counts = { attention: 0, watch: 0, stable: 0 }
      for (const region of state.regions) {
        const flag = this.regionFlag(region.id)
        if (flag && counts[flag] !== undefined) counts[flag] += 1
      }
      return counts
    },
  },

  actions: {
    selectRegion(regionId) {
      this.selectedRegionId = regionId
      this.timelineOpen = false
      this.drawerOpen = true
    },
    clearSelection() {
      this.selectedRegionId = null
      this.timelineOpen = false
    },
    openDrawer() {
      this.drawerOpen = true
    },
    closeDrawer() {
      this.drawerOpen = false
    },
    toggleLanguageMode() {
      this.languageMode = this.isClinical ? 'patient' : 'clinical'
    },
    setLanguageMode(mode) {
      this.languageMode = mode
    },
    toggleTimeline() {
      this.timelineOpen = !this.timelineOpen
    },
  },
})
