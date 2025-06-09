# 表单项 ProField
<!--single-column-->

一个表单除了 `Form` 之外还是需要一系列的表单项，`ProForm` 自带了数量可观的表单项，这些组件本质上是 `NFormItem` 和组件的结合，我们可以把他们当成一个 `NFormItem` 来使用，并且支持各种 `props`。每个表单项都支持 `fieldProps` 属性来支持设置输入组件的 `props`。 我们支持了 `placeholder` 的透传，你可以直接在组件上设置 `placeholder`。
每个表单项同时也支持了 `readonly` ，不同的组件会有不同的只读样式，与 disable 相比 readonly 展示更加友好。生成的 dom 也更小（PS：这段说明是抄的 [ProComponents](https://procomponents.ant.design/components/field-set#proformtext-demo-components-other)，因为懒得写一大段字）

ProInput 是 NFormItem + Input 的产物，可以简单理解成以下的代码
```html
<!-- ProInput -->
<template>
  <n-form-item v-bind="$props">
    <n-input :placeholder="$props.placeholder" v-bind="$props.fieldProps" />
  </n-form-item>
</template>
```

<n-alert type="warning" title="注意" :bordered="false">
  我们给 ProInput 设置的 props 其实是 NFormItem 的，fieldProps 才是包含的组件的，要切记。
</n-alert>

## 演示

```demo
item.vue
date.vue
upload.vue
update-value.vue
link-visible-hidden.vue
link-async-loop.vue
cross-component.vue
feedback.vue
input-slot.vue
```

## API
### 通用的属性
每个表单项都支持以下属性，引用到的类型声明介绍如下
```typescript
import type { Ref } from 'vue'
import type { PopoverProps } from 'naive-ui'
import type { Dependencie } from 'pro-naive-ui'
```

| 名称                                                                                          | 类型                                   | 默认值 | 说明                                                                                                                     | 版本 |
| --------------------------------------------------------------------------------------------- | -------------------------------------- | ------ | ------------------------------------------------------------------------------------------------------------------------ | ---- |
| title                                                                                         | `string`                               | `-`    | 同 `label`，为了工程化统一                                                                                               |      |
| readonly                                                                                      | `boolean`                              | `-`    | 是否为只读态，如果设置给了 `pro-form-list`，会应用到内部的控件中，不包含嵌套的 `pro-form-list`                           |      |
| preserve                                                                                      | `boolean`                              | `true` | 字段被隐藏或卸载时是否还保留值                                                                                           |      |
| visible                                                                                       | `boolean`                              | `-`    | 是否显示，优先级高于 `hidden`                                                                                            |      |
| hidden                                                                                        | `boolean`                              | `-`    | 是否隐藏，优先级低于 `visible`                                                                                           |      |
| placeholder                                                                                   | `any`                                  | `-`    | 会透传给支持 `placeholder` 的控件，`pro-form-list` 中不支持该属性                                                        |      |
| fieldProps                                                                                    | `object`                               | `-`    | 控件的 `props`，比如 `pro-input` 控件，这里就支持 `n-input` 的所有 `props`，其他控件同理，`pro-form-list` 中不支持该属性 |      |
| onChange                                                                                      | `(val: any) => void`                   | `-`    | 字段值发生变化后触发的回调函数，手动交互才会触发，`pro-form-list` 中不支持该属性                                         |      |
| onUpdateValue                                                                                 | `(value: any, ...args: any[]) => void` | `-`    | 手动更新值，<n-a href="#input-value.vue">查看完整例子</n-a>，`pro-form-list` 中不支持该属性                              |      |
| tooltip                                                                                       | `string \| string[]`                   | `-`    | 显示在 `label` 右边的提示                                                                                                |      |
| [参考 NFormItem Props](https://www.naiveui.com/zh-CN/os-theme/components/form#FormItem-Props) |                                        |        |                                                                                                                          |      |

### 通用的插槽
每个表单项支持`自身插槽` + `form-item 插槽`外，还支持以下插槽

| 名称     | 参数                                                                                                                              | 说明                                                                                                                                                                                                                                                                           | 版本 |
| -------- | --------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---- |
| input    | `(opt:{readonly: boolean;inputProps: object; inputDom: VNodeChild})`                                                              | `readonly` 是否为只读态，`inputProps` 是传递给表单项组件的所有 `props`，`inputDom` 是表单项虚拟 dom（会根据 `readonly` 自动切换）                                                                                                                                              |      |
| feedback | `(opt:{errors: ValidateError;warnings: ValidateError; feedbacks: ValidateError; feedbackColor: string; feedbackDom: VNodeChild})` | `errors` 是表单项验证的错误信息列表，`warnings` 是表单项验证的警告信息列表，`feedbacks` 是表单项验证的反馈信息列表（warnings 和 errors 信息内部自动判断），`feedbackColor` 是表单项验证的反馈信息颜色（warnings 和 errors 颜色内部自动判断），`feedbackDom` 是反馈信息虚拟 dom |      |

### ProTreeSelect
基于 [n-tree-select](https://www.naiveui.com/zh-CN/os-theme/components/tree-select) 封装
```html
<template>
  <pro-tree-select
    title="树形选择"
    path="tree-select"
    :field-props="nTreeSelectProps"
  />
</template>
```

### ProFormList
详情看 [pro-form-list](form-list)

### ProInput
基于 [n-input](https://www.naiveui.com/zh-CN/os-theme/components/input) 封装
```html
<template>
  <pro-input
    title="名称"
    path="name"
    :field-props="nInputProps"
  />
</template>
```

### ProPassword
基于 [n-input](https://www.naiveui.com/zh-CN/os-theme/components/input) 封装
```html
<template>
  <pro-password
    title="密码"
    path="password"
    :field-props="nInputProps"
  />
</template>
```

### ProTextarea
基于 [n-input](https://www.naiveui.com/zh-CN/os-theme/components/input) 封装
```html
<template>
  <pro-textarea
    title="文本域"
    path="textarea"
    :field-props="nInputProps"
  />
</template>
```

### ProAutoComplete
基于 [n-auto-complete](https://www.naiveui.com/zh-CN/os-theme/components/auto-complete) 封装
```html
<template>
  <pro-auto-complete
    title="自动填充"
    path="auto-complete"
    :field-props="nAutoCompleteProps"
  />
</template>
```

### ProCascader
基于 [n-cascader](https://www.naiveui.com/zh-CN/os-theme/components/cascader) 封装
```html
<template>
  <pro-cascader
    title="级联选择"
    path="cascader"
    :field-props="nNCascaderProps"
  />
</template>
```

### ProCheckbox
基于 [n-checkbox](https://www.naiveui.com/zh-CN/os-theme/components/checkbox) 封装
```html
<template>
  <pro-checkbox
    title="复选框"
    path="checkbox"
    :field-props="nNCheckboxProps"
  />
</template>
```

### ProCheckboxGroup
基于 [n-checkbox-group](https://www.naiveui.com/zh-CN/os-theme/components/checkbox) 封装，`fieldProps` 中新增了一些属性
- labelField：label 属性的字段名，默认 'label'
- valueField：value 属性的字段名，默认 'value'
- flexProps: 传递给 `n-flex` 的属性，默认使用 `n-flex` 布局
- options: 每一项 `n-checkbox` 的配置
```html
<template>
  <pro-checkbox-group
    title="复选框组"
    path="checkbox-group"
    :field-props="{
      labelField:'a',
      valueField:'b',
      flexProps:{
        vertical:true
      },
      options:[
        {a:'北京',b:0}
      ],
      ...nCheckboxGroupProps
    }"
  />
</template>
```

### ProColorPicker
基于 [n-color-picker](https://www.naiveui.com/zh-CN/os-theme/components/color-picker) 封装<br/>
`n-color-picker` 的 `label` 插槽因为和通用插槽有冲突，所以改名为 `picker-label`
```html
<template>
  <pro-color-picker
    title="颜色选择器"
    path="color-picker"
    :field-props="nColorPickerProps"
  >
    <!-- 用 picker-label 插槽代替组件本身的 label 插槽 -->
    <template #picker-label>title...</template>
  </pro-color-picker>
</template>
```

### ProDate
基于 [n-date-picker](https://www.naiveui.com/zh-CN/os-theme/components/date-picker) 封装，请直接使用 `placeholder` 属性代替 `startPlaceholder` 和 `endPlaceholder`，支持字符串格式和时间戳格式，以下是和 `n-date-picker type` 属性的映射关系
- pro-date：等同于 type 为 'date'
- pro-date-year：等同于 type 为 'year'
- pro-date-week：等同于 type 为 'week'
- pro-date-time：等同于 type 为 'datetime'
- pro-date-month：等同于 type 为 'month'
- pro-date-quarter：等同于 type 为 'quarter'
- pro-date-range：等同于 type 为 'daterange'
- pro-date-year-range：等同于 type 为 'yearrange'
- pro-date-time-range：等同于 type 为 'datetimerange'
- pro-date-month-range：等同于 type 为 'monthrange'
- pro-date-quarter-range：等同于 type 为 'quarterrange'

```html
<template>
  <pro-date-range
    title="日期范围"
    path="date-range"
    :placeholder="['开始','结束']"
  />
</template>
```

### ProDigit
基于 [n-input-number](https://www.naiveui.com/zh-CN/os-theme/components/input-number) 封装
```html
<template>
  <pro-digit
    title="数字"
    path="digit"
    :field-props="nInputNumberProps"
  />
</template>
```

### ProDynamicTags
基于 [n-dynamic-tags](https://www.naiveui.com/zh-CN/os-theme/components/dynamic-tags) 封装
```html
<template>
  <pro-dynamic-tags
    title="动态标签"
    path="dynamic-tags"
    :field-props="nDynamicTagsProps"
  />
</template>
```

### ProMention
基于 [n-mention](https://www.naiveui.com/zh-CN/os-theme/components/mention) 封装
```html
<template>
  <pro-dynamic-tags
    title="动态标签"
    path="dynamic-tags"
    :field-props="nDynamicTagsProps"
  />
</template>
```

### ProRadioGroup
基于 [n-radio](https://www.naiveui.com/zh-CN/os-theme/components/radio) 封装，`fieldProps` 中新增了一些属性
- labelField：label 属性的字段名，默认 'label'
- valueField：value 属性的字段名，默认 'value'
- flexProps: 传递给 `n-flex` 的属性，默认使用 `n-flex` 布局
- options: 每一项 `n-radio` 的配置
```html
<template>
  <pro-radio-group
    title="单选框组"
    path="radio-group"
    :field-props="{
      labelField:'a',
      valueField:'b',
      flexProps:{
        vertical:true
      },
      options:[
        {a:'北京',b:0}
      ],
      ...nRadioGroupProps
    }"
  />
</template>
```

### ProRate
基于 [n-rate](https://www.naiveui.com/zh-CN/os-theme/components/rate) 封装
```html
<template>
  <pro-rate
    title="评分"
    path="rate"
    :field-props="nRateProps"
  />
</template>
```

### ProSelect
基于 [n-select](https://www.naiveui.com/zh-CN/os-theme/components/select) 封装
```html
<template>
  <pro-select
    title="下拉框"
    path="select"
    :field-props="nSelectProps"
  />
</template>
```

### ProSlider
基于 [n-slider](https://www.naiveui.com/zh-CN/os-theme/components/slider) 封装
```html
<template>
  <pro-slider
    title="滑动选择"
    path="slider"
    :field-props="nSliderProps"
  />
</template>
```

### ProSwitch
基于 [n-switch](https://www.naiveui.com/zh-CN/os-theme/components/switch) 封装
```html
<template>
  <pro-slider
    title="开关"
    path="switch"
    :field-props="nSwitchProps"
  />
</template>
```

### ProTime
基于 [n-time-picker](https://www.naiveui.com/zh-CN/os-theme/components/time-picker) 封装，支持字符串格式和时间戳格式
```html
<template>
  <pro-time
    title="时间"
    path="time"
    :field-props="nTimePickerProps"
  />
</template>
```

### ProTransfer
基于 [n-transfer](https://www.naiveui.com/zh-CN/os-theme/components/transfer) 封装，请直接使用 `placeholder` 属性代替 `sourceFilterPlaceholder` 和 `targetFilterPlaceholder`，`fieldProps` 中新增了一些属性
- labelField：label 属性的字段名，默认 'label'
- valueField：value 属性的字段名，默认 'value'
```html
<template>
  <pro-transfer
    title="穿梭框"
    path="transfer"
    :field-props="{
      labelField:'a',
      valueField:'b',
      ...nTransferProps
    }"
  />
</template>
```

### ProUpload
基于 [n-upload](https://www.naiveui.com/zh-CN/os-theme/components/upload) 封装，`fieldProps` 中新增了一些属性
- title：按钮文本，优先级低于默认插槽
- maxSize：文件的最大大小，单位 kb
- onlyAcceptImage：是否只允许上传图片类型
- onOverSize：超出文件最大大小时触发的回调
- onUnAcceptType：上传不支持的类型文件时触发的回调
```html
<template>
  <pro-upload
    title="上传"
    path="upload"
    :field-props="{
      title:'资源上传',
      maxSize:1024 * 10,
      onlyAcceptImage:true,
      onOverSize:(data) =>{
        console.log('超出文件大小',data)
      },
      onUnAcceptType:(data) =>{
        console.log('不支持的格式',data)
      },
      ...nUploadProps
    }"
  />
</template>
```
