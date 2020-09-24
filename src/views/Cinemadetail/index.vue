<template>
  <div class="main" v-if="filminfo">
    <div class="title">
      <div class="back iconfont" @click="back()">&#xe601;</div>
      <div class="name">{{ cinemainfo.name }}</div>
    </div>
    <div class="cinema-wrap">
      <div class="tags" v-if="cinemainfo.services">
        <div class="tag" v-for="data in cinemainfo.services" :key="data.name">
          {{ data.name }}
        </div>
      </div>
      <div class="cinema-info">
        <!-- <div class="location iconfont">&#xe61c;</div> -->
        <i class="iconfont location">&#xe632;</i>
        <div class="cinema-address">{{ cinemainfo.address }}</div>
        <i class="iconfont phone">&#xe680;</i>
        <!-- <div class="phone iconfont">&#xe602;</div> -->
      </div>
    </div>
    <div class="schedule-wrap">
      <div class="film-bg">
        <div
          class="img"
          :style="{ backgroundImage: 'url(' + bgimg + ')' }"
        ></div>
      </div>
      <div class="film-list">
        <swiper perview="4" myclassname="cinemaswiper" :key="filminfo.length">
          <div
            class="swiper-slide"
            v-for="data in filminfo"
            :key="data.length"
            ref="poster"
          >
            <img
              :src="data.poster"
              alt
              style="width:90px;height:130px"
              @click.stop="active($event)"
            />
          </div>
        </swiper>
      </div>
      <div class="film-info">
        <div class="film-head">
          <span class="film-name">{{ activefilm.name }}</span>
          <span class="film-score" v-if="activefilm.grade">{{
            activefilm.grade
          }}</span>
          <span class="film-score-unit" v-if="activefilm.grade">分</span>
        </div>
        <div class="film-desc">
          {{ activefilm.category }} | {{ activefilm.runtime }}分钟 |
          {{ activefilm.actors[0].name }} | {{ activefilm.actors | actors }}
        </div>
        <i class="iconfont film-more">&#xe622;</i>
      </div>
      <div class="date-list">
        <div class="tabs-bar-wrapper">
          <div class="tabs-bar">
            <ul class="tabs-nav">
              <li @click="addactive($event)" ref="li">
                <span style="width:90px;display:inline-block"
                  >今天{{ new Date(today * 1000).getMonth() + 1 }}月{{
                    new Date(today * 1000).getDate()
                  }}日</span
                >
              </li>
              <li><span style="width:90px;display:inline-block"
                  >明天{{ new Date(tomorrow * 1000).getMonth() + 1 }}月{{
                    new Date(tomorrow * 1000).getDate()
                  }}日</span
                ></li>
              <li><span style="width:90px;display:inline-block"
                  >后天{{ new Date(aftertomorrow * 1000).getMonth() + 1 }}月{{
                    new Date(aftertomorrow * 1000).getDate()
                  }}日</span
                ></li>
            </ul>
          </div>
        </div>
        <div class="schedule-list">
          <div>
            <div class="schedule-item">
              <div class="left">
                <div class="start-at">18:10</div>
                <div class="end-at">20:25</div>
              </div>
              <div class="middle">
                <div class="language">国语2D</div>
                <div class="hall">5号VIP厅</div>
              </div>
              <div class="right">
                <div class="buy-ticket">购票</div>
                <div class="lowest-price">
                  <span class="price-icon">￥</span>
                  <span>119</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import swiper from "@/components/Swiper/Cinemaswiper.vue";
