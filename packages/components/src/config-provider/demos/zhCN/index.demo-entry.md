# 全局配置 ProConfigProvider
<!--single-column-->

我们在 `NConfigProvider` 组件的基础上扩展了一些功能
- 组件的 `props` 可覆盖，还内置了[表单可清空的组件](form#clearable.vue)
- `empty` 定制
- 语言包扩展

## 演示

```demo
prop-overrides.vue
empty.vue
locale.vue
edit-i18n.vue
```

## API
### ProConfigProvider 属性
<!--replace、n-config-provider、props、https://www.naiveui.com/zh-CN/os-theme/components/config-provider#ConfigProvider-Props-->

| 名称          | 类型                                           | 默认值 | 说明                                                             | 版本 |
| ------------- | ---------------------------------------------- | ------ | ---------------------------------------------------------------- | ---- |
| propOverrides | `Record<string, object>`                       | `-`    | 覆盖组件 `props`，<n-a href="#prop-overrides.vue">查看例子</n-a> |      |
| empty         | `Record<string, string \| (() => VNodeChild)>` | `-`    | 空内容渲染，<n-a href="#empty.vue">查看例子</n-a>                |      |
