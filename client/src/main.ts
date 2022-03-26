import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { clickOutside } from "./directives";

const app = createApp(App);
app.directive("clickOutside", clickOutside);

app.use(router);
app.use(store);

app.mount("#app");
