<template>
  <div id="main">
    <!-- <header class="cinema_header">
      <div class="left"></div>
      <div class="title"></div>
      <div class="right"></div>
    </header>-->
    <Header title="喵喵影院"></Header>
    <div id="content">
      <div class="cinema_menu">
        <div class="city_switch">
          全城
          <i class="iconfont icon-lower-triangle"></i>
        </div>
        <div class="brand_swtich">
          品牌
          <i class="iconfont icon-lower-triangle"></i>
        </div>
        <div class="feature_switch">
          特色
          <i class="iconfont icon-lower-triangle"></i>
        </div>
      </div>
      <Cinemalist></Cinemalist>
    </div>
    <Tabbar></Tabbar>
  </div>
</template>
<script>
import Header from "@/components/Header";
import Tabbar from "@/components/Tabbar";
import Cinemalist from "@/components/Cinemalist";
export default {
  name: "Cinema",
  components: {
    Tabbar,
    Cinemalist,
    Header
  }
};
</script>
<style>
#content .cinema_menu {
  width: 100%;
  height: 40px;
  border-bottom: 1px solid #e6e6e6;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background: white;
}
.cinema_menu div{
  font-size: 14px;
}
</style>
