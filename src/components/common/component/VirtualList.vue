<!--
 * @Description: 组件
 * @Author: 海象
 * @Date: 2021-03-10 09:00:13
 * @LastEditors: 张泽雨
 * @LastEditTime: 2022-04-26 13:25:17
-->
<template>
  <div
    ref="list"
    class="list-container"
    @scroll="scrollEvent($event)"
    :style="{ height: screenHeight + 'px' }"
  >
    <div class="list-phantom" :style="{ height: listHeight + 'px' }"></div>
    <div class="list" :style="{ transform: getTransform }">
      <!-- 内容展示组件 -->
      <acticle-item
        class="article-item"
        v-for="item in visibleData"
        :key="item._id"
        :article="item"
        :style="{ height: size + 'px' }"
      >
      </acticle-item>
    </div>
  </div>
</template>

<script>
import ActicleItem from "./ArticleItem";

export default {
  props: {
    listData: {
      type: Array,
      default: () => [],
    },
    size: {
      type: Number,
      default: 200,
    },
  },
  data() {
    return {
      screenHeight: 600,
      startOffset: 0,
      start: 0, // 开始索引
      end: 4, // 结束的索引
    };
  },

  components: {
    ActicleItem,
  },

  computed: {
    //列表总高度
    listHeight() {
      return this.listData.length * this.size;
    },
    //可显示的列表项数
    visibleCount() {
      return Math.ceil(this.screenHeight / this.size);
    },
    //偏移量对应的style
    getTransform() {
      return `translate3d(0,${this.startOffset}px,0)`;
    },
    //获取真实显示列表数据
    visibleData() {
      return this.listData.slice(
        this.start,
        Math.min(this.end, this.listData.length)
      );
    },
  },

  activated() {
    this.startOffset = 0;
  },

  mounted() {
    // 获取可视屏幕的高度
    this.screenHeight = window.innerHeight - 50;
    this.start = 0;
    this.end = this.start + this.visibleCount;
  },
  methods: {
    scrollEvent() {
      //当前滚动位置
      let scrollTop = this.$refs.list.scrollTop;
      //此时的开始索引
      this.start = Math.floor(scrollTop / this.size);
      //此时的结束索引
      this.end = this.start + this.visibleCount;
      //此时的偏移量
      this.startOffset = scrollTop - (scrollTop % this.size);
    },
  },
};
</script>

<style lang="less" scoped>
.list-container {
  overflow: auto;
  position: relative;
  -webkit-overflow-scrolling: touch;
}

.list-phantom {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  z-index: -1;
}

.list {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
}

.article-item {
  margin-top: 10px;
}
</style>
