# 卡片 ProCard
<!--single-column-->

它是 [NCard](https://www.naiveui.com/zh-CN/os-theme/components/card) 和 [NCollapseTransition](https://www.naiveui.com/zh-CN/os-theme/components/collapse-transition) 的结合，
因为 [NCollapseTransition](https://www.naiveui.com/zh-CN/os-theme/components/collapse-transition) 不支持 `v-show`，所以我们内部做了单独的封装让其支持 `v-show`，你可以把它当成正常的卡片使用


## 演示

```demo
basic.vue
manual.vue
trigger-area.vue
switcher.vue
```

## API
### ProCard 属性
<!--replace、n-card、props、https://www.naiveui.com/zh-CN/os-theme/components/card#Card-Props-->
<!--replace、n-collapse-transition、props、https://www.naiveui.com/zh-CN/os-theme/components/collapse-transition#CollapseTransition-Props-->

| 名称         | 类型                     | 默认值             | 说明                                                       | 版本 |
| ------------ | ------------------------ | ------------------ | ---------------------------------------------------------- | ---- |
| tooltip      | `string \| string[]`     | `-`                | 提示文字，显示在 `title` 的右边                            |      |
| triggerAreas | `Array<'main'\|'arrow'>` | `['main','arrow']` | 触发展开的区域，如果不想让某些区域触发展开，可以使用此属性 |      |
| showCollapse | `boolean`                | `-`                | 是否显示展开收起                                           |      |

### ProCard 插槽
<!--replace、n-card、slots、https://www.naiveui.com/zh-CN/os-theme/components/card#Card-Slots-->

| 名称     | 参数                           | 说明           | 版本 |
| -------- | ------------------------------ | -------------- | ---- |
| collapse | `(opts:{ expanded: boolean })` | 自定义展开收起 |      |

### 默认关闭展开收起
如果你想默认关闭展开收起，参考[组件 Props 覆盖](config-provider#prop-overrides.vue)
