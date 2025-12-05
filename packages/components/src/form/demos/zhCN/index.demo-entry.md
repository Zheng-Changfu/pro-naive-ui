# 表单 ProForm
<!--single-column-->

ProForm 是对 [NForm](https://www.naiveui.com/zh-CN/os-theme/components/form) 的二次封装，你不在需要管理复杂的表单数据，我们内置了数据管理，同时 Modal 表单、Drawer 表单、查询表单、表单列表等多种可以覆盖大部分的使用场景，用更少的代码完成更多的功能

## 演示

```demo
basic.vue
initial-value.vue
watch-value.vue
clearable.vue
all-form.vue
form-layout.vue
async-form.vue
```

## API
### ProForm 属性
<!--replace、n-form、props、https://www.naiveui.com/zh-CN/os-theme/components/form#Form-Props-->

<n-alert type="warning" title="注意" :bordered="false">
  不支持 model 属性，数据管理被 createProForm 接管。
</n-alert>
<br />

| 名称              | 类型                                                      | 默认值    | 说明                           | 版本 |
| ----------------- | --------------------------------------------------------- | --------- | ------------------------------ | ---- |
| form              | 必填，参考 <n-a href="#createProForm">createProForm</n-a> | `-`       | 表单控制器                     |      |
| readonly          | `boolean`                                                 | `-`       | 表单是否为只读状态             |      |
| loading           | `boolean`                                                 | `false`   | 表单是否在提交中，防止重复提交 |      |
| validationTrigger | `ValidationTrigger \| ValidationTrigger[]`                | `'input'` | 表单验证时机                   |      |

### createProForm
创建一个表单控制器，如果已经注册了控制器，想在后代组件中使用，无需透传，可以使用 `useInjectProForm` 方法直接注入
```html
<!-- 父组件 -->
<script setup lang="ts">
import { createProForm } from 'pro-naive-ui'

const proForm = createProForm()
</script>

<template>
  <pro-form :form="proForm">
    <pro-input path="name" />
  </pro-form>
</template>

<!-- 后代组件 -->
<script setup lang="ts">
import { useInjectProForm } from 'pro-naive-ui'

const proForm = useInjectProForm()!
</script>

<template>
  <n-button @click="proForm.submit">手动提交表单</n-button>
</template>
```

### createProForm Options
下面列举的参数是传递给 `createProForm` 的，引用到的类型声明介绍如下
```typescript
interface ValidateError {
  field?: string
  message?: string
  fieldValue?: any
}
```


| 名称            | 类型                                                 | 默认值 | 说明                                                             | 版本  |
| --------------- | ---------------------------------------------------- | ------ | ---------------------------------------------------------------- | ----- |
| initialValues   | `object`                                             | `{}`   | 表单初始值，表单重置时会参考初始值                               |       |  |
| omitNil         | `boolean`                                            | `true` | 提交或读取 `fieldsValue` 时是否忽略 `null` 和 `undefined` 的数据 |       |  |
| omitEmptyString | `boolean`                                            | `true` | 提交或读取 `fieldsValue` 时是否忽略空字符串的数据                | 2.1.0 |  |
| onReset         | `() => void`                                         | `-`    | 数据重置后的回调                                                 |       |  |
| onSubmit        | `(values: any, warnings: ValidateError[][]) => void` | `-`    | 表单数据提交的回调                                               |       |  |
| onSubmitFailed  | `(errors: ValidateError[][]) => void`                | `-`    | 提交失败后回调                                                   |       |  |
| onValueChange   | `(opt:{ value: any; path: string }) => void`         | `-`    | 任何一项值发生变化后的回调(手动交互才会触发)                     |       |  |

### createProForm Returned
下面列举的参数是调用 `createProForm` 函数返回的，引用到的类型声明介绍如下
```typescript
import type { FormInst } from 'naive-ui'
import type { Ref, DeepReadonly } from 'vue'
import type { InternalPath, PathPattern } from 'pro-naive-ui'

interface FormItemInternalValidationResult {
  valid: boolean
  errors: ValidateError[]
  warnings: ValidateError[]
}
```


| 名称                     | 类型                                                                                                        | 说明                                                                                                                                                                                  | 版本  |
| ------------------------ | ----------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----- |
| values                   | `Ref<object>`                                                                                               | 所有的值（包含用户设置的和可能被隐藏的字段）                                                                                                                                          |       |  |
| fieldsValue              | `ComputedRef<object>`                                                                                       | 表单值(不包含被隐藏的和用户设置的)                                                                                                                                                    |       |
| submit                   | `() => void`                                                                                                | 手动提交表单，如果按钮包含在 `pro-form` 中，建议使用 `attr-type` 为 `submit` 提交                                                                                                     |       |
| validate                 | `(paths?: InternalPath, shouldRuleBeApplied?: FormItemRule => boolean) => ReturnType<FormInst['validate']>` | 校验单个字段、多个字段或整个表单                                                                                                                                                      |       |
| resetFieldValue          | `(path: InternalPath) => void`                                                                              | 重置指定路径字段的值                                                                                                                                                                  |       |
| resetFieldsValue         | `() => void`                                                                                                | 重置所有字段的值                                                                                                                                                                      |       |
| setInitialValue          | `(path: InternalPath, value: any) => void`                                                                  | 设置指定路径字段的初始值，重置字段值时会重置为设置的初始值或者本身的初始值                                                                                                            |       |
| setInitialValues         | `(values: object,strategy: 'overwrite' \| 'shallowMerge') => void`                                          | 设置多个字段初始值，重置字段值时会重置为设置的初始值或者本身的初始值，`strategy` 有2种合并值的策略，`shallowMerge` 代表和表单值浅合并，`overwrite` 代表重写表单值，默认为 `overwrite` |       |
| restoreFieldValue        | `(path: InternalPath) => void`                                                                              | 重置指定路径字段的值并清空校验                                                                                                                                                        |       |
| restoreFieldsValue       | `() => void`                                                                                                | 重置所有字段的值并清空校验，如果按钮包含在 `pro-form` 中，建议使用 `attr-type` 为 `reset` 重置                                                                                        |       |
| restoreValidation        | `(paths?: InternalPath) => void`                                                                            | 清空单个字段、多个字段或整个表单的校验                                                                                                                                                |       |
| getFieldValidationResult | `(path: InternalPath) => FormItemInternalValidationResult \| null`                                          | 获取字段值的表单校验结果                                                                                                                                                              |       |
| onReset                  | `(callback:() => void) => void`                                                                             | 数据重置后触发的钩子                                                                                                                                                                  | 2.3.0 |
| onSubmit                 | `(callback:({values: any, warnings: ValidateError[][]}) => void) => void`                                   | 表单数据提交后触发的钩子                                                                                                                                                              | 2.3.0 |
| onSubmitFailed           | `(callback:(errors:ValidateError[][]) => void) => void`                                                     | 提交失败后回调触发的钩子                                                                                                                                                              | 2.3.0 |
