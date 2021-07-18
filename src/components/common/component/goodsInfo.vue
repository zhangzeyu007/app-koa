<!--
 * @Description: 组件
 * @Author: 海象
 * @Date: 2021-01-22 11:56:56
 * @LastEditors: 海象
 * @LastEditTime: 2021-01-26 20:48:35
-->
<template>
  <div class="goods-info" @click="goGoodsPage()">
    <div class="goods-image">
      <img v-lazy="goodsImage" width="90%" />
    </div>
    <div class="goods-name">{{ goodsName }}</div>
    <div class="goods-price">￥{{ goodsPrice | moneyFilter }}</div>
  </div>
</template>

<script>
import { toMoney } from "../filter/currencyFilter";

export default {
  props: ["goodsName", "goodsImage", "goodsPrice", "goodsId"],
  filters: {
    moneyFilter(money) {
      return toMoney(money);
    },
  },
  methods: {
    goGoodsPage() {
      this.$router.push({
        name: "goodsDetail",
        query: { goodsId: this.goodsId },
      });
    },
  },
};
</script>

<style  scoped>
.goods-name {
  padding: 0 8px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  box-sizing: border-box;
}
</style>
