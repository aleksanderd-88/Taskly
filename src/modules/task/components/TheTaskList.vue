<script lang="ts" setup>
import AppSection from '@/common/components/AppSection.vue';
import { ProjectType } from '@/types/project';
import { PropType, ref } from 'vue';

defineProps({
  project: {
    type: Object as PropType<ProjectType | null>,
    default: () => ({})
  }
})

const buttons = ref([
  { icon: 'pi-filter' },
  { icon: 'pi-sort-amount-down' },
  { icon: 'pi-table' },
  { icon: 'pi-ellipsis-h' },
])
</script>

<template>
  <AppSection v-if="project" class="task-list">
    <template #header>
      <h1>
        <i class="pi pi-book"></i>
        {{ project?.name }}
      </h1>

      <section>
        <p>0 tasks</p>

        <div>
          <PButton
            v-for="(button, index) in buttons"
            :key="index" 
            :icon="`pi ${ button.icon }`"
            text
            severity="secondary"
          />
        </div>
      </section>
    </template>
  </AppSection>
</template>

<style lang="scss" scoped>
  .task-list {
    height: 100vh;
    border-right: 1px solid #eee;

    h1 {
      display: flex;
      align-items: center;
      gap: .75rem;
      font-size: 1.75rem;
    }

    i {
      font-size: 1.5rem;
    }

    section {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;

      p {
        font-size: .9rem;
      }
    }
  }
</style>