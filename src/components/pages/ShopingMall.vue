<!--
 * @Description: 组件
 * @Author: 海象
 * @Date: 2021-01-19 16:36:49
 * @LastEditors: 海象
 * @LastEditTime: 2021-01-31 20:04:55
-->
<template>
  <div class="">
    <div class="search-bar">
      <img
        class="search-icon"
        src="../../../static/image/shop/search_icon.png"
        alt=""
      />
      <input type="text" class="search-input" />
    </div>
    <!--swipwer area-->
    <div class="swiper-area">
      <van-swipe :autoplay="3000" style="max-height: 12rem">
        <van-swipe-item v-for="(banner, index) in bannerPicArray" :key="index">
          <img v-lazy="banner.image" width="100%" />
        </van-swipe-item>
      </van-swipe>
    </div>
    <!-- type bar -->
    <div class="type-bar">
      <div class="" v-for="item in category" :key="item.mallCategoryId">
        <img v-lazy="item.image" width="90%" alt="" />
        <span>{{ item.mallCategoryName }}</span>
      </div>
    </div>
    <!-- adpicture -->
    <div class="adpicture">
      <img class="" v-lazy="advertesPicture" width="100%" alt="" />
    </div>
    <!-- goods -->
    <div class="goods">
      <div class="goods-title">商品推荐</div>
      <div class="goods-body">
        <swiper :options="swiperOption">
          <swiper-slide v-for="(item, index) in recommendGoods" :key="index">
            <div class="recommend-item">
              <img :src="item.image" alt="" width="80%" />
              <div>{{ item.goodsName }}</div>
              <div>
                ¥{{ item.price | moneyFilter
                }}<span class="mallprice">{{
                  item.mallPrice | moneyFilter
                }}</span>
              </div>
            </div>
          </swiper-slide>
        </swiper>
      </div>
    </div>
    <!-- 楼层 -->
    <floor-component
      :floorData="floor1"
      :floorTitle="floorName.floor1"
    ></floor-component>
    <floor-component
      :floorData="floor2"
      :floorTitle="floorName.floor2"
    ></floor-component>
    <floor-component
      :floorData="floor3"
      :floorTitle="floorName.floor3"
    ></floor-component>

    <!--Hot Area-->
    <div class="hot-area">
      <div class="hot-title">热卖商品</div>
      <div class="hot-goods">
        <van-list>
          <van-row gutter="20">
            <van-col span="12" v-for="(item, index) in hotGoods" :key="index">
              <goods-info
                :goodsImage="item.image"
                :goodsName="item.name"
                :goodsPrice="item.price"
                :goodsId="item.goodsId"
              >
              </goods-info>
            </van-col>
          </van-row>
        </van-list>
      </div>
    </div>

    <!-- <swiper-default></swiper-default> -->
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from "vue-awesome-swiper";
import "swiper/swiper-bundle.css";
import SwiperDefault from "../common/swiper/swiperDefault.vue";
import FloorComponent from "../common/component/floorComponent.vue";
import { toMoney } from "@/components/common/filter/currencyFilter.js";
import GoodsInfo from "../common/component/goodsInfo.vue";

export default {
  data() {
    return {
      bannerPicArray: [],
      category: [],
      advertesPicture: "",
      recommendGoods: [],
      swiperOption: {
        slidesPerView: 3,
      },
      floorData: {},
      floorName: "",
      floor1: [],
      floor2: [],
      floor3: [],
      hotGoods: [],
    };
  },
  components: {
    Swiper,
    SwiperSlide,
    SwiperDefault,
    FloorComponent,
    GoodsInfo,
  },
  filters: {
    moneyFilter(money) {
      return toMoney(money);
    },
  },
  created() {
    this.getHomeData();
  },
  methods: {
    getHomeData() {
      this.$api.home.getHomeDataList().then((response) => {
        console.log(response);
        if (response.code == 200 && response.data) {
          let data = response.data.data;

          if (data.category) {
            this.category = data.category;
          }
          if (data.advertesPicture && data.advertesPicture.PICTURE_ADDRESS) {
            this.advertesPicture = data.advertesPicture.PICTURE_ADDRESS;
          }
          if (data.slides) {
            this.bannerPicArray = data.slides;
          }
          if (data.recommend) {
            this.recommendGoods = data.recommend;
          }
          if (data.floor1) {
            this.floor1 = data.floor1;
          }
          if (data.floor2) {
            this.floor2 = data.floor2;
          }
          if (data.floor3) {
            this.floor3 = data.floor3;
          }
          if (data.floorName) {
            this.floorName = data.floorName;
          }
          if (data.hotGoods) {
            this.hotGoods = data.hotGoods;
          }
        }
      });
    },
  },
};
</script>

<style  scoped>
.search-bar {
  margin: 10px 15px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  background-color: #f3f4f6;
}
.search-icon {
  padding: 8px 10px;
}
.search-input {
  width: 100%;
  height: 1.3rem;
  border-top: 0px;
  border-left: 0px;
  border-right: 0px;
  border-bottom: 1px solid #eee !important;
  background-color: #f3f4f6;
  color: #000;
  border-radius: 5px;
}
.location-icon {
  height: 80%;
  padding-top: 0.2rem;
  padding-left: 0.3rem;
}

.type-bar {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  margin: 0 0.3rem 0.3rem 0.3rem;
  border-radius: 0.3rem;
  font-size: 14px;
  flex-wrap: nowrap;
}
.type-bar div {
  padding: 0.3rem;
  font-size: 12px;
  text-align: center;
  width: 3.75rem;
  flex: 1;
}
.goods {
  background-color: #fff;
  margin-top: 0.3rem;
}
.goods-title {
  border-bottom: 1px solid #eeeeee;
  font-size: 14px;
  padding: 0.2rem;
  color: #e5017d;
}
.goods-body {
  border-bottom: 1px solid #eeeeee;
}
.recommend-item {
  width: 99%;
  text-align: center;
  font-size: 12px;
  border-right: 1px solid #eeeeee;
}
.mallprice {
  margin-left: 5px;
  font-size: 12px;
  color: orange;
  text-decoration: line-through;
}
.hot-area {
  text-align: center;
  font-size: 14px;
  height: 1.8rem;
  line-height: 1.8rem;
}
</style>