<!--
 * @Description: 组件
 * @Author: 海象
 * @Date: 2021-01-21 17:11:34
 * @LastEditors: 海象
 * @LastEditTime: 2021-01-31 21:58:43
-->
<template>
  <div class="floor">
    <div class="floor-title">{{ floorTitle }}</div>
    <div class="floor-anmonly">
      <div class="floor-one-left">
        <img :src="image1" alt="" width="100%" />
      </div>
      <div class="floor-one-right">
        <div>
          <img :src="image2" alt="" width="100%" />
        </div>
        <div>
          <img :src="image3" alt="" width="100%" />
        </div>
      </div>
    </div>
    <div class="floor-two">
      <div v-for="item in floor.slice(1)" :key="item.goodsId">
        <img :src="item.image" alt="" width="100%" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    floorData: {
      type: Array,
      default: [],
    },
    floorTitle: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      floor: [],
      image1: "",
      image2: "",
      image3: "",
    };
  },
  watch: {
    floorData: {
      handler(data) {
        this.floor = data;
        this.image1 = this.floor[0] && this.floor[0].image;
        this.image2 = this.floor[1] && this.floor[1].image;
        this.image3 = this.floor[2] && this.floor[2].image;
      },
      immediate: true,
    },
  },
};
</script>

<style  scoped>
.floor-anmonly {
  display: flex;
  flex-direction: row;
  background-color: #fff;
  border-bottom: 1px solid #dddddd;
}
.floor-one-right > div {
  border-left: 1px solid #eeeeee;
  border-bottom: 1px solid #eeeeee;
  box-sizing: border-box;
  -webkit-box-sizing: border-box;
}
.floor-two {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
.floor-two > div {
  width: 10rem;
  border-bottom: 1px solid #eeeeee;
  flex-grow: 1;
  box-sizing: border-box;
  -webkit-box-sizing: border-box;
}
.floor-title {
  text-align: center;
  font-size: 14px;
  height: 1.8rem;
  line-height: 1.8rem;
}
</style>