import "@/assets/scss/style.scss";

import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "virtual:svg-icons-register";

import SvgIcon from "@/components/SvgIcon.vue";
import "@/vendor/index";

const app = createApp(App);
app.component("SvgIcon", SvgIcon);

// app.use(router);

app.mount("#app");
