# 数据表格 ProDataTable
<!--single-column-->

我们的表格很轻，只解决了一些零碎的问题，不过你可以结合 [useNDataTable](use-n-data-table) 轻松满足异步场景
- 增加了序号列
- 增加了一些插槽
- 增加了行拖拽排序
- `row-key` 可以写成一个字符串
- 单元格内容为空时的处理

<n-alert type="info" title="提示" :bordered="false">
  你可以搭配 <n-a href="javascript:void(0)" @click="$router.push('use-n-data-table')">useNDataTable</n-a> 来帮你轻松管理表格、查询表单和表格联动的场景
</n-alert>

## 演示

```demo
index.vue
draggable-row.vue
and-plain-component.vue
table-slot.vue
use-request.vue
and-search-form.vue
```

## API
### ProDataTable 属性
<!--replace、n-data-table、props、https://www.naiveui.com/zh-CN/os-theme/components/data-table#DataTable-Props-->

引用到的类型声明介绍如下
```typescript
import type { VNodeChild } from 'vue'
import type { ProDataTableColumns, ProCardProps, ProDataTableDragSortOptions } from 'pro-naive-ui'
```

| 名称            | 类型                                                | 默认值 | 说明                                                                 | 版本 |
| --------------- | --------------------------------------------------- | ------ | -------------------------------------------------------------------- | ---- |
| columns         | `ProDataTableColumns`                               | `[]`   | 需要展示的列                                                         |      |
| rowKey          | `string \| (rowData: object) => (number \| string)` | `-`    | 通过行数据创建行的 key（如果你不想给每一行加上 key），可以写成字符串 |      |
| title           | `string`                                            | `-`    | 表格标题                                                             |      |
| tooltip         | `string \| string[]`                                | `-`    | 提示文字，显示在标题的右边                                           |      |
| tableCardProps  | `ProCardProps`                                      | `-`    | 包裹表格卡片的配置                                                   |      |
| dragSortOptions | `ProDataTableDragSortOptions`                       | `-`    | 拖拽排序选项配置，<n-a href="#draggable-row.vue">查看完整例子</n-a>  |      |

### ProDataTable 插槽
<!--replace、n-data-table、slots、https://www.naiveui.com/zh-CN/os-theme/components/data-table#DataTable-Slots-->
引用到的类型声明介绍如下
```typescript
import type { VNodeChild } from 'vue'
```

| 名称    | 参数                       | 说明                                               | 版本 |
| ------- | -------------------------- | -------------------------------------------------- | ---- |
| title   | `any`                      | 表格标题                                           |      |
| extra   | `any`                      | 表格额外区域                                       |      |
| toolbar | `any`                      | 表格工具栏                                         |      |
| table   | `({tableDom: VNodeChild})` | 自定义表格容器，一般可以在表格周围放置一些别的东西 |      |

