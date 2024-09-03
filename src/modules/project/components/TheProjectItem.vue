<script lang="ts" setup>
import { type PropType } from 'vue'
import { ProjectType } from '@/types/project'
import get from 'lodash/get'
import { TaskType } from '@/types/task'
import AppMemberAvatarGroup from '@/common/components/AppMemberAvatarGroup.vue';

const props = defineProps({
  project: {
    type: Object as PropType<ProjectType>,
    default: () => ({})
  }
})

const getTaskStatusCount = (value: 'Scheduled' | 'Ongoing' | 'Completed') => {
  return get(props, 'project.tasks', []).filter((task: TaskType) => task['status'] === value).length
}
</script>

<template>
  <router-link
    class="project-item"
    :to="{ name: 'projectOverview', params: { id: get(project, '_id', null) }}"
    v-if="project"
  >
    <header class="project-item__header">
      <h1 class="project-item__name">{{ get(project, 'name', '') }}</h1>
      <p class="project-item__description">
        {{ get(project, 'description', '') || 'Description (Optional)' }}
      </p>
    </header>

    <main class="project-item__content">
      <div class="project-item__detail">
        <h2>{{ getTaskStatusCount('Scheduled') }}</h2>
        <p>Scheduled</p>
      </div>

      <div class="project-item__detail">
        <h2>{{ getTaskStatusCount('Ongoing') }}</h2>
        <p>Ongoing</p>
      </div>

      <div class="project-item__detail">
        <h2>{{ getTaskStatusCount('Completed') }}</h2>
        <p>Completed</p>
      </div>
    </main>

    <footer class="project-item__footer">
      <AppMemberAvatarGroup :project="project" />
    </footer>
  </router-link>
</template>

<style lang="scss" scoped>
  .project-item {
    padding: 1rem 1.5rem ;
    border-radius: 5px;
    width: 300px;
    height: 300px;
    text-decoration: none;
    background-color: #F7F7F7;
    border: 1px solid #eee;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
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

    &__content {
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-wrap: wrap;

      p {
        font-size: .8rem;
      }
    }

    &__footer {
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
  }
</style>