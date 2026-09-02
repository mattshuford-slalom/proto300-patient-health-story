<script setup>
import { useHealthStore } from '../stores/health'
import { formatDate } from '../utils/flags'

const props = defineProps({
  regionId: { type: String, required: true },
})

const store = useHealthStore()
</script>

<template>
  <section>
    <div class="d-flex align-center mb-2">
      <v-icon icon="mdi-pill" class="me-2" color="secondary" />
      <span class="text-subtitle-1 font-weight-medium">Medications</span>
    </div>

    <template v-if="store.medicationsByRegion(regionId).length">
      <v-list class="bg-transparent pa-0" density="comfortable">
        <v-list-item
          v-for="m in store.medicationsByRegion(regionId)"
          :key="m.id"
          class="px-0"
        >
          <template #prepend>
            <v-avatar color="accent" variant="tonal" size="40" class="me-3">
              <v-icon icon="mdi-pill" size="20" />
            </v-avatar>
          </template>
          <v-list-item-title class="font-weight-medium">
            {{ store.isClinical ? m.clinicalLabel : m.patientLabel }}
          </v-list-item-title>
          <v-list-item-subtitle class="text-wrap">
            {{ store.isClinical ? m.clinicalPurpose : m.purpose }}
          </v-list-item-subtitle>
          <template #append>
            <div class="text-caption text-medium-emphasis text-right">
              {{ m.schedule }}
            </div>
          </template>
        </v-list-item>
      </v-list>
    </template>

    <v-alert
      v-else
      variant="tonal"
      density="comfortable"
      color="surface-variant"
      icon="mdi-pill-off"
      text="No medications tied to this area."
    />
  </section>
</template>
