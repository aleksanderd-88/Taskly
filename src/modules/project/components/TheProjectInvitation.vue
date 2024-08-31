<script lang="ts" setup>
import { useProjectStore } from '@/stores/project';
import { get } from 'lodash';
import moment from 'moment';
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const projectStore = useProjectStore()
const route = useRoute()
const router = useRouter()

const project = computed(() => projectStore.project)

const closeBrowserWindow = () => {
  window.close()
}

const joinProject = async () => {
  await projectStore.verifyMember({ data: { token: get(route, 'params.token', '') as string } })
  router.push({ name: 'start' })
}
</script>

<template>
  <PrimeCard
    :style="{
      width: '25rem',
      overflow: 'hidden',
      margin: 'auto'
    }"
    v-if="project"
    >
    <template #header>
      <img :style="{
        width: '100%',
        display: 'block',
        height: '200px',
        objectFit: 'contain'
      }" alt="user header" src="/src/assets/images/invitation-min.png" />
    </template>

    <template #title>{{ get(project, 'name', '') }}</template>

    <template #subtitle>You have been invited to join {{ get(project, 'name', '') }}</template>

    <template #content>
      <p>
        Project members
        <span>
          {{ get(project, 'members', []).length || '-' }}
        </span>
      </p>

      <p>
        Project created
        <span>
          {{ moment(get(project, 'createdAt', '')).format('YYYY-MM-DD') }}
        </span>
      </p>
    </template>

    <template #footer>
      <div
        :style="{
          display: 'flex',
          alignItems: 'center',
          gap: '.5rem'
        }"
      >
      <PButton label="Cancel" severity="secondary" outlined @click="closeBrowserWindow()" />
      <PButton label="Join project" @click="joinProject()" />
      </div>
    </template>
  </PrimeCard>
</template>

<style lang="scss" scoped>
  p {
    margin: 0 0 1rem;
    font-size: .8rem;

    span {
      display: block;
    }
  }
</style>