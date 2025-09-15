# 弹窗表单 ProModalForm
<!--single-column-->

这个组件是 [ProModal](modal) 和 [ProForm](form) 的结合体，为了更方便的控制弹窗，我们还扩展了 `createProForm`，
增加了 `open`、`close` 方法

## 演示

```demo
basic.vue
custom-button.vue
edit-form.vue
```

## API
### ProModalForm 属性
<!--replace、pro-form、props、form#ProForm-属性-->
<!--replace、pro-modal、props、modal#ProModal-属性-->
<!--replace、n-form、props、https://www.naiveui.com/zh-CN/os-theme/components/form#Form-Props-->

引用到的类型声明介绍如下
```typescript
import type { VNodeChild } from 'vue'
import type { ProButtonProps, ProModalProps } from 'pro-naive-ui'

type FooterRender = (opt: {footerDom: VNodeChild}) => VNodeChild
```

<n-alert type="warning" title="注意" :bordered="false">
  不支持 v-model:show，请使用 createProModalForm 暴露的 open、close、show 等 api 代替
</n-alert>

| 名称                  | 类型                      | 默认值    | 说明                                                | 版本 |
| --------------------- | ------------------------- | --------- | --------------------------------------------------- | ---- |
| width                 | `string`                  | `'600px'` | 弹窗宽度(css 值)                                    |      |
| maxHeight             | `string`                  | `'80%'`   | 弹窗最大高度，超过后内容区域出现滚动条（css 值）    |      |
| closeOnLoading        | `boolean`                 | `false`   | `loading` 时是否可以关闭弹窗                        |      |
| restoreValuesOnClosed | `boolean`                 | `true`    | 关闭弹窗后是否重置表单                              |      |
| resetButtonProps      | `false \| ProButtonProps` | `-`       | 传递给取消按钮的属性，`false` 不显示按钮            |      |
| submitButtonProps     | `false \| ProButtonProps` | `-`       | 传递给确认按钮的属性，`false` 不显示按钮            |      |
| proModalProps         | `ProModalProps`           | `-`       | 透传给 `pro-modal` 的属性，某些属性有冲突时可能有用 |      |
| footer                | `false \| FooterRender`   | `-`       | 自定义弹窗底部，`false` 不显示                      |      |

### ProModalForm 插槽
<!--replace、pro-modal、slots、modal#ProModal-插槽-->

引用到的类型声明介绍如下
```typescript
import type { VNodeChild } from 'vue'
```

| 名称   | 参数                                           | 说明                                                 | 版本 |
| ------ | ---------------------------------------------- | ---------------------------------------------------- | ---- |
| footer | `(opt: {footerDom: VNodeChild}) => VNodeChild` | 自定义弹窗底部，`footerDom` 是弹窗底部默认的虚拟 dom |      |

### createProModalForm
<!--replace、pro-form、createProForm、form#createProForm-Returned-->

创建一个弹窗表单控制器，如果已经注册了控制器，想在后代组件中使用，无需透传，可以使用 `useInjectProModalForm` 方法直接注入，
用法同 [createProForm](form#createProForm)，调用后的返回值增加了几个参数

| 名称  | 类型           | 默认值 | 说明             | 版本 |
| ----- | -------------- | ------ | ---------------- | ---- |
| open  | `() => void`   | `-`    | 打开弹窗         |      |
| close | `() => void`   | `-`    | 关闭弹窗         |      |
| show  | `Ref<boolean>` | `-`    | 当前弹窗显示状态 |      |

### 属性冲突
因为组件同时支持 `ProForm` 和 `ProModal` 的所有属性，他们可能会有一些重名属性，这时候 `ProForm` 的属性优先级更高，如果你需要给 `ProModal`
也设置对应的属性，请写到 `proModalProps` 属性上
```html
<pro-modal-form
  size="small"
  :pro-modal-props="{
    size:'small'
  }"
></pro-modal-form>
```

### 默认值调整
我们为了更加的好用，调整了一些默认值，如果你不满意，可以参考[组件 Props 覆盖](config-provider#prop-overrides.vue)
- `closeOnEsc` 调整为 `false`
- `maskClosable` 调整为 `false`

### 用不了 dialog 预设
因为是弹窗表单，`dialog` 形态不足以承载表单，你只能设置预设为 `card` 或者不用预设

### 后代组件想打开弹窗
可以使用 `useInjectProModalForm` 方法直接注入
```html
<!-- 父组件 -->
<script setup lang="ts">
import { createProModalForm } from 'pro-naive-ui'

const modalForm = createProModalForm()
</script>

<template>
  <pro-modal-form :form="modalForm">
    <pro-input path="name" />
  </pro-modal-form>
</template>

<!-- 后代组件 -->
<script setup lang="ts">
import { useInjectProModalForm } from 'pro-naive-ui'

const modalForm = useInjectProModalForm<{name?:string}>()!
</script>

<template>
  <n-button @click="modalForm.open">打开弹窗</n-button>
</template>
```
