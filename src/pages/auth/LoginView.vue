<script lang="ts" setup>
import AppForm from '@/common/components/AppForm.vue'
import { reactive } from 'vue'
import { fieldIsEmpty } from '@/libs'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user';

const router = useRouter()
const userStore = useUserStore()

const initialValues = {
  email: null,
  password: null
}

const input = reactive({ ...initialValues })

const login = async () => {
  if ( fieldIsEmpty(input) ) return

  const userIsCreated = await userStore.authUser({ data: input })
  if ( !userIsCreated ) return
  
  router.replace({ name: 'dashboard' })
}
</script>

<template>
  <div class="base-layout base-layout--center-content">
    <main class="base-layout__content">
      <AppForm @on-submit="login()">
        <h1>Log in</h1>

        <FloatLabel>
          <InputText id="email" v-model="input.email" />
          <label for="email">Email</label>
        </FloatLabel>

        <FloatLabel>
          <InputPassword id="password" v-model="input.password" toggleMask :feedback="false" />
          <label for="password">Password</label>
        </FloatLabel>

        <PButton label="Proceed" type="submit" severity="contrast" />

        <template #footer>
          <p :style="{ fontSize: '.8rem'}">
            Don't have an account?
            <router-link :style="{ color: '#222' }" :to="{ name: 'signup' }">Sign up</router-link>
          </p>
        </template>
      </AppForm>
    </main>
  </div>
</template>

