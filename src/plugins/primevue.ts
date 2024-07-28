import PrimeVue from 'primevue/config';
import type { App } from 'vue';
import Aura from '@primevue/themes/aura';

import FloatLabel from 'primevue/floatlabel';
import InputText from 'primevue/inputtext';
import Password from 'primevue/password';
import Button from 'primevue/button';
import InputOtp from 'primevue/inputotp';
import Toast from 'primevue/toast';
import ToastService from 'primevue/toastservice';

export default {
  install(app: App) {
    app.use(PrimeVue, {
      theme: {
        preset: Aura,
        options: {
          darkModeSelector: '',
        }
      }
    })

    app.use(ToastService)

    app.component('FloatLabel', FloatLabel)
    app.component('InputText', InputText)
    app.component('InputPassword', Password)
    app.component('PButton', Button)
    app.component('InputOtp', InputOtp)
    app.component('PrimeToast', Toast)
  }
}