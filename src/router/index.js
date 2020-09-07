import Vue from "vue";
import VueRouter from "vue-router";
import movierouter from "./movie";
import minerouter from "./mine";
import cinemarouter from "./cinema";


Vue.use(VueRouter);

const routes = [movierouter, minerouter, cinemarouter, {
  path: '/',
  redirect: '/movie'
}];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
