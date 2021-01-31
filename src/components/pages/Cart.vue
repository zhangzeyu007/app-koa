<!--
 * @Description: 组件
 * @Author: 海象
 * @Date: 2021-01-28 22:18:34
 * @LastEditors: 海象
 * @LastEditTime: 2021-01-29 11:01:31
-->
<template>
  <div class="cart">
    <div class="nav-bar">
      <van-nav-bar title="购物车" fixed></van-nav-bar>
    </div>
    <div class="cart-title">
      <!-- 显示总金额 -->
      <div class="total-money">商品总价格:¥ {{ totalmoney | moneyFilter }}</div>
      <van-button
        size="small"
        type="danger"
        @click="clearCart"
        class="clear-cart"
        >清空购物车</van-button
      >
    </div>
    <!-- 显示购物车的商品 -->
    <div class="cart-list">
      <div class="list-row" v-for="(item, index) in cartInfo" :key="index">
        <div class="list-img">
          <img :src="item.image" alt="" width="100%" />
        </div>
        <div class="list-text">
          <div class="goods-name">{{ item.name }}</div>
          <div class="goods-control">
            <van-stepper v-model="item.count"></van-stepper>
          </div>
        </div>
        <div class="list-price">
          <div class="goods-price">¥{{ item.price | moneyFilter }}</div>
          <div class="goods-count">x{{ item.count }}</div>
          <div class="all-price">
            ¥{{ (item.price * item.count) | moneyFilter }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { toMoney } from "@/components/common/filter/currencyFilter.js";
export default {
  data() {
    return {
      cartInfo: [],
      isEmpty: false,
    };
  },
  created() {
    this.getCartInfo();
  },
  computed: {
    totalmoney() {
      let allMoney = 0;
      this.cartInfo.forEach((item) => {
        allMoney += item.price * item.count;
      });
      localStorage.cartInfo = JSON.stringify(this.cartInfo);
      return allMoney;
    },
  },
  filters: {
    moneyFilter(money) {
      return toMoney(money);
    },
  },
  methods: {
    // 清空购物车
    clearCart() {
      localStorage.removeItem("cartInfo");
      this.cartInfo = [];
    },
    // 得到购物车数据的方法
    getCartInfo() {
      if (localStorage.cartInfo) {
        this.cartInfo = JSON.parse(localStorage.cartInfo);
      }
      this.isEmpty = this.cartInfo.length > 0 ? true : false;
    },
  },
};
</script>

<style  scoped>
.cart-title {
  height: 2rem;
  background-color: #fff;
  border-bottom: 1px solid #e4e7ed;
  padding: 5px;
  margin-top: 46px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.clear-cart {
}
.total-money {
  padding-left: 10px;
  background-color: #fff;
}
.cart-list {
  background-color: #fff;
  margin-bottom: 3rem;
}
.list-row {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  padding: 0.5rem;
  font-size: 0.85rem;
  border-bottom: 1px solid #e4e7ed;
  box-sizing: border-box;
}
.list-img {
  flex: 6;
}
.list-text {
  flex: 14;
  padding-left: 10px;
}
.goods-name {
  padding-top: 10px;
}
.goods-control {
  padding-top: 20px;
}
.list-price {
  flex: 4;
  text-align: right;
}
.goods-price {
  padding-top: 10px;
}
.goods-count {
  padding-top: 10px;
}
.all-price {
  color: lightcoral;
  padding-top: 10px;
}
</style>