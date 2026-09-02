<script setup>
import { useHealthStore } from '../stores/health'
import { flagMeta } from '../utils/flags'

const store = useHealthStore()

function flagColor(regionId) {
  const meta = flagMeta(store.regionFlag(regionId))
  return meta ? meta.color : 'surface-variant'
}

function flagIcon(regionId) {
  const meta = flagMeta(store.regionFlag(regionId))
  return meta ? meta.icon : 'mdi-checkbox-blank-circle-outline'
}
</script>

<template>
  <div class="php-chips">
    <div class="text-overline text-medium-emphasis mb-1">Jump to a region</div>
    <div class="d-flex flex-wrap ga-2">
      <v-chip
        v-for="region in store.regions"
        :key="region.id"
        :color="flagColor(region.id)"
        :variant="store.selectedRegionId === region.id ? 'flat' : 'tonal'"
        :prepend-icon="flagIcon(region.id)"
        size="small"
        class="php-region-chip"
        @click="store.selectRegion(region.id)"
      >
        {{ region.shortLabel }}
      </v-chip>
    </div>
  </div>
</template>

<style scoped>
.php-region-chip {
  cursor: pointer;
  transition: transform 150ms ease;
}
.php-region-chip:hover {
  transform: translateY(-1px);
}
</style>
