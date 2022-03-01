import Vue from "vue";
import VueRouter from "vue-router";
import mainApp from "../views/mainApp.vue";
import favorites from '../views/favorites.vue'

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: mainApp,
  },
  {
    path: '/favorites',
    name: 'favorites',
    component: favorites,
  }
];

const router = new VueRouter({
  routes,
});

export default router;
