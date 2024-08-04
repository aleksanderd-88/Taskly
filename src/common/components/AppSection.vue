<script lang="ts" setup></script>

<template>
  <div class="app-section">
    <header class="app-section__header">
      <slot name="header" />
    </header>

    <main class="app-section__content">
      <slot name="content" />
    </main>
  </div>
</template>

<style lang="scss" scoped>
  .app-section {
    &__header {
      height: 130px;
      padding: 1rem;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      border-bottom: 1px solid #eee;
    }
  }
</style>