// Shared, softened flag vocabulary used across the map and detail panels.
export const FLAG_META = {
  attention: {
    color: 'flag-attention',
    icon: 'mdi-alert-circle-outline',
    patientLabel: 'Needs attention',
    clinicalLabel: 'Action needed',
  },
  watch: {
    color: 'flag-watch',
    icon: 'mdi-eye-outline',
    patientLabel: 'Keeping an eye on it',
    clinicalLabel: 'Monitoring',
  },
  stable: {
    color: 'flag-stable',
    icon: 'mdi-check-circle-outline',
    patientLabel: 'Doing well',
    clinicalLabel: 'Stable',
  },
}

export function flagMeta(flag) {
  return FLAG_META[flag] || null
}

export function flagLabel(flag, isClinical) {
  const meta = FLAG_META[flag]
  if (!meta) return ''
  return isClinical ? meta.clinicalLabel : meta.patientLabel
}

// Status coloring for a single lab/vital value.
export function measurementColor(status) {
  switch (status) {
    case 'high':
    case 'low':
      return 'flag-attention'
    case 'normal':
      return 'flag-stable'
    default:
      return 'secondary'
  }
}

export function formatDate(iso) {
  if (!iso) return ''
  const d = new Date(iso)
  return d.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}
