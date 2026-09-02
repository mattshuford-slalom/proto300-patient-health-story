# PLAN: Patient Health Story

## Tech Stack
- Vue 3 (Composition API)
- Vuetify 3
- Custom SVG-based interactive body map (clickable/tappable regions)
- Pinia for state (selected region, view mode)
- Mock JSON patient record

## Information Architecture
- Single-page shell with a persistent header (patient name, mode toggle)
- Central body map with a right-side detail drawer (`v-navigation-drawer`)
- Timeline as an expandable panel / `v-bottom-sheet` off the detail drawer

## Component Structure
- `AppShell.vue`
- `BodyMapView.vue`
  - `AnatomyMap.vue` — SVG regions with hover/tap states
  - `RegionSummaryChips.vue` — floating flag indicators per region
- `RegionDetailDrawer.vue`
  - `ConditionList.vue`
  - `MedicationList.vue`
  - `VitalsLabsSnapshot.vue`
  - `RegionTimeline.vue`
- `ModeToggle.vue` — patient vs. clinical language

## Data Model (mock)
- `patient.json` — demographics, care team
- `regions.json` — regionId, label, SVG path reference
- `conditions.json` — regionId, name, patientLabel, clinicalLabel, status,
  onsetDate
- `vitals.json` / `labs.json` — regionId, metric, value, date, normalRange
- `timelineEvents.json` — regionId, date, eventType, description

## Visual System
- **Typography**: a rounded/humanist headline face for patient mode
  (`text-h4`/`text-h5`); clinical mode reverts to the standard Vuetify
  type scale
- **Spacing**: generous whitespace around the body map; 8px grid inside
  the detail drawer
- **Color**: desaturated teal/blue base palette; flags use muted
  amber/coral rather than saturated red
- **Motion**: 200–300ms ease transitions on region selection/highlight

## Build Phases
1. Static SVG body map with selectable regions
2. Mock data layer + Pinia store
3. Region detail drawer wired to selection
4. Timeline view + patient/clinical mode toggle
5. Tablet-first responsive/polish pass

## Milestones
- **M1** — Body map renders with selectable regions
- **M2** — Detail drawer shows mock data per selected region
- **M3** — Mode toggle and timeline fully functional
