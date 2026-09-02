<script setup>
import { useHealthStore } from '../stores/health'

const store = useHealthStore()
</script>

<template>
  <v-btn-toggle
    :model-value="store.languageMode"
    mandatory
    density="comfortable"
    color="primary"
    variant="outlined"
    divided
    rounded="lg"
    @update:model-value="store.setLanguageMode($event)"
  >
    <v-btn value="patient" prepend-icon="mdi-account-heart-outline">
      Plain language
    </v-btn>
    <v-btn value="clinical" prepend-icon="mdi-stethoscope">
      Clinical
    </v-btn>
  </v-btn-toggle>
</template>
