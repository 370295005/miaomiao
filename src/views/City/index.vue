<template>
  <div id="main">
    <!-- <div v-for="data in citylist" :key="data.cityId">{{data.name}}</div> -->
    <div class="city-list">
      <header id="header">
        <router-link tag="i" class="iconfont" to="/movie/nowplaying"
          >&#xe648;</router-link
        >

        <h1 class="city-header">
          当前城市--
          <span v-if="cityName">{{ cityName }}</span>
          <span v-else>{{ nowcity }}</span>
        </h1>
      </header>
      <mt-index-list>
        <div class="recommend-city">
          <div class="city-index-title">定位城市</div>
          <ul class="city-index-detail clearfix">
            <li
              class="city-item-detail"
              v-for="city in nowcitylist"
              :key="city.cityId"
            >
              <div
                class="city-item-text"
                @click="handlecityid(city.cityId, city.name)"
              >
                {{ city.name }}
              </div>
            </li>
          </ul>
        </div>
        <div class="recommend-city">
          <div class="hot-city">
            <div class="city-index-title">热门城市</div>
            <ul class="city-index-detail clearfix">
              <li
                v-for="city in hotlist"
                :key="city.cityId"
                class="city-item-detail"
              >
                <div
                  class="city-item-text"
                  @click="handlecityid(city.cityId, city.name)"
                >
                  {{ city.name }}
                </div>
              </li>
            </ul>
          </div>
        </div>
        <mt-index-section
          :index="data.index"
          v-for="data in datalist"
          :key="data.index"
        >
          <div
            v-for="city in data.list"
            :key="city.cityId"
            @click="handlecityid(city.cityId, city.name)"
          >
            <mt-cell :title="city.name"></mt-cell>
          </div>
        </mt-index-section>
      </mt-index-list>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
import axios from "axios";
export default {
  name: "City",
  data() {
    return {
      datalist: [],
      hotlist: [],
      nowcity: "",
      nowcitylist: [],
      cityName: ""
    };
  },

  mounted() {
    this.cityName = sessionStorage.getItem("cityName");

    // if (this.$store.state.citylist.length == 0) {
    //   this.$store.dispatch("getcitylist");

    // } else {
    //   console.log("使用citylist缓存数据");
    // }
    // console.log(this.citylist);
    // this.datalist = this.handlecity(this.$store.state.citylist);
    // this.hostlist = this.handlehotcity(this.$store.state.citylist);
    // this.nowcity = sessionStorage.getItem("nowcity");
    // this.nowcity = this.handlenowcity(this.$store.state.citylist, this.nowcity);
    // 获取城市列表
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
      this.datalist = this.handlecity(res.data.data.cities);
      // console.log(this.datalist);
      this.hotlist = this.handlehotcity(res.data.data.cities);
      // console.log(this.hotlist);
      this.nowcity = sessionStorage.getItem("nowcity");
      this.nowcitylist = this.handlenowcity(res.data.data.cities, this.nowcity);
      // console.log(this.nowcitylist);
    });
  },

  methods: {
    handlecity(datalist) {
      //筛选城市，按首字母归类函数
      //   console.log(datalist);
      var letterArr = [];
      //通过acsII码获取英文字母
      for (var i = 97; i < 123; i++) {
        letterArr.push(String.fromCharCode(i));
      }
      // console.log(letterArr);

      var newlist = [];
      //把每个城市的拼音的第一个字符和26个英文字母进行比对，匹配的就装入数组中
      //   console.log(letterArr.length);
      for (var j = 0; j < letterArr.length; j++) {
        var arr = datalist.filter(
          item => item.pinyin.substring(0, 1) === letterArr[j]
        );
        if (arr.length > 0) {
          newlist.push({
            index: letterArr[j].toUpperCase(),
            list: arr
          });
        }
      }
      //   console.log(newlist);
      return newlist;
    },
    handlehotcity(datalist) {
      //筛选热门城市，根据isHot判断是否是热门城市函数
      for (var i = 0; i < datalist.length; i++) {
        var arr = datalist.filter(item => item.isHot === 1);
      }
      // console.log(arr);
      return arr;
    },
    handlecityid(id, name) {
      //跳转函数
      sessionStorage.setItem("cityId", id);
      sessionStorage.setItem("cityName", name);
      this.$router.push(`/movie/nowplaying`);
      sessionStorage.removeItem("nowcity");
    },
    handlenowcity(datalist, cityname) {
      for (var i = 0; i < datalist.length; i++) {
        var arr = datalist.filter(item => item.name === cityname);
      }
      return arr;
    }
  },
  computed: {
    ...mapState({
      citylist: state => state.citylist
    })
  }
};
</script>
<style>
#header {
  width: 100%;
  height: 40px;
  background-color: #fff;
  color: #000000;
  position: relative;
  border-bottom: 1px solid #ededed;
}
#header i {
  position: absolute;
  left: 7px;
  top: 50%;
  margin-top: -12px;
  font-size: 24px;
}
#header .city-header {
  font-size: 18px;
  text-align: center;
  line-height: 40px;
  font-weight: normal;
}
.recommend-city {
  padding-left: 15px;
  padding-top: 15px;
}
.city-index-title {
  font-size: 14px;
  color: #797d82;
  margin-bottom: 12px;
}
.city-item-detail {
  width: calc((100vw - 40px) / 3);
  text-align: center;
  padding-bottom: 15px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  float: left;
}
.city-list .city-item-detail .city-item-text {
  height: 30px;
  background-color: #f4f4f4;
  line-height: 30px;
  border-radius: 3px;
  box-sizing: border-box;
  margin: 0 7.5px;
  font-size: 14px;
  font-family: Microsoft YaHei;
  color: #191a1b;
}
.mint-indexsection ul {
  padding: 0px 0px 0px 15px;
}
.mint-indexlist-nav {
  border: none;
}
.mint-indexlist-navitem {
  padding: 2px 2px;
}
.mint-indexsection .mint-indexsection-index {
  margin: 0px;
  padding: 0px 0px 0px 15px;
  height: 30px;
  line-height: 30px;
  font-size: 12px;
}
.mint-cell-wrapper {
  border-bottom: 1px solid #ededed;
  padding: 0px;
}
.mint-cell-text {
  font-size: 14px;
}
</style>
