# BRIEF: Patient Health Story (Head-to-Toe View)

## Overview
An interactive, spatial data story that lets a patient — and their
physician — explore the patient's full health picture head-to-toe,
instead of scrolling through chronological records.

## Target Users
- **Primary**: patients reviewing and understanding their own health
- **Secondary**: physicians using it as a conversation aid during visits

## Problem Statement
Patient portals present health data as flat lists and timelines.
Nobody — patient or physician — gets a whole-body picture at a glance,
and patients in particular struggle to connect data to their own body.

## Core Capabilities
- Interactive body map with selectable regions (head, chest, abdomen,
  limbs, etc.)
- Region detail panel: conditions, medications, and recent labs/vitals
  tied to that region
- Timeline toggle: see how a region's story evolved over time
- Plain-language / clinical-language mode toggle
- Care-team notes and attention flags per region

## Key User Flows
1. Land on full-body view with all systems visible at once
2. Tap a region (e.g., cardiovascular) → detail drawer expands
3. Toggle the timeline to see history for that region
4. Switch between patient-friendly and clinical language modes

## Visual Direction
- Warm, human, approachable — deliberately calmer than a clinical chart
- Anatomical illustration as the centerpiece; Vuetify components for
  supporting panels and navigation
- Color-coded flags, but softened rather than alarming (no harsh reds)

## Success Criteria
- Patient can locate and understand a specific condition in 3 taps or fewer
- Physician can get whole-patient context before entering the exam room
- Works well on a tablet, since it's intended for in-room use

## Out of Scope
- Real EHR/FHIR integration
- Diagnostic logic, prescribing, or care recommendations
