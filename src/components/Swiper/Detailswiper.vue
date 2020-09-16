<template>
  <div class="swiper-container filmswiper">
    <div class="swiper-wrapper">
      <slot></slot>
    </div>
    <div class="swiper-pagination"></div>
  </div>
</template>
<script>
import Swiper from "swiper";
import "swiper/swiper-bundle.css";
export default {
  props: ["perview", "myclassname"],
  mounted() {
    new Swiper("." + this.myclassname, {
      slidesPerView: this.perview,
      spaceBetween: 30,
      freeMode: true
    });
  }
};
</script>

<style  lang="scss" scoped>
.swiper-wrapper {
  img {
    width: 100%;
  }
}
.swiper-pagination {
  text-align: center;
}
</style>
