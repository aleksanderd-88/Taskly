<script lang="ts" setup>
import { computed, ref } from 'vue';
import { useDialogStore } from '@/modules/dialog/stores'
import { useRouter } from 'vue-router';
import { useUserStore } from '@/stores/user';
import { useConfirm } from 'primevue/useconfirm';
import AppLogo from '@/assets/logos/app_logo.png'
import { useAppStore } from '@/stores/app';
import { useToastStore } from '@/modules/toast/stores';

const dialogStore = useDialogStore()
const userStore = useUserStore()
const confirm = useConfirm()
const router = useRouter()
const appStore = useAppStore()
const toastStore = useToastStore()

const logout = () => {
  return confirm.require({
    message: 'Do you wish to logout?',
    header: 'Logout',
    icon: 'pi pi-info-circle',
    rejectProps: {
      label: 'Cancel',
      severity: 'secondary',
      outlined: true,
      size: 'small'
    },
    acceptProps: {
      label: 'Yes',
      severity: 'contrast',
      size: 'small'
    },
    accept: () => userStore.logoutUser()
  })
}

const buttons = ref([
  { 
    title: 'Taskly',
    src: AppLogo, 
    as: 'router-link',
    text: true,
    routeName: 'dashboard'
  },
  { 
    title: 'Search', 
    text: true,
    rounded: true,
    icon: 'pi pi-search',
    size: 'large',
    severity: 'contrast',
    backgroundColor: '--p-gray-700'
  },
  { 
    title: 'Create project', 
    rounded: true,
    icon: 'pi pi-plus',
    size: 'large',
    severity: 'success',
    command: () => dialogStore.setDialogVisibility(true)
  },
  { 
    title: 'Home', 
    rounded: true,
    icon: 'pi pi-home',
    severity: 'contrast',
    text: true,
    backgroundColor: '--p-stone-900',
    command: () => router.push({ name: 'projectList' })
  },
  { 
    title: 'Workspaces', 
    rounded: true,
    icon: 'pi pi-table',
    severity: 'contrast',
    text: true,
    backgroundColor: '--p-stone-900',
  },
  { 
    title: 'Mark favorite', 
    rounded: true,
    icon: 'pi pi-star',
    severity: 'contrast',
    text: true,
    backgroundColor: '--p-stone-900'
  },
  { 
    title: 'Add note', 
    rounded: true,
    icon: 'pi pi-file-edit',
    severity: 'contrast',
    text: true,
    backgroundColor: '--p-stone-900'
  },
  { 
    title: 'Add tag', 
    rounded: true,
    icon: 'pi pi-tag',
    severity: 'contrast',
    text: true,
    backgroundColor: '--p-stone-900'
  },
  { 
    title: 'Add member/s', 
    rounded: true,
    icon: 'pi pi-users',
    severity: 'contrast',
    text: true,
    backgroundColor: '--p-stone-900'
  },
  { 
    title: 'Trash bin', 
    rounded: true,
    icon: 'pi pi-trash',
    severity: 'contrast',
    text: true,
    backgroundColor: '--p-stone-900',
    command: () => router.push({ name: 'trashBin' })
  },
  { 
    title: 'Logout', 
    rounded: true,
    icon: 'pi pi-sign-out',
    size: 'large',
    severity: 'contrast',
    positionBottom: true,
    text: true,
    backgroundColor: '--p-stone-900',
    command: () => logout()
  },
  { 
    title: 'About', 
    rounded: true,
    icon: 'pi pi-info-circle',
    size: 'large',
    severity: 'contrast',
    text: true,
    backgroundColor: '--p-stone-900',
    command: () => getAppInfo()
  },
])

const appVersion = computed(() => appStore.version)

const getAppInfo = () => {
  toastStore.setToast({
    detail: `
      Taskly Version :: ${ import.meta.env.PACKAGE_VERSION }
      API Version :: ${ appVersion.value.apiVersion }
      Client Git :: ${ appVersion.value.client.slice(0, 7) }
      API Git :: ${ appVersion.value.api.slice(0, 7) }
    `,
    summary: '',
    severity: 'info',
    life: 10000
  })
}
</script>

<template>
  <aside class="sidebar">
    <main class="sidebar__content">
      <PButton
        class="sidebar__button"
        v-for="(button, index) 
        in buttons" 
        :key="index"
        v-tooltip="{ value: button.title }"
        :as="button.as"
        :text="button.text"
        :rounded="button.rounded"
        :icon="button.icon"
        :size="button.size"
        :severity="button.severity"
        :style="{ 
          color: 'var(--p-slate-50)', 
          backgroundColor: `var(${ button.backgroundColor })`,
          hover: {
            backgroundColor: `var(${ button.backgroundColor || '--p-stone-900' })`
          },
          marginTop: button.positionBottom ? 'auto' : ''
        }"
        :to="{ name: button.routeName }"
        @click.stop="typeof button.command === 'function' ? button.command() : {}"
      >
        <img 
          v-if="button.src"
          :src="button.src"
          alt="Button image"
        />
      </PButton>
    </main>
  </aside>
</template>

<style lang="scss" scoped>
  .sidebar {
    display: none;

    &__button {
      &:first-child {
        &:hover {
          background-color: var(--p-stone-900);
        }
      }
    }

    &__content {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1rem;
      height: 100%;
    }

    @media(min-width: 1024px) {
      width: 60px;
      height: 100%;
      position: fixed;
      left: 0;
      top: 0;
      padding: 1rem 0;
      display: block;
      background-color: var(--p-stone-900);
    }
  }
</style>