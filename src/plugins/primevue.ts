import PrimeVue from 'primevue/config';
import { App } from 'vue';

import FloatLabel from 'primevue/floatlabel';
import InputText from 'primevue/inputtext';

export default {
  install: (app: App) => {
    app.use(PrimeVue)

    app.component('FloatLabel', FloatLabel)
    app.component('InputText', InputText)
  }
}