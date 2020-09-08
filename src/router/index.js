import Vue from "vue";
import VueRouter from "vue-router";
import movierouter from "./movie";
import minerouter from "./mine";
import cinemarouter from "./cinema";
import cityrouter from "./city";
Vue.use(VueRouter);

const routes = [
  movierouter,
  minerouter,
  cinemarouter,
  cityrouter,
  {
    path: "/",
    redirect: "/movie"
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
