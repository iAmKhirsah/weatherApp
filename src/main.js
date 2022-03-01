import Vue from "vue";
import app from "./app.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import "../src/assets/style.scss";

Vue.config.productionTip = false;

// Filters

Vue.filter("time", function (value) {
  const milliseconds = value * 1000;
  var date = new Date(milliseconds);
  return date.toLocaleString("en-GB", { weekday: "long", day: "2-digit" });
});

Vue.filter("probability", function (value) {
  if (value) return value + "% chance for rain";
  else return "";
});

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(app),
}).$mount("#app");