import Vue from "vue";
export default {
  data() {
    return {
      cinemainfo: "",
      bgimg: "",
      activefilm: "",
      filminfo: "",
      filmid: "",
      today: 0,
      tomorrow: 0,
      aftertomorrow: 0
    };
  },
  created() {
    //今天0点的时间戳
    this.today = new Date(new Date().toLocaleDateString()).getTime() / 1000;
    //明天0点时的时间戳
    this.tomorrow =
      (new Date(new Date().toLocaleDateString()).getTime() + 86400000) / 1000;
    //后天0点的时间戳
    this.aftertomorrow =
      (new Date(new Date().toLocaleDateString()).getTime() + 86400000 * 2) /
      1000;
    //电影院id
    // console.log(this.$router.history.current.params.id);
    //获取电影院信息
    axios({
      url: `https://m.maizuo.com/gateway/?cinemaId=${this.$router.history.current.params.id}&k=7962337`,
      headers: {
        "X-Client-Info":
          '{"a":"3000","ch":"1002","v":"5.0.4","e":"1600130177477424269656065","bc":"340800"}',
        "X-Host": "mall.film-ticket.cinema.info"
      }
    }).then(res => {
      // console.log(res.data.data.cinema);
      this.cinemainfo = res.data.data.cinema;
    });

    //获取该影院放映电影的信息
    // axios({
    //   url: `https://m.maizuo.com/gateway/?cinemaId=${this.$router.history.current.params.id}&k=2842814`,
    //   headers: {
    //     "X-Client-Info":
    //       '{"a":"3000","ch":"1002","v":"5.0.4","e":"1600130177477424269656065","bc":"440300"}',
    //     "X-Host": "mall.film-ticket.film.cinema-show-film"
    //   }
    // }).then(res => {
    //   // console.log(res.data.data.films);
    //   this.filminfo = res.data.data.films;
    //   this.activefilm = res.data.data.films[0];
    //   console.log(this.activefilm);
    //   this.bgimg = res.data.data.films[0].poster;
    // });

    //获取第一个电影的排期
    // axios({
    //   url: `https://m.maizuo.com/gateway/?filmId=${this.activefilm.filmId}&cinemaId=${this.$router.history.current.params.id}&date=${this.date}&k=8389770`,
    //   headers: {
    //     "X-Client-Info":
    //       '{"a":"3000","ch":"1002","v":"5.0.4","e":"1597891197669520976936963","bc":"110100"}',
    //     "X-Host": "mall.film-ticket.schedule.list"
    //   }
    // }).then(res => {
    //   console.log(res.data.data);
    // });

    //处理演员名字格式
    Vue.filter("actors", data => {
      var arr = data.map(data => {
        return data.name;
      });
      return arr.join(" ");
    });
  },
  mounted() {
    // var poster = document.querySelectorAll(".swiper-slide-active .swiper-slide")
    // console.log(poster);
  },
  beforeUpdate() {},
  updated() {
    // console.log(this.$refs.poster);
    // this.$nextTick(() => {
    //   for (var i = 0; i < this.filminfo.length; i++) {
    //     if (
    //       this.$refs.poster[i].className == "swiper-slide swiper-slide-active"
    //     ) {
    //       console.log(this.$refs.poster[i].children[0].currentSrc);
    //       this.bgimg = this.$refs.poster[i].children[0].currentSrc;
    //       break;
    //     }
    //   }
    //   console.log(this.bgimg);
    // });
  },
  methods: {
    back() {
      this.$router.push("/cinema");
    },
    active(e) {
      // console.log(e.target.src);
      if (this.bgimg !== e.target.src) {
        this.bgimg = e.target.src;
        for (var i = 0; i < this.filminfo.length; i++) {
          if (e.target.src == this.filminfo[i].poster) {
            this.filmid = this.filminfo[i].filmId;
            axios({
              url: `https://m.maizuo.com/gateway?filmId=${this.filmid}&k=8349422`,
              headers: {
                "X-Client-Info":
                  '{"a":"3000","ch":"1002","v":"5.0.4","e":"1597891197669520976936963","bc":"110100"}',
                "X-Host": "mall.film-ticket.film.info"
              }
            }).then(res => {
              this.activefilm = res.data.data.film;
            });
            // this.date = parseInt(new Date().getTime()/1000)*1000;
            // console.log(this.date);

            axios({
              url: `https://m.maizuo.com/gateway/?filmId=${this.filmid}&cinemaId=${this.$router.history.current.params.id}&date=${this.date}&k=8389770`,
              headers: {
                "X-Client-Info":
                  '{"a":"3000","ch":"1002","v":"5.0.4","e":"1597891197669520976936963","bc":"110100"}',
                "X-Host": "mall.film-ticket.schedule.list"
              }
            }).then(res => {
              console.log(res.data.data);
            });
          }
        }
      }
    },
    addactive(e) {
      // console.log(e.target.parentNode);
      e.target.parentNode.className = "active"
      // e.target.parent.className = "active";
      // console.log(this.$refs.li);
    }
  },
  components: {
    swiper
  },
  watch: {
    cinemainfo() {
      //监听cinemainfo这个变量，确保他取到值了以后才会执行下面的请求

      axios({
        url: `https://m.maizuo.com/gateway/?cinemaId=${this.$router.history.current.params.id}&k=2842814`,
        headers: {
          "X-Client-Info":
            '{"a":"3000","ch":"1002","v":"5.0.4","e":"1600130177477424269656065","bc":"440300"}',
          "X-Host": "mall.film-ticket.film.cinema-show-film"
        }
      }).then(res => {
        // console.log(res.data.data.films);
        this.filminfo = res.data.data.films;
        this.activefilm = res.data.data.films[0];
        // console.log(this.activefilm);
        this.bgimg = res.data.data.films[0].poster;
      });
    },
    activefilm() {
      //监听activefilm这个变量 因为下面的请求需要activefilm中的数据，保证他们的执行顺序

      axios({
        url: `https://m.maizuo.com/gateway/?filmId=${this.activefilm.filmId}&cinemaId=${this.$router.history.current.params.id}&date=${this.today}&k=8389770`,
        headers: {
          "X-Client-Info":
            '{"a":"3000","ch":"1002","v":"5.0.4","e":"1597891197669520976936963","bc":"110100"}',
          "X-Host": "mall.film-ticket.schedule.list"
        }
      }).then(res => {
        console.log(res.data);
      });
    }
  }
};
</script>


