<script lang="ts" setup>
import { computed } from 'vue';
import { useLoaderStore } from '../store';

const loaderStore = useLoaderStore()

const isLoading = computed(() => loaderStore.isLoading)
</script>

<template>
  <div class="loader" v-if="isLoading">
    <div class="loader__dots"></div>
  </div>
</template>

<style lang="scss" scoped>
.loader {
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  right: 0;

  &__dots {
    width: 12px;
    aspect-ratio: 1;
    border-radius: 50%;
    background: #000;
    clip-path: inset(-220%);
    animation: l28 2s infinite linear;
  }

  @keyframes l28 {
    0% {
      box-shadow: 0 0 0 0, 40px 0, -40px 0, 0 40px, 0 -40px
    }

    10% {
      box-shadow: 0 0 0 0, 12px 0, -40px 0, 0 40px, 0 -40px
    }

    20% {
      box-shadow: 0 0 0 4px, 0px 0, -40px 0, 0 40px, 0 -40px
    }

    30% {
      box-shadow: 0 0 0 4px, 0px 0, -12px 0, 0 40px, 0 -40px
    }

    40% {
      box-shadow: 0 0 0 8px, 0px 0, 0px 0, 0 40px, 0 -40px
    }

    50% {
      box-shadow: 0 0 0 8px, 0px 0, 0px 0, 0 12px, 0 -40px
    }

    60% {
      box-shadow: 0 0 0 12px, 0px 0, 0px 0, 0 0px, 0 -40px
    }

    70% {
      box-shadow: 0 0 0 12px, 0px 0, 0px 0, 0 0px, 0 -12px
    }

    80% {
      box-shadow: 0 0 0 16px, 0px 0, 0px 0, 0 0px, 0 0px
    }

    90%,
    100% {
      box-shadow: 0 0 0 0, 40px 0, -40px 0, 0 40px, 0 -40px
    }
  }
}
</style>