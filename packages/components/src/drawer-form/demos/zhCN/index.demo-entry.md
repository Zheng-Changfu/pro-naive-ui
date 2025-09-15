# 抽屉表单 ProDrawerForm
<!--single-column-->

这个组件是 [NDrawer](https://www.naiveui.com/zh-CN/os-theme/components/drawer) 和 [ProForm](form) 的结合体，为了更方便的控制抽屉，我们还扩展了 `createProForm`，
增加了 `open`、`close` 方法

## 演示

```demo
basic.vue
custom-button.vue
edit-form.vue
```

## API
### ProDrawerForm 属性
<!--replace、pro-form、props、form#ProForm-属性-->
<!--replace、n-form、props、https://www.naiveui.com/zh-CN/os-theme/components/form#Form-Props-->
<!--replace、n-drawer、props、https://www.naiveui.com/zh-CN/os-theme/components/drawer#Drawer-Props-->

引用到的类型声明介绍如下
```typescript
import type { DrawerProps } from 'naive-ui'
```

<n-alert type="warning" title="注意" :bordered="false">
  不支持 v-model:show，请使用 createProDrawerForm 暴露的 open、close、show 等 api 代替
</n-alert>

| 名称                  | 类型          | 默认值  | 说明                                               | 版本 |
| --------------------- | ------------- | ------- | -------------------------------------------------- | ---- |
| closeOnLoading        | `boolean`     | `false` | `loading` 时是否可以关闭抽屉                       |      |
| restoreValuesOnClosed | `boolean`     | `true`  | 关闭抽屉后是否重置表单                             |      |
| drawerProps           | `DrawerProps` | `-`     | 透传给 `n-drawer` 的属性，某些属性有冲突时可能有用 |      |

### ProDrawerContent 属性
<!--replace、n-drawer、n-drawer-content-props、https://www.naiveui.com/zh-CN/os-theme/components/drawer#DrawerContent-Props-->

引用到的类型声明介绍如下
```typescript
import type { VNodeChild } from 'vue'
import { ProButtonProps } from 'pro-naive-ui'

type FooterRender = (opt: {footerDom: VNodeChild}) => VNodeChild
```
| 名称              | 类型                      | 默认值 | 说明                                     | 版本 |
| ----------------- | ------------------------- | ------ | ---------------------------------------- | ---- |
| resetButtonProps  | `false \| ProButtonProps` | `-`    | 传递给取消按钮的属性，`false` 不显示按钮 |      |
| submitButtonProps | `false \| ProButtonProps` | `-`    | 传递给确认按钮的属性，`false` 不显示按钮 |      |
| footer            | `false \| FooterRender`   | `-`    | 自定义抽屉底部，`false` 不显示           |      |

### ProDrawerContent 插槽
<!--replace、n-drawer、n-drawer-content-slots、https://www.naiveui.com/zh-CN/os-theme/components/drawer#DrawerContent-Slots-->

| 名称 | 参数 | 说明 | 版本 |
| ---- | ---- | ---- | ---- |

### createProDrawerForm
<!--replace、pro-form、createProForm、form#createProForm-Returned-->

创建一个抽屉表单控制器，如果已经注册了控制器，想在后代组件中使用，无需透传，可以使用 `useInjectProDrawerForm` 方法直接注入，
用法同 [createProForm](form#createProForm)，调用后的返回值增加了几个参数

| 名称  | 类型           | 默认值 | 说明             | 版本 |
| ----- | -------------- | ------ | ---------------- | ---- |
| open  | `() => void`   | `-`    | 打开抽屉         |      |
| close | `() => void`   | `-`    | 关闭抽屉         |      |
| show  | `Ref<boolean>` | `-`    | 当前抽屉显示状态 |      |

### 属性冲突
因为组件同时支持 `ProForm` 和 `NDrawer` 的所有属性，他们可能会有一些重名属性，这时候 `ProForm` 的属性优先级更高，如果你需要给 `NDrawer`
也设置对应的属性，请写到 `drawerProps` 属性上
```html
<pro-drawer-form
  :theme-overrides="{}"
  :drawer-props="{
    themeOverrides:{}
  }"
></pro-drawer-form>
```

### 默认值调整
我们为了更加的好用，调整了一些默认值，如果你不满意，可以参考[组件 Props 覆盖](config-provider#prop-overrides.vue)
- `closeOnEsc` 调整为 `false`
- `maskClosable` 调整为 `false`
- `autoFocus` 调整为 `false`
- `width` 调整为 `520`

### 后代组件想打开抽屉
可以使用 `useInjectProDrawerForm` 方法直接注入
```html
<!-- 父组件 -->
<script setup lang="ts">
import { createProDrawerForm } from 'pro-naive-ui'

const drawerForm = createProDrawerForm()
</script>

<template>
  <pro-drawer-form :form="drawerForm">
      ...
  </pro-form>
</template>

<!-- 后代组件 -->
<script setup lang="ts">
import { useInjectProDrawerForm } from 'pro-naive-ui'

const drawerForm = useInjectProDrawerForm<{name?:string}>()!
</script>

<template>
  <n-button @click="drawerForm.open">打开抽屉</n-button>
</template>
```
