import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    citylist: [],
    nowplaying: [],
    comingsoon: [],
    nowplayingtotal: 0
  },
  mutations: {
    citylistmutation(state, data) {
      state.citylist = data;
    },
    nowplayinglistmutation(state, data, total) {
      state.nowplaying = data;
      state.nowplayingtotal = total;
    }
  },
  actions: {
    getcitylist(context) {
      axios({
        url: "https://m.maizuo.com/gateway?k=8905830",
        headers: {
          "X-Client-Info":
            '{"a":"3000","ch":"1002","v":"5.0.4","e":"1597891197669520976936963"}',
          "X-Host": "mall.film-ticket.city.list"
        }
      }).then(res => {
        //获取城市列表
        // console.log(res.data.data.cities);
        // console.log(this.datalist);
        // console.log(this.hotlist);
        context.commit("citylistmutation", res.data.data.cities);
      });
    },
    getnowplayinglist(context) {
      var cityId = sessionStorage.getItem("cityId");
      axios({
        url: `https://m.maizuo.com/gateway?cityId=${cityId}&pageNum=1&pageSize=10&type=1&k=7301642`,
        headers: {
          "X-Client-Info":
            '{"a":"3000","ch":"1002","v":"5.0.4","e":"1597891197669520976936963","bc":"110100"}',
          "X-Host": "mall.film-ticket.film.list"
        }
      }).then(res => {
        // console.log(res.data.data.films);

        context.commit(
          "nowplayinglistmutation",
          res.data.data.films,
          res.data.data.total
        );
      });
    }
  },
  modules: {}
});
