<script lang="ts" setup>
import AppForm from '@/common/components/AppForm.vue';
import { useUserStore } from '@/stores/user';
import { ref, watch } from 'vue';


const userStore = useUserStore()

const verificationCode = ref('')
const verificationStep = ref(1)

const verifyUser = async () => {
  try {
    await userStore.authUser({ data: { otp: verificationCode.value } })
    verificationStep.value = 2
  } catch (error) {
    // Do nothing
  }
}

watch(() => verificationCode.value.length, value => {
  if ( value === 4 )
    verifyUser()
})
</script>

<template>
  <div class="base-layout base-layout--center-content">
    <main class="base-layout__content">
      <AppForm @on-submit="" v-if="verificationStep === 1">
        <h1>Verify account</h1>
        <p>Please enter the 4-digit code that was sent to your e-mail address.</p>
        <InputOtp v-model="verificationCode" integer-only />
        <PButton label="Resend code" severity="info" />
      </AppForm>

      <div :style="{ width: '100%', maxWidth: '350px', margin: 'auto' }" v-if="verificationStep === 2">
        <h1>Verification complete</h1>
        <PButton 
          label="Log in" 
          severity="info"
          :style="{ marginTop: '2rem' }"
          @click="$router.push({ name: 'login' })"
        />
      </div>
    </main>
  </div>
</template>