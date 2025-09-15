# 编辑表格 ProEditDataTable
<!--single-column-->
可编辑表格 `ProEditDataTable` 与 `ProDataTable` 的功能基本相同，为了更方便的集成在表单中，数据源被 `ProForm` 接管

`2.1.0` 版本开始提供该组件
## 演示

```demo
basic.vue
row-dblclick-edit.vue
guard.vue
sub-column-table-add.vue
custom-table.vue
link-async-loop.vue
async.vue
```

## API

### ProEditDataTable 属性
<!--replace、pro-data-table、props、data-table#ProDataTable-属性-->
<!--replace、pro-field、props、field#通用的属性-->
<!--replace、n-form、n-form-item-props、https://www.naiveui.com/zh-CN/os-theme/components/form#FormItem-Props-->

引用到的类型声明介绍如下
```typescript
import type { ProEditDataTableRecordCreatorProps, ProEditDataTableActionGuard, ProEditDataTableColumns, ProDataTableProps } from 'pro-naive-ui'
```

| 名称                 | 类型                                   | 默认值 | 说明                                                          | 版本 |
| -------------------- | -------------------------------------- | ------ | ------------------------------------------------------------- | ---- |
| editableKeys         | `number[] \| string[]`                 | `-`    | 展示编辑模式行的 `key` 值                                     |      |
| recordCreatorProps   | `ProEditDataTableRecordCreatorProps`   | `-`    | 添加一行数据功能的配置                                        |      |
| max                  | `number`                               | `-`    | 最多行数，多于该数则无法继续新增                              |      |
| actionGuard          | `ProEditDataTableActionGuard`          | `-`    | 操作拦截器                                                    |      |
| columns              | `ProEditDataTableColumns`              | `[]`   | 需要展示的列                                                  |      |
| fieldProps           | `ProDataTableProps`                    | `-`    | 有冲突的属性可以写在 `fieldProps` 中，会透传给 `ProDataTable` |      |
| onUpdateEditableKeys | `(keys: string[] \| number[]) => void` | `-`    | 编辑模式行的 `key` 值 `change` 时触发                         |      |

### ProEditDataTable 插槽
<!--replace、pro-data-table、slots、data-table#ProDataTable-插槽-->
<!--replace、pro-field、slots、field#通用的插槽-->

| 名称 | 参数 | 说明 | 版本 |
| ---- | ---- | ---- | ---- |

### 扩展 field
如果你基于 `ProField` 封装了一个组件，`ProEditDataTable` 是可以正常渲染出来的，但是 `field`、`fieldSlots`、`fieldProps` 会缺少类型提示，
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
