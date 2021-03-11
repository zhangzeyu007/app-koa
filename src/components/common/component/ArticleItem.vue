<!--
 * @Description: 组件
 * @Author: 海象
 * @Date: 2021-03-10 10:34:39
 * @LastEditors: 海象
 * @LastEditTime: 2021-03-11 14:19:01
-->
<template>
  <div class="article-item">
    <!-- 显示文章列表 -->
    <div class="top">{{ article.title }}</div>
    <div class="bottom">
      <div class="content">
        {{ article.content }}
      </div>
      <div class="like-num">
        <img
          class="icon-heart"
          src="../../../../static/image/member/icon_heart_l.png"
        />
        <span>关注</span>
        <span>10</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["article"],
  data() {
    return {};
  },
};
</script>

<style lang="less" scoped>
.article-item {
  position: relative;
  display: flex;
  align-items: center;
  flex-direction: column;
  margin: 10px 15px;
  padding: 10px 15px;
  box-sizing: border-box;
  border: 1px solid #eee;

  .top {
    flex-shrink: 0;
    padding: 5px 0;
    font-weight: 600;
  }
  .bottom {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    .content {
      overflow: hidden;
      height: 100px;
      text-overflow: ellipsis;
    }
    .like-num {
      position: absolute;
      bottom: 8px;
      right: 10px;
      font-size: 12px;
      text-align: right;
    }
    .icon-heart {
      width: 15px;
    }
  }
}
</style>