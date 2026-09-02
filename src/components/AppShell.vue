<script setup>
import { ref, computed } from 'vue'
import { useTheme, useDisplay } from 'vuetify'
import { useHealthStore } from '../stores/health'
import { formatDate } from '../utils/flags'
import ModeToggle from './ModeToggle.vue'
import BodyMapView from './BodyMapView.vue'
import RegionDetailDrawer from './RegionDetailDrawer.vue'

const store = useHealthStore()
const showCareTeam = ref(false)

const theme = useTheme()
const isDark = computed(() => theme.global.current.value.dark)
function toggleTheme() {
  theme.change(isDark.value ? 'patientHealthLight' : 'patientHealthDark')
}

// On md+ screens the drawer shifts content aside instead of overlaying it.
const { mdAndUp } = useDisplay()
const shiftContent = computed(() => mdAndUp.value && !!store.selectedRegionId)
</script>

<template>
  <v-app>
    <v-app-bar flat color="surface" class="px-2 php-appbar" height="72">
      <template #prepend>
        <v-avatar color="primary" variant="flat" size="44" class="ms-2">
          <span class="text-h6 font-weight-bold">
            {{ store.patient.preferredName.charAt(0) }}
          </span>
        </v-avatar>
      </template>

      <v-app-bar-title>
        <div class="d-flex flex-column">
          <span class="text-subtitle-1 font-weight-bold php-patient-headline">
            {{ store.patient.name }}
          </span>
          <span class="text-caption text-medium-emphasis">
            {{ store.patient.age }} · {{ store.patient.sex }} ·
            {{ store.patient.mrn }} · Last visit {{ formatDate(store.patient.lastVisit) }}
          </span>
        </div>
      </v-app-bar-title>

      <template #append>
        <div class="d-none d-sm-flex align-center me-2">
          <ModeToggle />
        </div>
        <v-btn
          :icon="isDark ? 'mdi-weather-sunny' : 'mdi-weather-night'"
          variant="text"
          :aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
          @click="toggleTheme"
        />
        <v-btn
          icon="mdi-account-group-outline"
          variant="text"
          aria-label="Care team"
          @click="showCareTeam = true"
        />
      </template>
    </v-app-bar>

    <!-- Mode toggle for small screens -->
    <v-sheet
      color="surface-variant"
      class="d-flex d-sm-none justify-center py-2"
    >
      <ModeToggle />
    </v-sheet>

    <v-main class="php-main">
      <div class="php-content" :class="{ 'php-content--shifted': shiftContent }">
        <BodyMapView />
      </div>
      <RegionDetailDrawer />
    </v-main>

    <!-- Care team dialog -->
    <v-dialog v-model="showCareTeam" max-width="440">
      <v-card>
        <v-card-title class="php-patient-headline d-flex align-center">
          <v-icon icon="mdi-account-group-outline" class="me-2" color="primary" />
          Care team
        </v-card-title>
        <v-divider />
        <v-list>
          <v-list-item
            v-for="member in store.patient.careTeam"
            :key="member.name"
            :title="member.name"
            :subtitle="`${member.role} · ${member.specialty}`"
          >
            <template #prepend>
              <v-avatar color="secondary" variant="tonal" size="40">
                <v-icon icon="mdi-account" />
              </v-avatar>
            </template>
          </v-list-item>
        </v-list>
        <v-card-actions>
          <v-spacer />
          <v-btn variant="text" @click="showCareTeam = false">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-app>
</template>

<style scoped>
.php-appbar {
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);
}
.php-main {
  background:
    radial-gradient(1200px 600px at 50% -10%, rgba(62, 142, 138, 0.06), transparent),
    rgb(var(--v-theme-background));
}

.php-content {
  transition: margin-right 240ms ease;
}

.php-content--shifted {
  margin-right: 440px;
}
</style>
