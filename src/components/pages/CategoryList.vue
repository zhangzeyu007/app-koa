<!--
 * @Description: 组件
 * @Author: 海象
 * @Date: 2021-01-27 17:23:22
 * @LastEditors: 海象
 * @LastEditTime: 2021-02-12 17:55:41
-->
<template>
  <div class="">
    <div id="nav-bar">
      <van-nav-bar title="类别列表"></van-nav-bar>
    </div>
    <div>
      <van-row>
        <van-col span="6">
          <div id="nav-left">
            <ul>
              <li
                v-for="(item, index) in categoryList"
                :key="index"
                @click="categoryClick(index, item)"
                :class="[categoryIndex == index ? 'categoryActive' : '']"
              >
                {{ item.MALL_CATEGORY_NAME }}
              </li>
            </ul>
          </div>
        </van-col>
        <van-col span="18">
          <div class="tabcategorysub">
            <van-tabs
              v-model="tabActive"
              animated
              title-active-color="#ee0a24"
              @click="categroySubClick"
            >
              <van-tab
                v-for="(item, index) in categorySubList"
                :key="index"
                :title="item.MALL_SUB_NAME"
              >
              </van-tab>
            </van-tabs>
            <div id="category-list">
              <van-pull-refresh v-model="isRefresh" @refresh="onRefresh">
                <van-list v-model="loading" :finished="finished" @load="onLoad">
                  <div
                    class="list-item"
                    v-for="(item, index) in goodsList"
                    :key="index"
                    @click="goGoodsInfo(item.ID)"
                  >
                    <div class="list-item-img">
                      <img
                        :src="item.IMAGE1"
                        alt=""
                        width="100%"
                        :onerror="errorImg"
                      />
                    </div>
                    <div class="list-item-text">
                      <div>{{ item.NAME }}</div>
                      <div class="item-price">
                        ¥{{ item.ORI_PRICE | moneyFilter }}
                      </div>
                    </div>
                  </div>
                </van-list>
              </van-pull-refresh>
            </div>
          </div>
        </van-col>
      </van-row>
    </div>
  </div>
</template>

<script>
import { Toast } from "vant";
import { toMoney } from "@/components/common/filter/currencyFilter.js";

export default {
  data() {
    return {
      categoryList: [],
      categoryIndex: 0,
      categorySubList: [],
      tabActive: 0,
      loading: false,
      finished: false, // 上拉加载
      goodsList: [],
      isRefresh: false,
      page: 1,
      categorySubId: "",
      errorImg: 'this.src="' + require("@/assets/errorimg.png") + '"',
    };
  },

  filters: {
    moneyFilter(money) {
      return toMoney(money);
    },
  },

  created() {
    this.getCategoryList();
  },

  mounted() {
    let winHeight = document.documentElement.clientHeight;
    let navHeight = document.getElementById("nav-bar").clientHeight;
    document.getElementById("nav-left").style.height =
      winHeight - navHeight + "px";
    document.getElementById("category-list").style.height =
      winHeight - 90 - 50 + "px";
  },
  methods: {
    // 大类类别点击
    categoryClick(index, item) {
      this.categoryIndex = index;
      this.getCategorySubList(item.ID);
      this.finished = false;
      this.page = 1;
      this.goodsList = [];
    },

    // 小类类别点击
    categroySubClick(index) {
      this.categorySubId = this.categorySubList[index].ID;
      this.goodsList = [];
      this.finished = false;
      this.page = 1;
      this.onLoad();
    },

    getCategoryList() {
      this.$api.goods
        .getCategoryData({})
        .then((result) => {
          console.log(result);
          if (result.code == 200 && result.data) {
            this.categoryList = result.data;
            this.getCategorySubList(this.categoryList[0].ID);
          } else {
            Toast.fail(result.message);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 获取小分类列表
    getCategorySubList(id) {
      this.$api.goods.getCategorySubData({ categoryId: id }).then((res) => {
        if (res.data) {
          this.categorySubList = res.data;
          this.tabActive = 0;
          if (this.categorySubList.length > 0) {
            this.categorySubId = this.categorySubList[0].ID;
          }

          this.onLoad();
        }
      });
    },
    // 获取商品数据
    getSubGoodsList() {
      this.$api.goods
        .getSubGoodsListData({
          categorySubId: this.categorySubId,
          page: this.page,
        })
        .then((response) => {
          if (response.code == 200 && response.data.length) {
            this.page++;
            this.goodsList = this.goodsList.concat(response.data);
          } else {
            this.finished = true;
          }
          this.loading = false;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    // 上拉加载方法
    onLoad() {
      let that = this;
      setTimeout(() => {
        if (that.categorySubList.length > 0) {
          that.categorySubId = that.categorySubId
            ? that.categorySubId
            : that.categorySubList[0].ID;
        }
        that.getSubGoodsList();
      }, 1000);
    },

    onRefresh() {
      setTimeout(() => {
        this.isRefresh = false;
        this.finished = false;
        this.goodsList = [];
        this.page = 1;
        this.onLoad();
      }, 500);
    },

    goGoodsInfo(id) {
      this.$router.push({ name: "goodsDetail", params: { goodsId: id } });
    },
  },
};
</script>

<style scoped>
#nav-left {
  background-color: pink;
}
#nav-left ul li {
  line-height: 2rem;
  border-bottom: 1px solid #e4e7ed;
  padding: 3px;
  font-size: 0.8rem;
  text-align: center;
}
.categoryActive {
  background-color: #fff;
}

#category-list {
  overflow: scroll;
}

#list-div {
  overflow: scroll;
}
.list-item {
  display: flex;
  flex-direction: row;
  font-size: 0.8rem;
  border-bottom: 1px solid #f0f0f0;
  background-color: #fff;
  padding: 5px;
}

.list-item-img {
  flex: 8;
}
.list-item-text {
  flex: 16;
  margin-top: 10px;
  margin-left: 10px;
}
.item-price {
  padding: 10px 0;
  box-sizing: border-box;
}
</style>
