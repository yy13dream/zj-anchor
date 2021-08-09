# zj-anchor

基于 vue2.0+的锚点快速定位组件

## Project setup

```
npm install zj-anchor
```

### Usage

```
import anchor from 'zj-anchor'
import 'zj-anchor/lib/index.css'
```

### Api

| 参数         | 说明                                                                                                                   | 类型             | 默认值    |
| ------------ | ---------------------------------------------------------------------------------------------------------------------- | ---------------- | --------- |
| current      | 当前高亮锚点                                                                                                           | [String, Number] | 0         |
| list         | 锚点列表数据，参数详见 list props                                                                                      | Array            | []        |
| targetEl     | 通过唯一元素标识获取锚点列表数据（此时 list 参数失效），targetEl 获取的元素必须存在锚点对应的 id 属性及锚点 title 文字 | String           | ''        |
| color        | 锚点文字颜色                                                                                                           | String           | '#999'    |
| activeColor  | 高亮锚点文字颜色                                                                                                       | String           | '#3470ff' |
| offsetTop    | 距离窗口顶部达到指定偏移量后触发                                                                                       | [String, Number] | 50        |
| offsetBottom | 距离窗口底部达到指定偏移量后触发                                                                                       | [String, Number] | 150       |

### list props

| 参数  | 说明         | 类型   | 默认值 |
| ----- | ------------ | ------ | ------ |
| title | 锚点文字内容 | String | ''     |
| href  | 锚点链接     | String | ''     |

### eg

- list 模式:

```
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
  }
}
</script>
```

- targetEl 自动获取模式:

```
<template>
  <div id="app" class="box">
    <div class="main">
      <div class="panel" id="food1">西瓜</div>
      <div class="panel" id="food2">葡萄</div>
      <div class="panel" id="food3">梨子</div>
      <div class="panel" id="food4">苹果</div>
      <div class="panel" id="food5">香蕉</div>
    </div>
    <zj-anchor targetEl="#app .panel" :current="1"></zj-anchor>
  </div>
</template>

<script>

export default {
  name: 'App',
  data () {
    return {
    }
  }
}
</script>
```

### 效果预览图

![img preview](https://raw.githubusercontent.com/yy13dream/imgFolder/master/anchor-preview.jpg)
