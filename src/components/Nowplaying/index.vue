<template>
  <div class="movie_body">
    <ul>
      <li v-for="data in filmlist" :key="data.filmId">
        <div class="pic_show">
          <img :src="data.poster" />
        </div>
        <div class="info_list">
          <h2>{{data.name}}</h2>
          <p >
            观众评分
            <span class="grade" v-if="data.grade">{{data.grade}}</span>
            <span v-else>暂无</span>
          </p>
          <p>主演: {{data.actors}}</p>
          <p>{{data.nation}} | {{data.runtime}}分钟</p>
        </div>
        <div class="btn_mall">购票</div>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from "axios";
// import { InfiniteScroll } from "mint-ui";
// Vue.use(InfiniteScroll);

export default {
  name: "Nowplaying",
  data() {
    return {
      cityId: "",
      filmlist: []
    };
  },
  created() {
    // this.$set(this.cityId,sessionStorage.getItem("cityId"))
    this.cityId = sessionStorage.getItem("cityId");
  },
  beforeMount() {
     
    axios({
      url: `https://m.maizuo.com/gateway?cityId=${this.cityId}&pageNum=1&pageSize=10&type=1&k=7301642`,
      headers: {
        "X-Client-Info":
          '{"a":"3000","ch":"1002","v":"5.0.4","e":"1597891197669520976936963","bc":"110100"}',
        "X-Host": "mall.film-ticket.film.list"
      }
    }).then(res => {
      // console.log(res.data.data.films);
      this.filmlist = res.data.data.films;
       
    });
  },
  mounted() {
     
  }
};
</script>
<style scoped>
#content .movie_body {
  flex: 1;
  overflow: auto;
}
.movie_body ul {
  margin: 0 12px;
  overflow: hidden;
}
.movie_body ul li {
  margin-top: 12px;
  display: flex;
  align-items: center;
  border-bottom: 1px #e6e6e6 solid;
  padding-bottom: 10px;
}
.movie_body .pic_show {
  width: 64px;
  height: 90px;
}
.movie_body .pic_show img {
  width: 100%;
}
.movie_body .info_list {
  margin-left: 10px;
  flex: 1;
  position: relative;
}
.movie_body .info_list h2 {
  font-size: 17px;
  line-height: 24px;
  width: 150px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.movie_body .info_list p {
  font-size: 13px;
  color: #666;
  line-height: 22px;
  width: 200px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.movie_body .info_list .grade {
  font-weight: 700;
  color: #faaf00;
  font-size: 15px;
}
.movie_body .info_list img {
  width: 50px;
  position: absolute;
  right: 10px;
  top: 5px;
}
.movie_body .btn_mall,
.movie_body .btn_pre {
  width: 47px;
  height: 27px;
  line-height: 28px;
  text-align: center;
  background-color: #f03d37;
  color: #fff;
  border-radius: 4px;
  font-size: 12px;
  cursor: pointer;
}
.movie_body .btn_pre {
  background-color: #3c9fe6;
}
</style>
