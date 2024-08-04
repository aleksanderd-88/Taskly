<script lang="ts" setup>
import { type PropType } from 'vue'
import { ProjectType } from '@/types/project'
import get from 'lodash/get'

defineProps({
  project: {
    type: Object as PropType<ProjectType>,
    default: () => ({})
  }
})

</script>

<template>
  <router-link
    class="project-item"
    to="/"
  >
    <header class="project-item__header">
      <h1 class="project-item__name">{{ get(project, 'name', '') }}</h1>
      <p class="project-item__description">
        {{ get(project, 'description', 'This is where the description about the project is shown.') }}
      </p>
    </header>

    <footer class="project-item__footer">
      <AvatarGroup v-if="get(project, 'members', []).length">
        <PrimeAvatar
          v-for="(index) in get(project, 'members', []).length"
          :key="index"
          size="small"
          shape="circle"
          icon="pi pi-user"
          v-show="index <= 5"
        />
        <PrimeAvatar :label="`+${get(project, 'members', []).length}`" size="small"
        shape="circle" />
      </AvatarGroup>

      <PButton
        class="project-item__options"
        icon="pi pi-ellipsis-v" 
        severity="secondary" 
        aria-label="Options"
        size="small"
      />
    </footer>
  </router-link>
</template>

<style lang="scss" scoped>
  .project-item {
    padding: 1rem;
    border-radius: 5px;
    width: 300px;
    height: 300px;
    text-decoration: none;
    background-color: #F7F7F7;
    border: 1px solid #eee;
    display: flex;
    flex-direction: column;
    color: var(--p-slate-900);

    &__header {
      display: flex;
      flex-direction: column;
    }

    &__description {
      font-size: .8rem;
      margin-top: .5rem;
      width: 80%;
    }
    
    &__name {
      font-size: 1.25rem;
    }

    &__footer {
      margin-top: auto;
      display: flex;
      align-items: center;
    }

    &__member-count {
      font-size: .8rem;

      span {
        display: block;
        font-weight: 900;
        font-size: 1rem;
      }
    }

    &__options {
      margin-left: auto;
    }
  }
</style>