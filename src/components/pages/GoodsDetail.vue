<!--
 * @Description: 组件
 * @Author: 海象
 * @Date: 2021-01-26 17:53:55
 * @LastEditors: 海象
 * @LastEditTime: 2021-01-31 12:16:39
-->

<template>
  <div class="goodsDetail">
    <div class="navbar">
      <van-nav-bar
        title="商品详情"
        left-text="返回"
        left-arrow
        @click-left="goBack"
      ></van-nav-bar>
    </div>
    <!-- 商品详情 -->
    <div class="goods">
      <div class="goods-img">
        <img :src="goodsInfo.IMAGE1" alt="" width="100%" />
      </div>
      <div class="goods-name">{{ goodsInfo.NAME }}</div>
      <div class="goods-price">
        价格: ¥{{ goodsInfo.PRESENT_PRICE | moneyFilter }}
      </div>
      <div>
        <van-tabs swipeable sticky>
          <van-tab title="商品详情">
            <div class="detail" v-html="goodsInfo.DETAIL"></div>
          </van-tab>
          <van-tab title="评论"> 评论页面制作中 </van-tab>
        </van-tabs>
      </div>
      <div class="goods-cart">
        <div>
          <van-button size="large" type="primary" @click="addGoodsToCart"
            >加入购物车</van-button
          >
        </div>
        <div>
          <van-button size="large" type="danger">直接购买</van-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Toast } from "vant";
import { toMoney } from "@/components/common/filter/currencyFilter.js";
export default {
  data() {
    return {
      goodsId: "",
      goodsInfo: {},
    };
  },
  filters: {
    moneyFilter(money) {
      return toMoney(money);
    },
  },
  created() {
    this.goodsId = this.$route.query.goodsId
      ? this.$route.query.goodsId
      : this.$route.params.goodsId;
    this.getDetailData();
  },
  methods: {
    getDetailData() {
      this.$api.goods
        .getGoodsDetail("/getDetailGoodsInfo", {
          goodsId: this.goodsId,
        })
        .then((response) => {
          console.log(response);
          if (response.data && response.code == 200) {
            if (response.data.detail) {
              this.goodsInfo = response.data.detail;
            }
          } else {
            Toast.fail(response.message);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    goBack() {
      this.$router.go(-1);
    },
    addGoodsToCart() {
      // 取出本地购物车的商品
      let cartInfo = localStorage.cartInfo
        ? JSON.parse(localStorage.cartInfo)
        : [];
      console.log(cartInfo);
      let isHaveGoods = cartInfo.find((cart) => cart.goodsId == this.goodsId);
      // console.log(isHaveGoods);
      if (!isHaveGoods) {
        let newGoods = {
          goodsId: this.goodsInfo.ID,
          name: this.goodsInfo.NAME,
          price: this.goodsInfo.PRESENT_PRICE,
          image: this.goodsInfo.IMAGE1,
          count: 1,
        };
        cartInfo.push(newGoods);
        localStorage.cartInfo = JSON.stringify(cartInfo);
        Toast.success("添加成功");
      } else {
        Toast.success("已有此商品");
      }
      this.$router.push({ path: "/cart" });
    },
  },
};
</script>

<style  scoped>
.goods-name {
  background: #fff;
}
.goods-price {
  background: #fff;
}

.detail {
  font-size: 0px;
}
.goods-cart {
  position: fixed;
  bottom: 0;
  left: 0;
  background: #fff;
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-flow: nowrap;
}
.goods-cart > div {
  flex: 1;
  padding: 5px;
  box-sizing: border-box;
}
</style>