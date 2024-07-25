<script lang="ts" setup>
import AppForm from '@/common/components/AppForm.vue'
import { reactive } from 'vue'
import { fieldIsEmpty } from '@/libs'

const initialValues = {
  username: null,
  email: null,
  password: null,
  verifiedPassword: null
}

const input = reactive({ ...initialValues })

const login = () => {
  if ( fieldIsEmpty(input) ) return
  console.log({ ...input });
}
</script>

<template>
  <div class="base-layout base-layout--center-content">
    <main class="base-layout__content">
      <AppForm @on-submit="login()">
        <h1>Sign up</h1>

        <FloatLabel>
          <InputText id="username" v-model="input.username" />
          <label for="username">Username (Required)</label>
        </FloatLabel>

        <FloatLabel>
          <InputText id="email" v-model="input.email" />
          <label for="email">Email (Required)</label>
        </FloatLabel>

        <FloatLabel>
          <InputPassword id="password" v-model="input.password" toggleMask />
          <label for="password">Password (Required)</label>
        </FloatLabel>

        <FloatLabel>
          <InputPassword id="verifiedPassword" v-model="input.verifiedPassword" toggleMask :feedback="false" />
          <label for="verifiedPassword">Verify password (Required)</label>
        </FloatLabel>

        <PButton label="Create account" type="submit" severity="contrast" />

        <template #footer>
          <p :style="{ fontSize: '.8rem'}">
            Already have an account?
            <router-link :style="{ color: '#222' }" :to="{ name: 'login' }">Log in</router-link>
          </p>
        </template>
      </AppForm>
    </main>
  </div>
</template>

