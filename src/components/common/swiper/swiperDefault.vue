<!--
 * @Description: 组件
 * @Author: 海象
 * @Date: 2021-01-20 22:21:09
 * @LastEditors: 海象
 * @LastEditTime: 2021-01-20 22:28:48
-->
<template>
  <div class="">
    <swiper>
      <swiper-slide
        class="swiper-slide"
        v-for="(item, index) in slide"
        :key="index"
      >
        {{ item }}
      </swiper-slide>
    </swiper>
  </div>
</template>

<script>
import VueAwesomeSwiper from "vue-awesome-swiper";
import { Swiper, SwiperSlide } from "vue-awesome-swiper";
import "swiper/swiper-bundle.css";

export default {
  data() {
    return {
      slide: [1, 2, 4, 3],
    };
  },
  components: {
    Swiper,
    SwiperSlide,
  },
  mounted() {},
  methods: {},
};
</script>

<style  scoped>
.swiper-slide {
  height: 4rem;
  text-align: center;
  padding-top: 3rem;
  border-bottom: 1px solid #ccc;
}
</style>