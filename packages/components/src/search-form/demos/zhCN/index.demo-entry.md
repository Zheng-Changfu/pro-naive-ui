# 查询表单 ProSearchForm
<!--single-column-->

有些是时候表单要与别的组件组合使用，常见的有 DataTable，这时候就需要一些特殊形态的表单。ProSearchForm 解决了配合组件使用的问题，避免了复杂的样式设置。
因为展现形态比较固定，所以我们以 json 的方式来组织代码，支持完整的类型推导

<n-alert type="warning" title="注意" :bordered="false">
  我们是支持按需加载组件的，所以在使用前确保组件已被 Vue 注册
</n-alert>

## 演示

```demo
basic.vue
dynamic-props.vue
custom-button.vue
```

## API
### ProSearchForm 属性
<!--replace、pro-form、props、form#ProForm-属性-->
<!--replace、n-form、props、https://www.naiveui.com/zh-CN/os-theme/components/form#Form-Props-->
<!--replace、n-grid、props、https://www.naiveui.com/zh-CN/os-theme/components/grid#Grid-Props-->

引用到的类型声明介绍如下
```typescript
import type { GridProps, GridItemProps, FormItemProps } from 'naive-ui'
import type { ProButtonProps } from 'pro-naive-ui'
```

<n-alert type="warning" title="注意" :bordered="false">
  不支持 collapsed，请使用 createProSearchForm 的相关属性代替
</n-alert>

| 名称                | 类型                                                         | 默认值 | 说明                                                         | 版本  |
| ------------------- | ------------------------------------------------------------ | ------ | ------------------------------------------------------------ | ----- |
| columns             | <n-a href="#ProSearchFormColumn">ProSearchFormColumn[]</n-a> | `-`    | 表单项集合                                                   |       |
| gridProps           | `GridProps`                                                  | `-`    | 透传给 `n-grid` 的属性，某些属性有冲突时可能有用             |       |
| showSuffixGridItem  | `boolean`                                                    | `true` | 是否显示后缀(收起、重置、查询)                               |       |
| resetButtonProps    | `ProButtonProps \| false`                                    | `-`    | 重置按钮的属性，`false` 不显示                               |       |
| searchButtonProps   | `ProButtonProps \| false`                                    | `-`    | 查询按钮的属性，`false` 不显示                               |       |
| collapseButtonProps | `ProButtonProps \| false`                                    | `-`    | 展开收起按钮的属性，`false` 不显示                           |       |
| suffixGridItemProps | `GridItemProps`                                              | `-`    | 后缀(收起、重置、查询) GridItem 的属性，不支持 `suffix` 属性 | 3.1.0 |
| suffixFormItemProps | `FormItemProps`                                              | `-`    | 后缀(收起、重置、查询) FormItem 的属性                       | 3.1.0 |

### ProSearchForm 插槽
引用到的类型声明介绍如下
```typescript
import type { VNodeChild } from 'vue'
```

| 名称   | 参数                                                             | 说明                                                                             | 版本 |
| ------ | ---------------------------------------------------------------- | -------------------------------------------------------------------------------- | ---- |
| suffix | `(opt: {overflow: boolean;suffixDom: VNodeChild}) => VNodeChild` | 自定义查询/重置/展开收起， `overflow` 代表是否溢出，`suffixDom` 是默认的虚拟 dom |      |

### createProSearchForm
<!--replace、pro-form、createProForm、form#createProForm-Returned-->

