<template>
  <div id="app" class="box">
    <div class="main">
      <div class="panel" id="food1">西瓜</div>
      <div class="panel" id="food2">葡萄</div>
      <div class="panel" id="food3">梨子</div>
      <div class="panel" id="food4">苹果</div>
      <div class="panel" id="food5">香蕉</div>
    </div>
    <zj-anchor :list="list" :current="1"></zj-anchor>
  </div>
</template>

<script>

export default {
  name: 'App',
  data () {
    return {
      list: [
        { title: '西瓜', href: '#food1' },
        { title: '葡萄', href: '#food2' },
        { title: '梨子', href: '#food3' },
        { title: '苹果', href: '#food4' },
        { title: '香蕉', href: '#food5' },
      ]
    }
  },
  created() {
  },
  methods: {
    
  }
}
</script>
<style>
.box{
  display: flex;
  height: 100vh;
}
.main {
  flex: 1;
}
[id^='food'] {
  height: 400px;
  font-size: 20px;
}
</style>

