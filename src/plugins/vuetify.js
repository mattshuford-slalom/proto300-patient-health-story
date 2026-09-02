import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'
import { createVuetify } from 'vuetify'
import { aliases, mdi } from 'vuetify/iconsets/mdi'

// Warm, calm, deliberately non-clinical palette (desaturated teal/blue base,
// softened amber/coral flags instead of harsh reds).
const patientHealthLight = {
  dark: false,
  colors: {
    background: '#F5F3EE',
    surface: '#FFFFFF',
    'surface-variant': '#ECEAE3',
    primary: '#3E8E8A',
    secondary: '#5B7B9A',
    accent: '#C98B6B',
    'flag-attention': '#D9A05B',
    'flag-watch': '#C98B6B',
    'flag-stable': '#7FA88A',
    info: '#5B7B9A',
    success: '#7FA88A',
    warning: '#D9A05B',
    error: '#C97C6B',
    'on-surface': '#33352F',
    'on-background': '#33352F',
  },
}

// Calm, warm dark variant — deep teal-tinted charcoals, same softened flags.
const patientHealthDark = {
  dark: true,
  colors: {
    background: '#1A1F1E',
    surface: '#242B29',
    'surface-variant': '#2E3634',
    primary: '#5FB3AE',
    secondary: '#8AA7C2',
    accent: '#D8A585',
    'flag-attention': '#E0AE6C',
    'flag-watch': '#D8A585',
    'flag-stable': '#8FC0A2',
    info: '#8AA7C2',
    success: '#8FC0A2',
    warning: '#E0AE6C',
    error: '#DB9182',
    'on-surface': '#ECEFEC',
    'on-background': '#ECEFEC',
  },
}

export default createVuetify({
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: { mdi },
  },
  theme: {
    defaultTheme: 'patientHealthDark',
    themes: { patientHealthLight, patientHealthDark },
  },
  defaults: {
    VCard: { rounded: 'lg' },
    VBtn: { rounded: 'lg' },
    VChip: { rounded: 'lg' },
  },
})