创建一个查询表单控制器，如果已经注册了控制器，想在后代组件中使用，无需透传，可以使用 `useInjectProSearchForm` 方法直接注入，
用法同 [createProForm](form#createProForm)，调用后的返回值增加了几个参数

| 名称           | 类型                            | 默认值 | 说明                                 | 版本 |
| -------------- | ------------------------------- | ------ | ------------------------------------ | ---- |
| collapsed      | `Ref<boolean>`                  | `-`    | 是否收起                             |      |
| toggleCollapse | `(collapsed?: boolean) => void` | `-`    | 切换收起，传递了此参数，根据参数切换 |      |

调用时的参数中还增加了
<!--replace、pro-form、createProFormOptions、form#createProForm-Options-->

| 名称             | 类型      | 默认值  | 说明         | 版本 |
| ---------------- | --------- | ------- | ------------ | ---- |
| defaultCollapsed | `boolean` | `false` | 默认是否收起 |      |

### ProSearchFormColumn
<!--replace、pro-field、props、field#通用的属性-->
<!--replace、n-form、n-form-item-props、https://www.naiveui.com/zh-CN/os-theme/components/form#FormItem-Props-->
<!--replace、n-grid、n-grid-item-props、https://www.naiveui.com/zh-CN/os-theme/components/grid#GridItem-Props-->

它是用来定义每一个表单项的

<n-alert type="warning" title="注意" :bordered="false">
  不支持 suffix 属性，对于动态的属性，可以传递给 proFieldProps
</n-alert>

| 名称          | 类型                                                     | 默认值    | 说明                                                                                                                     | 版本 |
| ------------- | -------------------------------------------------------- | --------- | ------------------------------------------------------------------------------------------------------------------------ | ---- |
| render        | `() => VNodeChild`                                       | `-`       | 当 `field` 不满足需求时，可以自定义渲染                                                                                  |      |
| field         | <n-a href="#ProFieldColumnType">ProFieldColumnType</n-a> | `'input'` | 渲染哪个字段控件，默认是 `input`，因为支持按需加载，所以要保证使用的组件已经被 `Vue` 注册，否则会在开发期间抛出一个警告  |      |
| fieldProps    | `object \| () => object`                                 | `-`       | 控件的 `props`，比如 `pro-input` 控件，这里就支持 `n-input` 的所有 `props`，其他控件同理，如果是动态属性可以写成一个函数 |      |
| fieldSlots    | `object`                                                 | `-`       | 控件的 `slots`，比如 `pro-input` 控件，这里就支持 `n-input` 的所有 `slots` 和[通用插槽](field#通用的插槽) ，其他控件同理 |      |
| proFieldProps | `object \| () => object`                                 | `-`       | 如果是动态的[通用属性](field#通用的属性)，可以写在这里，不过你需要写成一个函数                                           |      |

### ProFieldColumnType
以下是 `field` 和组件的对照关系表
| field              | 组件                                       | 版本  |
| ------------------ | ------------------------------------------ | ----- |
| rate               | [ProRate](field#ProRate)                   |       |
| input              | [ProInput](field#ProInput)                 |       |
| digit              | [ProDigit](field#ProDigit)                 |       |
| slider             | [ProSlider](field#ProSlider)               |       |
| switch             | [ProSwitch](field#ProSwitch)               |       |
| upload             | [ProUpload](field#ProUpload)               |       |
| select             | [ProSelect](field#ProSelect)               |       |
| mention            | [ProMention](field#ProMention)             |       |
| cascader           | [ProCascader](field#ProCascader)           |       |
| password           | [ProPassword](field#ProPassword)           |       |
| textarea           | [ProTextarea](field#ProTextarea)           |       |
| checkbox           | [ProCheckbox](field#ProCheckbox)           |       |
| transfer           | [ProTransfer](field#ProTransfer)           |       |
| input-otp          | [ProInputOtp](field#ProInputOtp)           | 2.2.0 |
| tree-select        | [ProTreeSelect](field#ProTreeSelect)       |       |
| radio-group        | [ProRadioGroup](field#ProRadioGroup)       |       |
| color-picker       | [ProColorPicker](field#ProColorPicker)     |       |
| dynamic-tags       | [ProDynamicTags](field#ProDynamicTags)     |       |
| auto-complete      | [ProAutoComplete](field#ProAutoComplete)   |       |
| checkbox-group     | [ProCheckboxGroup](field#ProCheckboxGroup) |       |
| time               | [ProTime](field#ProTime)                   |       |
| date               | [ProDate](field#ProDate)                   |       |
| date-time          | [ProDateTime](field#ProDate)               |       |
| date-year          | [ProDateYear](field#ProDate)               |       |
| date-week          | [ProDateWeek](field#ProDate)               |       |
| date-month         | [ProDateMonth](field#ProDate)              |       |
| date-range         | [ProDateRange](field#ProDate)              |       |
| date-quarter       | [ProDateQuarter](field#ProDate)            |       |
| date-time-range    | [ProDateTimeRange](field#ProDate)          |       |
| date-year-range    | [ProDateYearRange](field#ProDate)          |       |
| date-month-range   | [ProDateMonthRange](field#ProDate)         |       |
| date-quarter-range | [ProDateQuarterRange](field#ProDate)       |       |

### 默认值调整
我们为了更加的好用，调整了一些默认值，如果你不满意，可以参考[组件 Props 覆盖](config-provider#prop-overrides.vue)
- `xGap` 调整为 `24`
- `labelWidth` 调整为 `80`
- `cols` 调整为 `'1 s:2 l:3'`
- `labelPlacement` 调整为 `left`
- `responsive` 调整为 `'screen'`

### 扩展 field
如果你基于 `ProField` 封装了一个组件，`ProSearchForm` 是可以正常渲染出来的，但是 `field`、`fieldSlots`、`fieldProps` 会缺少类型提示，
你需要做如下调整
- 在你项目全局的 `.d.ts` 文件中扩展 `ProFieldCustomColumn` 类型，该类型在 `2.3.0` 新增
```typescript
import type { 
  ProFieldCustomColumn,
} from 'pro-naive-ui'

declare module 'pro-naive-ui' {
  interface ProFieldCustomColumn {
    column: XColumn | YColumn
  }

  interface XColumn {
    field: 'X' // 扩展的 field 名称
    fieldSlots: TestSlots // field 对应组件的插槽
    fieldProps: TestProps['fieldProps'] // field 对应组件 props 中的 fieldProps
  }

  interface YColumn {
    field: 'Y' // 扩展的 field 名称
    fieldSlots: TestSlots // field 对应组件的插槽
    fieldProps: TestProps['fieldProps'] // field 对应组件 props 中的 fieldProps
  }
}

export {}
```
- 确保你的 `tsconfig.json` 包含 `.d.ts` 文件
