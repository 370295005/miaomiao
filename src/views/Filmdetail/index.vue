<template>
  <div class="film" v-if="filminfo">
    <div class="film-header" ref="header" :class="isshow? 'show-film-header':'film-header'">
      <div class="back iconfont" @click="back">&#xe601;</div>
      <div class="title" :class="isshow? 'show-title':'title'">{{filminfo.name}}</div>
    </div>
    <div class="film-poster">
      <img :src="filminfo.poster" alt />
    </div>
    <div class="film-detail">
      <div class="col">
        <div class="film-name">
          <span class="name">{{filminfo.name}}</span>
          <span class="item">{{filminfo.filmType.name}}</span>
        </div>
        <div class="film-grade" v-if="filminfo.grade">
          <span class="grade">{{filminfo.grade}}</span>
          <span class="grade-text">&nbsp;分</span>
        </div>
      </div>
      <div class="film-category grey-text">{{filminfo.category}}</div>
      <div class="film-premiere-time grey-text"></div>
      <div class="film-nation-runtime grey-text">{{filminfo.nation}} | {{filminfo.runtime}} 分钟</div>
      <div class="test grey-text">{{filminfo.synopsis}}</div>
    </div>
    <div class="actors">
      <div class="actors-title-bar">
        <span class="actors-title-text">演职人员</span>
      </div>
      <div class="actors-swiper" v-if="actorlist">
        <swiper perview="3" class="actorswiper" myclassname="actorswiper" :key="actorlist.length">
          <div class="swiper-slide" v-for="data in filminfo.actors" :key="data.name">
            <img style="width:85px;min-width:85px" :src="data.avatarAddress" alt />
            <p class="actorname">{{data.name}}</p>
            <p class="actorrole">{{data.role}}</p>
          </div>
        </swiper>
      </div>
    </div>
    <div class="photos">
      <div class="photos-title-bar">
        <span class="photos-title-text">剧照</span>
      </div>
      <div class="photos-swiper" v-if="photolist">
        <swiper perview="2" class="photoswiper" myclassname="photoswiper" :key="photolist.length">
          <div class="swiper-slide" v-for="data in filminfo.photos" :key="data">
            <img class="photo" style="width:150px" :src="data" alt />
          </div>
        </swiper>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import swiper from "@/components/Swiper/Detailswiper.vue";
export default {
  data() {
    return {
      filminfo: "",
      actorlist: [],
      photolist: [],
      isshow: false
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
      this.actorlist = res.data.data.film.actors;
      this.photolist = res.data.data.film.photos;
    });
  },
  mounted() {
    window.onscroll = this.handlescroll;
  },
  beforeDestory() {
    window.onscroll = null;
  },
  methods: {
    back() {
      this.$router.push(`/movie/nowplaying`);
    },
    handlescroll() {
      var header = document.getElementsByClassName("film-header");
      console.log(header[0].clientHeight);
      if (document.documentElement.scrollTop >= header[0].clientHeight) {
        this.isshow = true;
      } else {
        this.isshow = false;
      }
    }
  },
  components: {
    swiper
  }
};
</script>

<style scoped>
.film {
  height: 100%;
  width: 100%;
  background-color: #f4f4f4;
}
.film .film-header {
  height: 44px;
  width: 100%;
  z-index: 999;
  overflow: hidden;
  position: fixed;
  background-color: transparent;
  transition: all 0.3s ease;
}
.film .show-film-header {
  height: 44px;
  width: 100%;
  z-index: 999;
  overflow: hidden;
  position: fixed;
  background-color: #fff;
  transition: all 0.3s ease;
}
.film .film-header .back {
  width: 30px;
  font-size: 16px;
  font-weight: 700;
  line-height: 44px;
  position: absolute;
  left: 10px;
  transition: all 0.3s ease;
}
.film .film-header .title {
  line-height: 44px;
  text-align: center;
  font-size: 18px;
  color: transparent;
  transition: all 0.3s ease;
}
.film .film-header .show-title {
  line-height: 44px;
  text-align: center;
  font-size: 18px;
  color: #000000;
  transition: all 0.3s ease;
}
.film .film-poster {
  width: 100%;
  height: 56vw;
  position: relative;
  background: rgb(249, 249, 249);
  overflow: hidden;
}
.film .film-poster img {
  width: 100%;
  position: absolute;
  top: 50%;
  overflow: hidden;
  transform: translateY(-50%);
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
.film .film-detail .film-grade {
  width: calc(100% - 250px);
  text-align: right;
  color: #ffb232;
}
.film .film-detail .film-grade .grade {
  font-size: 18px;
  font-style: italic;
}
.film .film-detail .film-grade .grade-text {
  font-size: 10px;
}
.film .film-detail .grey-text {
  font-size: 13px;
  color: #797d82;
  margin-top: 6px;
}
.film .actors {
  margin-top: 10px;
  background-color: #fff;
}
.film .actors .actors-title-bar {
  padding: 15px;
}
.film .actors .actors-title-bar .actors-title-text {
  font-size: 16px;
  text-align: left;
  color: #191a1b;
}
.film .actors .actors-title-bar span {
  display: inline-block;
  height: 22.5px;
  line-height: 22px;
}
.film .actors .actors-swiper {
  padding: 10px 0px;
}
.film .actors .actorname {
  padding-top: 10px;
  font-size: 12px;
  color: #191a1b;
  width: 85px;
  height: 18px;
  display: block;
  overflow: hidden;
  -o-text-overflow: ellipsis;
  text-overflow: ellipsis;
  white-space: nowrap;
  text-align: center;
}
.film .actors .actorrole {
  padding-top: 5px;
  font-size: 10px;
  color: #797d82;
  text-align: center;
  width: 85px;
  height: 18px;
  display: block;
  overflow: hidden;
  -o-text-overflow: ellipsis;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.film .photos {
  margin-top: 10px;
  margin-bottom: 30px;
  background-color: #fff;
}
.film .photos .photos-title-bar {
  height: 30px;
  padding: 15px;
}
.film .photos .photos-title-bar .photos-title-text {
  font-size: 16px;
  text-align: left;
  color: #191a1b;
}
.film .photos .photos-title-bar span {
  display: inline-block;
  height: 22.5px;
  line-height: 22px;
}
.film .photos .photo {
  height: 100px;
  min-height: 100px;
}
</style>