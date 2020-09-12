<template>
  <div class="cinema_body">
    <ul>
      <li v-for="data in this.cinemalist" :key="data.cinemaId">
        <div>
          <span class="cinema_name">{{ data.name }}</span>
          <span class="q">
            <i>￥</i>
            <span class="price">{{ data.lowPrice / 100 }}</span
            >元
            <span class="qi">起</span>
          </span>
        </div>
        <div class="address">
          <span>{{ data.address }}</span>
          <span>{{ data.Distance.toFixed(2) }}km</span>
        </div>
        <!-- <div class="card">
          <div>小吃</div>
          <div>折扣卡</div>
        </div>-->
      </li>
    </ul>
  </div>
</template>

<script>
import axios from "axios";
import { Indicator } from "mint-ui";
export default {
  name: "Cinemalist",
  data() {
    return {
      cityId: "",
      cinemalist: []
    };
  },
  created() {
    Indicator.open({
      text: "加载中...",
      spinnerType: "triple-bounce"
    });
    this.cityId = sessionStorage.getItem("cityId");
    axios({
      url: `https://m.maizuo.com/gateway?cityId=${this.cityId}&ticketFlag=1&k=120676`,
      headers: {
        "X-Client-Info":
          '{"a":"3000","ch":"1002","v":"5.0.4","e":"1597891197669520976936963","bc":"440800"}',
        "X-Host": "mall.film-ticket.cinema.list"
      }
    }).then(res => {
      console.log(res.data.data.cinemas);
      this.cinemalist = res.data.data.cinemas;
      Indicator.close();
    });
  },
  components: {},

  computed: {},

  methods: {}
};
</script>
<style scoped>
#content .cinema_body {
  flex: 1;
  overflow: auto;
}

.cinema_body ul {
  padding: 20px;
}

.cinema_body li {
  border-bottom: 1px solid #e6e6e6;
  margin-bottom: 20px;
}

.cinema_body div {
  margin-bottom: 10px;
}
.cinema_body .cinema_name {
  display: inline-block;
  font-size: 15px;
  width: 75%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.cinema_body .q {
  float: right;
  font-size: 11px;
  color: #f03d37;
}
.cinema_body i {
  font-style: normal;
}
.cinema_body .price {
  font-size: 15px;
}
.cinema_body .qi {
  font-size: 12px;
}

.cinema_body .address span:nth-child(1) {
  font-size: 12px;
  color: #666;
  display: inline-block;
  width: 70%;
  overflow: hidden;
  -o-text-overflow: ellipsis;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.cinema_body .address span:nth-child(2) {
  float: right;
  font-size: 12px;
}
</style>
