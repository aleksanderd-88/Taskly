<script lang="ts" setup>
import AppForm from '@/common/components/AppForm.vue';
import { useUserStore } from '@/stores/user';
import { ref, watch } from 'vue';


const userStore = useUserStore()

const verificationCode = ref('')
const verificationStep = ref(1)
const email = ref('')

const verifyUser = async () => {
  try {
    await userStore.authUser({ data: { otp: verificationCode.value } })
    verificationStep.value = 2
  } catch (error) {
    // Do nothing
  }
}

const sendOtp = async () => {
  try {
    if ( !email.value ) return

    const response = await userStore.resendOtp({ data: { email: email.value } })
    if ( response?.status !== 200 ) return

    verificationStep.value = 1
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
        <PButton label="Resend code" severity="info" @click.stop="verificationStep = 3" />
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

      <AppForm v-if="verificationStep === 3" @on-submit="sendOtp()">
        <h1>Resend one time password</h1>
        <p>Enter the email address you specified during signup.</p>
        <InputText v-model="email" />
        <PButton label="Send" severity="info" type="submit" />
      </AppForm>
    </main>
  </div>
</template>