<style scoped>
.active {
  color: #ff5f16 !important;
}
::-webkit-scrollbar {
  /*隐藏滚轮*/
  display: none;
}
.main {
  height: 100%;
  width: 100%;
  /* background-color: #f4f4f4; */
}
.main .title {
  height: 44px;
  line-height: 44px;
  text-align: center;
  font-size: 17px;
  background-color: #fff;
  margin-bottom: 10px;
}
.main .title .back {
  position: absolute;
  line-height: 44px;
  left: 5px;
  font-size: 18px;
}
.main .cinema-info {
  height: 50px;
  position: relative;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
}
.main .cinema-info .location {
  font-size: 20px;
  line-height: 50px;
  margin: 0 10px;
}
.main .cinema-info .cinema-address {
  font-size: 14px;
  height: 20px;
  padding: 0 6px;
  -webkit-box-flex: 1;
  -ms-flex: 1;
  flex: 1;
  position: relative;
  overflow: hidden;
  -o-text-overflow: ellipsis;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.main .cinema-info .phone {
  font-size: 20px;
  line-height: 50px;
  margin-right: 10px;
}
.main .cinema-wrap .tags {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  font-size: 15px;
  color: #ffb232;
  overflow: hidden;
  position: relative;
  padding: 5px 0 15px;
  border-bottom: 1px solid #f4f4f4;
}
.main .cinema-wrap .tags .tag {
  position: relative;
  padding: 0 6px;
  margin: 0 3px;
  font-size: 12px;
  border: 1px solid #ffb232;
}
.main .schedule-wrap {
  position: relative;
}
.main .schedule-wrap .film-list {
  height: 165px;
  padding-top: 15px;
  position: relative;
}
.main .schedule-wrap .film-bg {
  position: absolute;
  top: 0;
  height: 140px;
  width: 100%;
  padding: 15px 0;
  overflow: hidden;
}
.main .schedule-wrap .film-bg .img {
  height: 100%;
  width: 100%;
  filter: blur(30px);
  -webkit-filter: blur(30px);
}
.schedule-wrap .film-info {
  width: 100%;
  background: #fff;
  height: 50px;
  padding: 15px 0;
  position: relative;
}
.schedule-wrap .film-info .film-head {
  margin-bottom: 10px;
  text-align: center;
  line-height: 18px;
}
.schedule-wrap .film-info .film-head .film-name {
  font-size: 15px;
  color: #191a1b;
  padding-right: 5px;
}
.schedule-wrap .film-info .film-head .film-score {
  font-size: 16px;
  font-style: italic;
  color: #ffb232;
}
.schedule-wrap .film-info .film-head .film-score-unit {
  font-size: 10px;
  color: #ffb232;
}
.schedule-wrap .film-info .film-desc {
  text-align: center;
  height: 18px;
  color: #797d82;
  font-size: 13px;
  padding: 0 12%;
  overflow: hidden;
  -o-text-overflow: ellipsis;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.schedule-wrap .film-info .film-more {
  font-size: 10px;
  position: absolute;
  right: 15px;
  top: 0;
  margin-top: 36px;
}
.schedule-wrap .date-list {
  width: 100%;
}
.schedule-wrap .date-list .tabs-bar-wrapper {
  position: relative;
  z-index: 100;
  width: 100%;
  overflow-x: hidden;
  background: #fff;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}
.schedule-wrap .date-list .tabs-bar-wrapper .tabs-bar {
  height: 49px;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  overflow-x: auto;
  overflow-y: hidden;
  position: relative;
}
.schedule-wrap .date-list .tabs-bar-wrapper .tabs-bar .tabs-nav {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  display: -webkit-flex;
  -webkit-box-pack: start;
  -ms-flex-pack: start;
  justify-content: flex-start;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  position: relative;
  width: 100%;
}
.tabs-bar-wrapper .tabs-bar .tabs-nav li {
  padding: 0px 15px;
  -ms-flex-negative: 0;
  color: #191a1b;
  text-align: center;
  height: 16px;
  line-height: 16px;
  font-size: 14px;
  cursor: pointer;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}
.tabs-bar-wrapper li,
.tabs-bar-wrapper ul {
  margin: 0;
  padding: 0;
  list-style: none;
}

.schedule-wrap .schedule-list .schedule-item {
  height: 44px;
  padding: 15px;
  position: relative;
  background: #fff;
}
.schedule-wrap .schedule-list .schedule-item .left {
  float: left;
  width: 100px;
}
.schedule-wrap .schedule-list .schedule-item .left .start-at {
  font-size: 15px;
  color: #191a1b;
}
.schedule-wrap .schedule-list .schedule-item .left .end-at {
  font-size: 13px;
  color: #797d82;
  margin-top: 2px;
}
.schedule-wrap .schedule-list .schedule-item .middle {
  float: left;
  width: calc(100% - 240px);
}
.schedule-wrap .schedule-list .schedule-item .middle .language {
  font-size: 15px;
  color: #191a1b;
  overflow: hidden;
  -o-text-overflow: ellipsis;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.schedule-wrap .schedule-list .schedule-item .middle .hall {
  font-size: 13px;
  color: #797d82;
  margin-top: 2px;
  overflow: hidden;
  -o-text-overflow: ellipsis;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.schedule-wrap .schedule-list .schedule-item .right {
  float: right;
  padding: 10px 0;
  line-height: 25px;
  color: #ff5f16;
}
.schedule-wrap .schedule-list .schedule-item .right .buy-ticket {
  box-sizing: border-box;
  font-size: 13px;
  float: right;
  height: 25px;
  width: 50px;
  border-radius: 2px;
  position: relative;
  text-align: center;
  border: 1px solid #ff5f16;
}
.schedule-wrap .schedule-list .schedule-item .right .lowest-price {
  float: right;
  padding-right: 20px;
  font-size: 15px;
}
.schedule-wrap .schedule-list .schedule-item .right .lowest-price .price-icon {
  font-size: 10px;
}
</style>