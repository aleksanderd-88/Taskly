<script lang="ts" setup></script>

<template>
  <form class="form" @submit.prevent="$emit('on-submit')">
    <slot />
    <slot name="footer" />
  </form>
</template>

<style lang="scss" scoped>
  .form {
    gap: 2rem;
    display: flex;
    flex-direction: column;
    width: 100%;
    margin: auto;

    @media(min-width: 400px) {
      width: 350px;
    }
  }
</style>