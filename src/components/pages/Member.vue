<!--
 * @Description: 组件
 * @Author: 海象
 * @Date: 2021-01-29 11:54:13
 * @LastEditors: 海象
 * @LastEditTime: 2021-03-11 13:05:38
-->

<template>
  <div class="member">
    <!-- 会员卡  -->
    <!-- <div class="member-card">
      <div class="card-left">
        <div class="king-icon">
          <img
            class="king-img"
            src="../../../static/image/member/king-icon.png"
            alt=""
          />
        </div>
        <div class="king-text">它鲜会员</div>
      </div>
      <div class="card-right">专享受9大权益</div>
    </div> -->
    <!--我的钱包  -->
    <!-- <div class="manage">
      <div class="manage-item line-right">
        <img
          class="poket-icon"
          src="../../../static/image/member/poket.png"
          alt=""
        />
        <div class="manage-item-text">我的钱包</div>
      </div>
      <div class="manage-item">
        <div class="coupon">2</div>
        <div class="manage-item-text">优惠券</div>
      </div>
      <div class="manage-item">
        <div class="balance">0.36</div>
        <div class="manage-item-text">余额</div>
      </div>
    </div> -->
    <!-- 文章列表渲染 -->
    <virtual-list
      v-if="editorList.length > 0"
      :listData="editorList"
    ></virtual-list>
  </div>
</template>

<script>
import VirtualList from "../common/component/VirtualList.vue";

export default {
  data() {
    return {
      editorList: [],
    };
  },
  components: {
    VirtualList,
  },
  activated() {
    this.getEditorList();
  },
  methods: {
    async getEditorList() {
      this.$api.editor
        .getEditorDataList()
        .then((res) => {
          console.log(res);
          if (res.code === 200) {
            this.editorList = res.data;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style  lang="less" scoped>
.member-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 10px 15px 10px 15px;
  padding: 5px;
  border-radius: 5px;
  -webkit-background-image: linear-gradient(to right, #f7e491, #fcf0da);
  background-image: linear-gradient(to right, #f7e491, #fcf0da);
  box-sizing: border-box;
}
.card-left {
  display: flex;
  align-items: center;
  padding: 5px 10px;
  box-sizing: border-box;
}
.king-text {
  margin-left: 10px;
  font-weight: 400;
}
.card-right {
  font-size: 12px;
  padding-right: 10px;
}
.king-img {
  width: 20px;
}
.manage {
  display: flex;
  align-items: center;
  padding: 10px 15px;
  background-color: #fff;
}
.manage-item {
  flex: 1;
  text-align: center;
}
.manage-item-text {
  font-size: 14px;
  font-weight: 500;
}
.coupon {
  font-size: 18px;
  font-weight: 800;
}
.balance {
  font-size: 18px;
  font-weight: 800;
}
.poket-icon {
  width: 25px;
}
.line-right {
  border-right: 1px solid #eee;
}
</style>