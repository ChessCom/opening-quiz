import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "../src/style/style.css";
import "../src/style/fonts.css";
import { MotionPlugin } from "@motionone/vue";

const app = createApp(App);
app.use(MotionPlugin);
app.use(router);
app.mount("#app");
