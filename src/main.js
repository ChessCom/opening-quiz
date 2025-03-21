import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "../src/style/style.css";
import "../src/style/fonts.css";
import { MotionPlugin } from '@vueuse/motion'

const app = createApp(App);
app.use(MotionPlugin);
app.use(router);
app.mount("#app");
