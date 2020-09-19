<template>
  <div class="main">
    <div class="title">
      <div class="back iconfont" @click="back()">&#xe601;</div>
      <div class="name">{{cinemainfo.name}}</div>
    </div>
    <div class="cinema-wrap">
      <div class="tags" v-if="cinemainfo.services">
        <div class="tag" v-for="data in cinemainfo.services" :key="data.name">{{data.name}}</div>
      </div>
      <div class="cinema-info">
        <!-- <div class="location iconfont">&#xe61c;</div> -->
        <i class="iconfont location">&#xe632;</i>
        <div class="cinema-address">{{cinemainfo.address}}</div>
        <i class="iconfont phone">&#xe680;</i>
        <!-- <div class="phone iconfont">&#xe602;</div> -->
      </div>
    </div>
    <div class="schedule-wrap">
      <div class="film-list">
        <swiper perview="4" myclassname="cinemaswiper" :key="filminfo.length">
          <div class="swiper-slide" v-for="data in filminfo" :key="data.length">
            <img :src="data.poster" alt style="width:90px;height:130px" />
          </div>
        </swiper>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import swiper from "@/components/Swiper/Cinemaswiper.vue";
export default {
  data() {
    return {
      cinemainfo: "",
      filminfo: ""
    };
  },
  created() {
    console.log(this.$router.history.current.params.id);
    axios({
      url: `https://m.maizuo.com/gateway/?cinemaId=${this.$router.history.current.params.id}&k=7962337`,
      headers: {
        "X-Client-Info":
          '{"a":"3000","ch":"1002","v":"5.0.4","e":"1600130177477424269656065","bc":"340800"}',
        "X-Host": "mall.film-ticket.cinema.info"
      }
    }).then(res => {
      console.log(res.data.data.cinema);
      this.cinemainfo = res.data.data.cinema;
    });
    axios({
      url: `https://m.maizuo.com/gateway/?cinemaId=${this.$router.history.current.params.id}&k=2842814`,
      headers: {
        "X-Client-Info":
          '{"a":"3000","ch":"1002","v":"5.0.4","e":"1600130177477424269656065","bc":"440300"}',
        "X-Host": "mall.film-ticket.film.cinema-show-film"
      }
    }).then(res => {
      console.log(res.data.data.films);
      this.filminfo = res.data.data.films;
    });
  },
  methods: {
    back() {
      this.$router.push("/cinema");
    },
    active(e) {
      //点击图片就把他作为当前选中的电影
      //先把所有的节点类名都初始化，然后把选中的那个加active类，他的前一个兄弟加pre类。后一个加next类
      //下一个兄弟节点
      //   console.log(e.target.offsetParent.nextSibling);
      //  上一个兄弟节点
      //   console.log(e.target.offsetParent.previousSibling);
      console.log(e.target.offsetParent);
      //   console.log(e.target.offsetParent.offsetParent.children.length);
      // console.log(e.target.offsetParent.className)
      // e.target.offsetParent.className = "swiper-slide,swiper-slide-active"
      for (
        var i = 0;
        i < e.target.offsetParent.offsetParent.children.length;
        i++
      ) {
        e.target.offsetParent.offsetParent.children[i].className =
          "swiper-slide";
      }
      if (
        e.target.offsetParent.nextSibling == null &&
        e.target.offsetParent.previousSibling !== null
      ) {
        //那他就是最后一个
        (e.target.offsetParent.className = "swiper-slide swiper-slide-active"),
          (e.target.offsetParent.previousSibling.className =
            "swiper-slide swiper-slide-prev");
      } else if (
        e.target.offsetParent.nextSibling !== null &&
        e.target.offsetParent.previousSibling == null
      ) {
        //那他就是第一个
        (e.target.offsetParent.className = "swiper-slide swiper-slide-active"),
          (e.target.offsetParent.nextSibling.className =
            "swiper-slide swiper-slide-next");
      } else {
        e.target.offsetParent.previousSibling.className =
          "swiper-slide swiper-slide-prev";
        (e.target.offsetParent.className = "swiper-slide swiper-slide-active"),
          (e.target.offsetParent.nextSibling.className =
            "swiper-slide swiper-slide-next");
      }
    }
  },
  components: {
    swiper
  }
};
</script>


<style scoped>
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
  line-height: 45px;
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
  line-height: 45px;
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
  height: 160px;
  padding: 15px 0;
  position: relative;
}
.main .cinema-schedule .schedule-wrap .film-bg {
  position: absolute;
  top: 0;
  height: 160px;
  width: 100%;
  padding: 15px 0;
  overflow: hidden;
}
</style>