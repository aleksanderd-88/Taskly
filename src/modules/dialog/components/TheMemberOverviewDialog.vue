<script lang="ts" setup>
import AppDialog from '@/common/components/AppDialog.vue';
import { computed, PropType, ref } from 'vue';
import { useDialogStore } from '../stores';
import { MemberType } from '@/types/project';

defineProps({
  members: {
    type: Array as PropType<MemberType[]>,
    default: () => ([])
  }
})

const dialogStore = useDialogStore()
const headerTitle = ref('Members')

const dialogMode = computed(() => dialogStore.mode)
const dialogIsVisible = computed(() => dialogStore.dialogIsVisible && dialogMode.value === 'member-overview')
</script>

<template>
  <AppDialog
    :is-visible="dialogIsVisible"
    :header-title="headerTitle"
    dismissable-mask
    @close="dialogStore.setDialogVisibility(false)"
  >
    <ul class="member-overview">
      <li
        v-for="member in members"
        :key="member._id"
        class="member-overview__item"
      >
        <i class="pi pi-user"></i>
        <p>
          {{ member.email }}
        </p>
      </li>
    </ul>
  </AppDialog>
</template>