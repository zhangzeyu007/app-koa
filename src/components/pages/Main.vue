<!--
 * @Description: 组件
 * @Author: 海象
 * @Date: 2021-01-29 09:18:55
 * @LastEditors: 海象
 * @LastEditTime: 2021-01-29 11:58:09
-->
<template>
  <div>
    <div class="main">
      <keep-alive>
        <router-view />
      </keep-alive>
    </div>
    <van-tabbar
      v-model="active"
      active-color="#1989fa"
      @change="changeTabbar(active)"
    >
      <van-tabbar-item icon="shop">首页</van-tabbar-item>
      <van-tabbar-item icon="records">分类</van-tabbar-item>
      <van-tabbar-item icon="cart">购物车</van-tabbar-item>
      <van-tabbar-item icon="contact">会员中心</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: 0,
      nowPath: "",
    };
  },
  created() {
    this.changeTabbarActive();
  },
  updated() {
    this.changeTabbarActive();
  },
  methods: {
    changeTabbarActive() {
      this.nowPath = this.$route.path;
      if (this.nowPath == "/cart") {
        this.active = 2;
      }
    },
    changeTabbar(active) {
      switch (active) {
        case 0:
          this.$router.push({ name: "shopingMall" });
          break;
        case 1:
          this.$router.push({ name: "categoryList" });
          break;
        case 2:
          this.$router.push({ name: "cart" });
          break;
        case 3:
          this.$router.push({ name: "member" });
          break;
      }
    },
  },
};
</script>

<style  scoped>
</style>