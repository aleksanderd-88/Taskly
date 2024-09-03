<script lang="ts" setup></script>

<template>
  <div class="app-section">
    <header class="app-section__header">
      <slot name="header" />
    </header>

    <main class="app-section__content">
      <slot name="content" />
    </main>

    <footer class="app-section__footer">
      <slot name="footer" />
    </footer>
  </div>
</template>

<style lang="scss" scoped>
  .app-section {
    display: flex;
    flex-direction: column;
    gap: 1rem;

    &__header {
      height: 190px;
      padding: 1rem;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      border-bottom: 1px solid #eee;
    }

    &__content {
      padding: 0 1rem;
    }

    &__footer {
      display: flex;
      align-items: center;
      padding: 0 1rem;
    }
  }
</style>