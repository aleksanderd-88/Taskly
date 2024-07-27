<script lang="ts" setup>
import AppForm from '@/common/components/AppForm.vue';
import { useUserStore } from '@/stores/user';
import { UserType } from '@/types/user';
import { get, pick } from 'lodash';
import { computed, ref, watch } from 'vue';


const userStore = useUserStore()

const verificationCode = ref('')

const currentUser = computed(() => userStore.currentUser)

const verifyUser = async () => {
  const data = pick(get(currentUser, 'value', null), ['email', 'password']) as UserType
  await userStore.authUser({ data })
}

watch(() => verificationCode.value.length, value => {
  if ( value === 4 )
    verifyUser()
})
</script>

<template>
  <div class="base-layout base-layout--center-content">
    <main class="base-layout__content">
      <AppForm @on-submit="">
        <h1>Verify account</h1>
        <p>Please enter the 4-digit code sent to your e-mail address.</p>
        <InputOtp v-model="verificationCode" integer-only />
        <PButton label="Resend code" severity="info" />
      </AppForm>
    </main>
  </div>
</template>