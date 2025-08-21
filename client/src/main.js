import { createApp } from "vue";
import App from "./App.vue";
import router from "./router/index.js";

createApp(App)
  .use(router)  // ✅ This must be here
  .mount("#app");
