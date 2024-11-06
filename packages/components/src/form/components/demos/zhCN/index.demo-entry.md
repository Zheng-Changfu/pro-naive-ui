# 表单项 ProField
<!--single-column-->

一个表单除了 `Form` 之外还是需要一系列的表单项，`ProForm` 自带了数量可观的表单项，这些组件本质上是 `NFormItem` 和组件的结合，我们可以把他们当成一个 `NFormItem` 来使用，并且支持各种 `props`。每个表单项都支持 `fieldProps` 属性来支持设置输入组件的 `props`。 我们支持了 `placeholder` 的透传，你可以直接在组件上设置 `placeholder`。
每个表单项同时也支持了 `readonly` ，不同的组件会有不同的只读样式，与 disable 相比 readonly 展示更加友好。生成的 dom 也更小（PS：这段说明是抄的 [ProComponents](https://procomponents.ant.design/components/field-set#proformtext-demo-components-other)，因为懒得写一大段字）

ProInput 是 NFormItem + Input 的产物，可以简单理解成以下的代码
```html
<!-- ProInput -->
<template>
  <n-form-item v-bind="$props">
    <n-input :placeholder="props.placeholder" v-bind="$props.fieldProps" />
  </n-form-item>
</template>
```
所以我们给 ProInput 设置的 props 其实是 NFormItem 的，fieldProps 才是包含的组件的，要切记。

## 演示

```demo
item.vue
date.vue
upload.vue
```

## API
### 通用的属性
| 名称 | 类型 | 默认值 | 说明 | 版本 |
| --- | --- | --- | --- | --- |
| simple | `boolean` | `false` | 精简模式，不包装 FormItem |  |
| title | `string` | | 同 label，为了工程化统一 |  |
| readonly | `boolean` | | 是否为只读态 |  |
| initialValue | `any` | | 初始值，优先级大于表单的 initialValues |  |
| value | `any` | | 表单值，优先级大于 initialValue |  |
| preserve | `boolean` | `true` | 字段被隐藏或删除时是否还保留值 |  |
| visible | `boolean` | | 是否显示 |  |
| hidden | `boolean` | | 是否隐藏 |  |
| addonBefore | `string` | | 表单项前缀 |  |
| addonAfter | `string` | | 表单项后缀 |  |
| validateBehavior | `string` | | 校验行为，为 `'popover'` 时验证不通过会通过 `popover` 进行提示 |  |
| validateBehaviorProps | `PopoverProps` | | 验证不通过时传递的属性，只在 validateBehavior 为 popover 时生效 |  |
| placeholder | `any` | | 会透传给支持 placeholder 的控件 |  |
| fieldProps | `Record<string,any>` | `{}` | 控件的 props，比如 `ProInput` 控件，这里就支持 `NInput` 的所有 `props`，其他控件同理 |  |
| dependencies | `Dependencie \| Dependencie[]` | | 字段的依赖项，当依赖项的值发生变化时，会触发当前字段校验 |  |
| postValue | `(val: any) => any` | | 后置状态钩子，可以二次修改数据，返回的值为表单的最终结果值，字段值变化后会触发该钩子 |  |
| onChange | `(val: any) => void` | | 字段值发生变化后触发的回调函数 |  |
| transform | `(val: any, path: string) => any` | | 转换字段的值，如果返回的是一个对象，将和当前字段所在层级的对象进行深度合并 |  |
| tooltip | `string \| string[]` | | 显示在 label 右边的提示 |  |
| defaultValue | `any` | | 默认值，优先级最低，用来兜底，自定义组件时可能会用到 |  |
| isList | `boolean` | | 是否为列表字段，自定义列表组件时可能会用到 |  |
| valueType | `FieldValueType` | | 用于表示值的类型是属于哪个组件的，自定义组件时可能会用到 |  |
| valueModelName | `string` | | 用于 `v-model:xxx` 的名称，默认为 `'value'`，用于支持 `v-model:value`，如果你想支持 `v-model:checked`，设置为 `checked`，自定义组件时可能会用到 |  |
| [...NFormItemProps](https://www.naiveui.com/zh-CN/os-theme/components/form#FormItem-Props) | | | 支持 `NFormItem` 的所有 props | |

### 通用的插槽
| 名称 | 参数 | 说明 | 版本 |
| - | - | - | - |
| addon-after | `()` | 表单项的后缀插槽 | |
| addon-before | `()` | 表单项的前缀插槽 | |
| readonly | `(props:Record<string,any>)` | 表单项只读模式下的内容，参数为当前表单项的所有 `props` | |
| group | `(vnode:VNodeChild)` | 自定义渲染(表单项+前后缀插槽)容器，参数为虚拟节点，可使用动态组件渲染 | |

### ProTreeSelect
基于 [NTreeSelect](https://www.naiveui.com/zh-CN/os-theme/components/tree-select) 封装，可以使用 `useProTreeSelectInst` 获取实例上的方法，除了原有的方法之外，我们还新增了一些方法
- getCheckedKeys：获取勾选的节点 keys
- getExpandedKeys：获取展开的节点 keys
- getIndeterminateKeys：获取部分选中选项的 keys
- getFullKeys：获取全部节点的 keys（包含了禁用的）
- getEnabledKeys：获取全部节点的 keys（不包含禁用的）
- getLevelKeys：获取指定层级的 keys，类型为 `(level:number,getLtLevelKey?:boolean) => Array<string | number>`，`level` 代表层级，从1开始，`getLtLevelKey` 代表是否需要小于指定层级的 keys，默认值 true
- setIndeterminateKeys：设置部分选中 keys
- setCheckedKeys：勾选节点，不传参数勾选所有
- setExpandedKeys：展开节点，不传参数展开全部
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
支持所有的通用属性，详情看 [ProFormList](form-list)

### ProInput
基于 [NInput](https://www.naiveui.com/zh-CN/os-theme/components/input) 封装，可以使用 `useProInputInst` 获取实例上的方法
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
基于 [NInput](https://www.naiveui.com/zh-CN/os-theme/components/input) 封装，可以使用 `useProPasswordInst` 获取实例上的方法
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
基于 [NInput](https://www.naiveui.com/zh-CN/os-theme/components/input) 封装，可以使用 `useProTextareaInst` 获取实例上的方法
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
基于 [NAutoComplete](https://www.naiveui.com/zh-CN/os-theme/components/auto-complete) 封装，可以使用 `useProAutoCompleteInst` 获取实例上的方法，`options` 支持函数
```html
<template>
  <pro-auto-complete
    title="自动填充"
    path="auto-complete"
    :field-props="{
      ...nAutoCompleteProps,
      options:(value) =>{
        return ['@gmail.com', '@163.com', '@qq.com'].map((suffix) => {
          const prefix = (value ?? '').split('@')[0]
          return {
            label: prefix + suffix,
            value: prefix + suffix,
          }
        })
      }
    }"

  />
</template>
```

### ProCascader
基于 [NCascader](https://www.naiveui.com/zh-CN/os-theme/components/cascader) 封装，可以使用 `useProCascaderInst` 获取实例上的方法
```html
<template>
  <pro-textarea
    title="文本域"
    path="textarea"
    :field-props="nNCascaderProps"
  />
</template>
```

### ProCheckbox
基于 [NCheckbox](https://www.naiveui.com/zh-CN/os-theme/components/checkbox) 封装，可以使用 `useProCheckboxInst` 获取实例上的方法
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
基于 [NCheckbox](https://www.naiveui.com/zh-CN/os-theme/components/checkbox) 封装，`fieldProps` 中新增了一些属性
- labelField：label 属性的字段名，默认 'label'
- valueField：value 属性的字段名，默认 'value'
- flexProps: 传递给 `NFlex` 的属性，默认使用 `NFlex` 布局 `options`，如果想使用其他布局，请使用默认插槽实现
- options: 每一项 `NCheckbox` 的配置
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
基于 [NColorPicker](https://www.naiveui.com/zh-CN/os-theme/components/color-picker) 封装<br/>
`NColorPicker` 的 `label` 插槽因为和通用插槽有冲突，所以改名为 `title`
```html
<template>
  <pro-color-picker
    title="颜色选择器"
    path="color-picker"
    :field-props="nColorPickerProps"
  >
    <!-- 用 title 插槽代替组件本身的 label 插槽 -->
    <template #title>title...</template>
  </pro-color-picker>
</template>
```

### ProDate
基于 [NDatePicker](https://www.naiveui.com/zh-CN/os-theme/components/date-picker) 封装，可以使用 `useProDatePickerInst` 获取实例上的方法，请直接使用 `placeholder` 属性代替 `startPlaceholder` 和 `endPlaceholder`，支持字符串格式和时间戳格式，以下是和 `NDatePicker type` 属性的映射关系
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
    :placeholder="['开始'，'结束']"
  />
</template>
```

### ProDigit
基于 [NInputNumber](https://www.naiveui.com/zh-CN/os-theme/components/input-number) 封装，可以使用 `useProDigitInst` 获取实例上的方法，如果你不小心传递了字符串的数字，内部会尝试转成数字，如果是一个不合法的数字(NaN)，会放弃转换
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
基于 [NDynamicTags](https://www.naiveui.com/zh-CN/os-theme/components/dynamic-tags) 封装
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
基于 [NMention](https://www.naiveui.com/zh-CN/os-theme/components/mention) 封装，可以使用 `useMentionInst` 获取实例上的方法
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
基于 [NRadio](https://www.naiveui.com/zh-CN/os-theme/components/radio) 封装，`fieldProps` 中新增了一些属性
- labelField：label 属性的字段名，默认 'label'
- valueField：value 属性的字段名，默认 'value'
- flexProps: 传递给 `NFlex` 的属性，默认使用 `NFlex` 布局 `options`，如果想使用其他布局，请使用默认插槽实现
- options: 每一项 `NRadio` 的配置
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
基于 [NRate](https://www.naiveui.com/zh-CN/os-theme/components/rate) 封装
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
基于 [NSelect](https://www.naiveui.com/zh-CN/os-theme/components/select) 封装，可以使用 `useProSelectInst` 获取实例上的方法
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
基于 [NSlider](https://www.naiveui.com/zh-CN/os-theme/components/slider) 封装
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
基于 [NSwitch](https://www.naiveui.com/zh-CN/os-theme/components/switch) 封装
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
基于 [NTimePicker](https://www.naiveui.com/zh-CN/os-theme/components/time-picker) 封装，可以使用 `useProTimePickerInst` 获取实例上的方法，支持字符串格式和时间戳格式
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
基于 [NTransfer](https://www.naiveui.com/zh-CN/os-theme/components/transfer) 封装，请直接使用 `placeholder` 属性代替 `sourceFilterPlaceholder` 和 `targetFilterPlaceholder`，`fieldProps` 中新增了一些属性
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
基于 [NUpload](https://www.naiveui.com/zh-CN/os-theme/components/upload) 封装，可以使用 `useProUploadInst` 获取实例上的方法，支持字符串格式、字符串组成的数组格式、原有格式，`fieldProps` 中新增了一些属性
- title：按钮文本，优先级低于默认插槽
- maxSize：文件的最大大小，单位 kb
- onlyAcceptImage：是否只允许上传图片类型
- onOverFileMaxSize：超出文件最大大小时触发的回调
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
      onOverFileMaxSize:(data) =>{
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
### ProImage
基于 [NImage](https://www.naiveui.com/zh-CN/light/components/image) 封装，可以传递数组或字符串数据，当传入字符串包含换行符时内部会默认以 `\n` 分割符自动变为多张图片，当图片数量大于1，内部自动使`NImageGroup`包裹，
在`fieldProps` 中新增了一个属性`imageGroupProps`用于图片组配置
- imageGroupProps：传递给 `NImageGroup` 的属性

```html
<template>
  <pro-image
     title="图片"
     path="image"
     :field-props="{
       ...nImageProps
       imageGroupProps: {
         ..nImageGroupProps
       },
     }"
   />
</template>
```
