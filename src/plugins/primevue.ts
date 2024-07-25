import PrimeVue from 'primevue/config';
import { App } from 'vue';

export default {
  install: (app: App) => {
    app.use(PrimeVue)
  }
}