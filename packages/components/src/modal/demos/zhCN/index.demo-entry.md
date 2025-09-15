# 弹窗 ProModal
基于 [NModal](https://www.naiveui.com/zh-CN/os-theme/components/modal) 封装，增加了拖拽

## 演示

```demo
draggable.vue
```

## API
### ProModal 属性
<!--replace、n-modal、props、https://www.naiveui.com/zh-CN/os-theme/components/modal#Modal-Props-->

| 名称      | 类型                             | 默认值 | 说明                                                   | 版本 |
| --------- | -------------------------------- | ------ | ------------------------------------------------------ | ---- |
| draggable | `boolean \| { bounds?: 'none' }` | `true` | 弹窗是否可拖拽，`bounds === 'none'` 控制拖拽可超出视口 |      |


### ProModal 插槽

| 名称                                                                   | 参数 | 说明 | 版本 |
| ---------------------------------------------------------------------- | ---- | ---- | ---- |
| [参考 NModal](https://www.naiveui.com/zh-CN/os-theme/components/modal) |      |      |      |

### 默认值调整
我们为了更加的好用，调整了一些默认值，如果你不满意，可以参考[组件 Props 覆盖](config-provider#prop-overrides.vue)
- `autoFocus` 调整为 `false`
