<script setup>
import AnatomyMap from './AnatomyMap.vue'
import AtAGlancePanel from './AtAGlancePanel.vue'
</script>

<template>
  <div class="php-page">
    <AtAGlancePanel class="php-left-panel" />

    <div class="php-right-section">
      <div class="text-center mb-2 php-headline">
        <h1 class="text-h4 font-weight-bold php-patient-headline mb-1">
          Your health, head to toe
        </h1>
        <p class="text-body-1 text-medium-emphasis">
          Select any part of the body to explore what's going on there.
        </p>
      </div>

      <div class="php-map-wrap-outer">
        <AnatomyMap />
      </div>
    </div>
  </div>
</template>

<style scoped>
.php-page {
  height: 100%;
  display: flex;
  align-items: stretch;
  gap: 40px;
  padding: 24px clamp(16px, 4vw, 48px);
  overflow: hidden;
}

.php-left-panel {
  flex: 0 0 380px;
  align-self: flex-start;
  /* Lines up with the head of the body, below the headline block. */
  margin-top: 84px;
}

.php-right-section {
  flex: 1 1 auto;
  min-width: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
}

.php-headline {
  flex: 0 0 auto;
}

.php-map-wrap-outer {
  flex: 1 1 auto;
  min-height: 0;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Below desktop widths there isn't room for a fixed side-by-side layout;
   stack instead and allow this section to scroll. */
@media (max-width: 900px) {
  .php-page {
    flex-direction: column;
    align-items: stretch;
    overflow-y: auto;
  }

  .php-left-panel {
    flex: 0 0 auto;
  }

  .php-map-wrap-outer {
    flex: 0 0 auto;
    height: 60vh;
  }
}
</style>
