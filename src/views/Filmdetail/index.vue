<template>
  <div class="main" v-if="filminfo">
    <div class="film">
      <div class="film-header">
        <span class="goback iconfont">&#xe601;</span>
        <div class="title">{{filminfo.name}}</div>
      </div>
      <div class="film-poster">
        <div class="padding"></div>
        <img :src="filminfo.poster" alt />
      </div>
      <div class="film-detail">
        <div class="col">
          <div class="film-name">
            <span class="name">{{filminfo.name}}</span>
            <span class="item">{{filminfo.filmType.name}}</span>
          </div>
          <div class="film-grade"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      filminfo: ""
    };
  },
  created() {
    axios({
      url: `https://m.maizuo.com/gateway?filmId=${this.$router.history.current.params.id}&k=9959439`,
      headers: {
        "X-Client-Info":
          '{"a":"3000","ch":"1002","v":"5.0.4","e":"1600130177477424269656065","bc":"440300"}',
        "X-Host": "mall.film-ticket.film.info"
      }
    }).then(res => {
      console.log(res.data.data.film);
      this.filminfo = res.data.data.film;
    });
  }
};
</script>

<style scoped>
.main {
  width: 100%;
  height: 100%;
}
div{
  box-sizing: border-box;
}
.film .film-header {
  position: fixed;
  background-color: hsla(0, 0%, 100%, 0);
  -webkit-transition: all 0.3s ease;
  -o-transition: all 0.3s ease;
  transition: all 0.3s ease;
  width: 100vw;
  height: 44px;
  z-index: 1;
}
.film .film-header .goback {
  height: 30px;
  position: absolute;
  line-height: 44px;
  left: 10px;
}
.film .film-header .title {
  height: 44px;
  background-color: #fff;
  line-height: 40px;
  font-size: 16px;
  text-align: center;
}
.film .film-poster img {
  width: 100%;
  position: absolute;
  transform: translateY(-50%);
  -ms-transform: translateY(-50%);
  -moz-transform: translateY(-50%);
  -webkit-transform: translateY(-50%);
  -o-transform: translateY(-50%);
}
.film .film-detail {
  padding: 15px;
  padding-top: 12px;
  background-color: #fff;
}
.film .film-detail .col {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: start;
  -ms-flex-pack: start;
  justify-content: flex-start;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
}
.film .film-detail .film-name {
  width: 256px;
}
.film .film-detail .film-name span {
  vertical-align: middle;
}
.film .film-detail .film-name .name {
  color: #191a1b;
  font-size: 18px;
  height: 24px;
  line-height: 24px;
  margin-right: 7px;
}
.film .film-detail .film-name .item {
  font-size: 9px;
  color: #fff;
  background-color: #d2d6dc;
  height: 14px;
  line-height: 14px;
  padding: 0 2px;
  border-radius: 2px;
  display: inline-block;
}
</style>