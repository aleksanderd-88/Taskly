<script lang="ts" setup>
import { ProjectType } from '@/types/project';
import { get } from 'lodash';
import { computed, PropType, ref } from 'vue';

const props = defineProps({
  project: {
    type: Object as PropType<ProjectType>,
    default: () => ({})
  }
})

const maxRenderedMemberCount = ref(3)

const memberCount = computed(() => get(props, 'project.members', []).length)
</script>

<template>
  <AvatarGroup v-if="memberCount">
    <PrimeAvatar
      v-for="(index) in memberCount"
      :key="index"
      size="small"
      shape="circle"
      icon="pi pi-user"
      v-show="index <= maxRenderedMemberCount"
    />

    <PrimeAvatar
      v-if="memberCount > maxRenderedMemberCount"
      :label="`+${memberCount - maxRenderedMemberCount}`"
      size="small"
      shape="circle" 
    />
  </AvatarGroup>
</template>