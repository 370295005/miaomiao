import Vue from "vue";
import VueRouter from "vue-router";
import movierouter from "./movie";
import minerouter from "./mine";
import cinemarouter from "./cinema";
import cityrouter from "./city";
import Filmdetail from "@/views/Filmdetail"

Vue.use(VueRouter);

const routes = [
  movierouter,
  minerouter,
  cinemarouter,
  cityrouter,
  {
    path: "/",
    redirect: "/movie"
  },
  {
    path: "/filmdetail/:id",
    name:'film',
    component: Filmdetail
  }
];

const router = new VueRouter({
  mode: "hash",
  base: process.env.BASE_URL,
  routes
});

export default router;
