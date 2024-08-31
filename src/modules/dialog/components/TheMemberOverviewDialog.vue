<script lang="ts" setup>
import AppDialog from '@/common/components/AppDialog.vue';
import { computed, PropType, ref } from 'vue';
import { useDialogStore } from '../stores';
import { MemberType } from '@/types/project';
import { useUserStore } from '@/stores/user';
import { get } from 'lodash';

defineProps({
  members: {
    type: Array as PropType<MemberType[]>,
    default: () => ([])
  }
})

const dialogStore = useDialogStore()
const userStore = useUserStore()

const headerTitle = ref('Members')

const currentUser = computed(() => userStore.currentUser)
const dialogMode = computed(() => dialogStore.mode)
const dialogIsVisible = computed(() => dialogStore.dialogIsVisible && dialogMode.value === 'member-overview')
</script>

<template>
  <AppDialog
    :is-visible="dialogIsVisible"
    :header-title="headerTitle"
    dismissable-mask
    @close="dialogStore.setDialogVisibility(false)"
    :style="{ width: '400px' }"
  >
    <ul class="member-overview">
      <li class="member-overview__item">
        <i class="pi pi-user"></i>
        {{ get(currentUser, 'email', '') }}
        (Owner)
      </li>

      <li
        v-for="member in members"
        :key="member._id"
        class="member-overview__item"
      >
        <i class="pi pi-user"></i>
        <p>
          {{ member.email }}
        </p>

        <PButton
          class="member-overview__action-btn"
          icon="pi pi-trash"
          severity="secondary"
          aria-hidden="false"
          text
        />
      </li>
    </ul>
  </AppDialog>
</template>

<style lang="scss" scoped>
  .member-overview {
    list-style: none;
    padding: 0;

    &__item {
      display: flex;
      align-items: center;
      gap: .5rem;
      font-size: .8rem;

      &:first-child {
        color: #64748b;
      }
    }

    &__action-btn {
      margin-left: auto;
    }
  }
</style>