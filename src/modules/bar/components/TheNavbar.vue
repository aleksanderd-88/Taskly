<script lang="ts" setup></script>

<template>
  <nav class="navbar">
    <main class="navbar__content">
      <router-link to="/">
        <img src="@/assets/logos/app_logo.png" alt="Logo image" class="navbar__logo">
      </router-link>
    </main>
  </nav>
</template>

<style lang="scss" scoped>
  .navbar {
    box-shadow: 0 8px 12px rgba(#000, .1);
    
    &__content {
      height: 60px;
      padding: 0 1rem;
      display: flex;
      align-items: center;
    }

    &__logo {
      width: 45px;
    }
  }
</style>