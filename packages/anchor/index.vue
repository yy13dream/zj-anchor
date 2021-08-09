<template>
  <div class="anchor-wrapper">
    <div class="anchor-line">
      <div class="anchor-dot" :style="{top: dotTop + 'px', borderColor: activeColor}"></div>
    </div>
    <div class="anchor-content">
      <div v-for="(item, index) in ancList" :key="item.href" :ref="`anchor${index}`" class="anchor-link" @click="setCurrent(index)">
        <span class="anchor-link-title" :title="item.title" :style="{color: item.active ? activeColor : color}">{{item.title}}</span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Anchor',
  props: {
    // 当前高亮的锚点
    current: {
      type: [String, Number],
      default: 0
    },
    // 锚点列表数据
    list: {
      type: Array,
      default: () => []
    },
    // 锚点文字颜色
    color: {
      type: String,
      default: '#999'
    },
    // 高亮锚点文字颜色
    activeColor: {
      type: String,
      default: '#3470ff'
    },
    // 获取锚点数据的唯一el
    targetEl: {
        type: String,
        default: ''
    },
    // 距离窗口顶部达到指定偏移量后触发
    offsetTop: {
      type: [String, Number],
      default: 50
    },
    // 距离窗口顶部达到指定偏移量后触发
    offsetBottom: {
      type: [String, Number],
      default: 150
    }
  },
  data () {
    return {
      tList: [], // 根据targetEl获取的锚点数据
      dotTop: 0, // 当前锚点dot偏移量
    }
  },
  computed: {
    // 锚点列表数据
    ancList () {
      return this.targetEl ? this.tList : this.list
    }
  },
  watch: {
    current: {
      handler (val) {
        !this.targetEl && setTimeout(() => this.setCurrent(val), 100);
      },
      immediate: true
    }
  },
  mounted () {
    // 如果存在targetEl则初始化锚点数据
    this.targetEl && this.init();

    // 监听页面滚动事件
    const _this = this;
    window.onscroll = function(e) {
      window.requestAnimationFrame(() => _this.getActivePanel(e.target.scrollingElement.scrollTop))
    }
  },
  beforeDestroy () {
    window.onscroll = null
  },
  methods: {
    // 根据页面内容初始化锚点列表数据
    init () {
      const list = [];
      const items = document.querySelectorAll(this.targetEl);
      [...items].map(item => {
        if (!item.id) return;
        list.push({ href: '#' + item.id, title: item.innerHTML })
      })
      this.tList = list;
      // 解决初始化加载时默认scroll事件后执行的问题
      setTimeout(() => this.setCurrent(this.current), 100);
    },
    // 滚动面板时切换当前active锚点项
    getActivePanel (scrollTop) {
      const panels = this.ancList.map(item => {
        return document.querySelector(item.href)
      })
      panels.some((panel, index) => {
        if (!panel) return;
        const diff = scrollTop - panel.offsetTop;
        if (diff > -this.offsetBottom && diff < this.offsetTop) {
          this.setCurrent(index, true);
          return true
        }
      })
    },
    // 设置当前锚点
    setCurrent (index, noScroll) {
      const row = this.ancList[index];
      const els = this.$refs[`anchor${index}`];
      if (!els || !els.length) {
        console.warn('未获取到锚点数据')
        return
      };
      const e = els[0];
      if (!e) return;
      // 防止滚动事件再次触发滚动
      if (!noScroll) {
        const view = document.querySelector(row.href);
        if (!view) return;
        view.scrollIntoView();
      }
      // 设置高亮锚点
      this.ancList.map(item => {
          item.active = item.href === row.href 
          return item
      })
      this.dotTop = e.offsetTop + (e.offsetHeight / 2 - 4);
    }
  }
}
</script>
<style lang="less">
* {
  box-sizing: border-box;
}
.anchor-wrapper{
  max-width: 200px;
  max-height: calc(100vh - 100px);
  padding: 10px;
  position: fixed;
  right: 0;
  .anchor-line{
      width: 2px;
      min-height: 40px;
      background-color: #eee;
      position: absolute;
      left: 15px;
      top: 0;
      bottom: 0;
  }
  .anchor-dot{
      position: absolute;
      left: -3px;
      width: 8px;
      height: 8px;
      background-color: #fff;
      border-radius: 50%;
      border: 2px solid #3470ff;
      transition: top .2s;
  }
  .anchor-content{
      padding-left: 20px;
  }
  .anchor-link{
      padding: 5px 0;
      font-size: 12px;
      .anchor-link-title{
        color: #999;
        display: block;
        text-decoration: none;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        cursor: pointer;
        &:hover{
          color: #3470ff!important;
        }
      }
  }
}
</style>