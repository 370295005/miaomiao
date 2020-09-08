<template>
  <div id="main">
    <Header title="喵喵电影"></Header>

    <div id="content">
      <div class="movie_menu">
        <router-link tag="div" to="/city" class="city_name">
          <keep-alive>
            <span>{{ this.name }}</span>
          </keep-alive>

          <i class="iconfont">&#xe502;</i>
        </router-link>
        <div class="hot_swtich">
          <router-link tag="div" to="/movie/nowplaying" class="hot_item">正在热映</router-link>
          <router-link tag="div" to="/movie/comingsoon" class="hot_item">即将上映</router-link>
        </div>
        <router-link tag="div" to="/movie/search" class="search_entry">
          <i class="iconfont icon-sousuo"></i>
        </router-link>
      </div>
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </div>

    <Tabbar></Tabbar>
  </div>
</template>

<script>
import Header from "@/components/Header";
import Tabbar from "@/components/Tabbar";
import axios from "axios";
export default {
  name: "Movie",
  data() {
    return {
      name: "正在定位",
      ip: ""
    };
  },
  components: {
    Header,
    Tabbar
  },
  created() {},
  beforeMount() {
    //获取ip
    this.ip = localStorage.getItem("Ip");
    // console.info(this.ip);
    // 使用定位获取用户位置
    axios({
      url: `/ip?key=3ONBZ-GRALP-OZSD3-LGKMV-B47BV-2EF5L&ip=${this.ip}`
    })
      .then(res => {
        console.log(res.data.result.ad_info.city);
        this.name = res.data.result.ad_info.city;
        console.log(this.name);
      })
      .catch(res => {
        console.log(res);
      });
  },
  mounted() {},
  updated() {
    this.name = sessionStorage.getItem("cityName");
  },
  beforeDestroy() {
    sessionStorage.setItem("cityName",name)
  },
};
</script>
<style>
#content .movie_menu {
  width: 100%;
  height: 45px;
  border-bottom: 1px solid #e6e6e6;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: white;
  z-index: 10;
}
.movie_menu .city_name {
  margin-left: 20px;
  height: 100%;
  line-height: 45px;
  font-size: 14px;
}

.movie_menu .city_name.router-link-active {
  color: #ef4238;
  border-bottom: 2px #ef4238 solid;
}
.movie_menu .hot_swtich {
  display: flex;
  height: 100%;
  line-height: 45px;
}
.movie_menu .hot_item {
  font-size: 15px;
  color: #666;
  width: 80px;
  text-align: center;
  margin: 0 12px;
  font-weight: 700;
}
.movie_menu .hot_item.router-link-active {
  color: #ef4238;
  border-bottom: 2px #ef4238 solid;
}
.movie_menu .search_entry {
  margin-right: 20px;
  height: 100%;
  line-height: 45px;
}
.movie_menu .search_entry.router-link-active {
  color: #ef4238;
  border-bottom: 2px #ef4238 solid;
}
.movie_menu .search_entry i {
  font-size: 24px;
  color: red;
}
</style>
