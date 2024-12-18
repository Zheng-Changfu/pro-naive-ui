# 全局配置 ProConfigProvider
<!--single-column-->

我们在 `NConfigProvider` 组件的基础上扩展了一些功能
- 组件的 `props` 可覆盖,还内置了[表单可清空的组件](form#clearable.vue)
- `empty` 定制
- 语言包扩展
- [全局转换简约组件的值](plain#transform.vue)

## 演示

```demo
prop-overrides.vue
empty.vue
locale.vue
edit-i18n.vue
```

## API
### ProConfigProvider 属性
引用到的类型声明介绍如下
```typescript
import type { PlainComponentValueTransform } from 'pro-naive-ui'
```

| 名称                                                                                                           | 类型                                               | 默认值 | 说明                                                            | 版本 |
| -------------------------------------------------------------------------------------------------------------- | -------------------------------------------------- | ------ | --------------------------------------------------------------- | ---- |
| empty                                                                                                          | `string \| ((wrappedIn: WrappedIn) => VNodeChild)` | `'-'`  | 当内容为空时显示的内容,<n-a href="#empty.vue">查看例子</n-a>    |      |
| propOverrides                                                                                                  | `Record<string, object>`                           | `-`    | 覆盖组件 `props`,<n-a href="#prop-overrides.vue">查看例子</n-a> |      |
| plainComponentValueTransform                                                                                   | `PlainComponentValueTransform`                     | `-`    | 简约组件的值转换,[查看例子](plain#transform.vue)                |      |
| [参考 NConfigProvider](https://www.naiveui.com/zh-CN/os-theme/components/config-provider#ConfigProvider-Props) |                                                    |        |                                                                 |      |
