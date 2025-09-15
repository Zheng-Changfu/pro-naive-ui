# 结构化列表 ProFormList
<!--single-column-->

我们还提供了一个可以录入结构化列表的组件

## 演示

```demo
basic.vue
min-max.vue
guard.vue
custom-add-and-remove-props.vue
creator-initial-value.vue
link-visible-hidden.vue
link-async-loop.vue
custom-item-render.vue
custom-action-render.vue
custom-container-render.vue
horizontal-layout.vue
list-nest.vue
```

## API
### ProFormList 属性
<!--replace、pro-field、props、field#通用的属性-->
<!--replace、n-form、n-form-item-props、https://www.naiveui.com/zh-CN/os-theme/components/form#FormItem-Props-->

List 本身也是一个表单项，支持这些[通用属性](field#通用的属性)外，还扩展了一些属性，引用到的类型声明介绍如下
```typescript
import type { ProButtonProps, ProFormListActionGuard } from 'pro-naive-ui'
```

| 名称                   | 类型                      | 默认值     | 说明                                                                     | 版本 |
| ---------------------- | ------------------------- | ---------- | ------------------------------------------------------------------------ | ---- |
| position               | `'top' \| 'bottom'`       | `'bottom'` | 添加一行按钮显示在顶部还是底部，区别是添加数据的时候是追加到尾部还是头部 |      |
| min                    | `number`                  | `-`        | 最少行数，删除时如果少于该数则无法删除                                   |      |
| max                    | `number`                  | `-`        | 最多行数，新增或复制时多于该数则无法新增或复制                           |      |
| onlyShowFirstItemLabel | `boolean`                 | `false`    | 是否只显示第一行的 label                                                 |      |
| creatorInitialValue    | `() => object`            | `-`        | 新增一行的默认值                                                         |      |
| creatorButtonProps     | `ProButtonProps \| false` | `-`        | 新增一行按钮的属性，false 不显示                                         |      |
| copyButtonProps        | `ProButtonProps \| false` | `-`        | 复制按钮的属性，false 不显示                                             |      |
| removeButtonProps      | `ProButtonProps \| false` | `-`        | 删除按钮的属性，false 不显示                                             |      |
| actionGuard            | `ProFormListActionGuard`  | `-`        | 添加行和删除行的拦截器                                                   |      |

### ProFormList 实例方法
引用到的类型声明介绍如下
```typescript
import type { InternalPath, ProFormListInst } from 'pro-naive-ui'
```

| 名称     | 类型                                     | 说明             | 版本 |
| -------- | ---------------------------------------- | ---------------- | ---- |
| push     | `(...items: T[]) => void`                | 尾部追加数据     |      |
| pop      | `() => void`                             | 弹出尾部数据     |      |
| insert   | `(index: number, ...items: T[]) => void` | 指定位置插入数据 |      |
| remove   | `(index: number) => void`                | 删除指定位置数据 |      |
| shift    | `() => void`                             | 弹出第一条数据   |      |
| unshift  | `(...items: T[]) => void`                | 头部追加数据     |      |
| move     | `(from: number, to: number) => void`     | 移动数据         |      |
| moveUp   | `(index: number) => void`                | 上移数据         |      |
| moveDown | `(index: number) => void`                | 下移数据         |      |

### ProFormList 插槽
引用到的类型声明介绍如下
```typescript
import type { 
  ProFormListInst, 
  ProFormListItemRender, 
  ProFormListActionRender, 
  ProFormListContainerRender 
} from 'pro-naive-ui'

interface ProFormListDefaultRender {
  /**
   * 当前行索引
   */
  index: number
  /**
   * 总行数
   */
  total: number
  /**
   * 操作行的一些方法
   */
  action: ProFormListInst
  /**
   * 当前行信息，可以用来联动
   */
  row: Record<string, any>
}
```

| 名称      | 参数                         | 说明                                                   | 版本 |
| --------- | ---------------------------- | ------------------------------------------------------ | ---- |
| default   | `ProFormListDefaultRender`   | 每一行渲染的内容                                       |      |
| item      | `ProFormListItemRender`      | 自定义渲染每一行的结构，主要就是将 action 放在别的地方 |      |
| action    | `ProFormListActionRender`    | 自定义渲染操作按钮                                     |      |
| container | `ProFormListContainerRender` | 自定义渲染列表容器                                     |      |

### ProFormList 的校验时机
如果你给 `ProFormList` 配置了校验规则，它只会在 `添加一行数据`、`复制此项`、`删除此项` 动作发生后校验，调用实例的 `api` 方法不会进行校验处理，你需要手动触发校验
```html
<script setup lang="ts">
import type { ProFormListInst } from 'pro-naive-ui'
import { ref } from 'vue'
import { createProForm } from 'pro-naive-ui'

const formListInst = ref<ProFormListInst>()
const proForm = createProForm<{name?:string}>()

function handleClick(){
  formListInst.value!.push({....})
  // 手动校验列表
  proForm.validate('list')
}
</script>

<template>
  <pro-form :form="proForm">
    <pro-form-list ref="formListInst" path="list" required>
      ....
    </pro-form-list>
  </pro-form>
</template>
```

### 后代组件使用实例
如果想在后代组件中使用实例，无需透传，可以使用 `useInjectProFormListInst` 方法直接注入，如果是嵌套的表单列表，注入的将会是最近的一个祖先实例
```html
<!-- 父组件 -->
<script setup lang="ts">
import { createProForm } from 'pro-naive-ui'
const proForm = createProForm<{name?:string}>()
</script>

<template>
  <pro-form :form="proForm">
    <pro-form-list>
      <child />
    </pro-form-list>
  </pro-form>
</template>

<!-- 后代组件 -->
<script setup lang="ts">
import { useInjectProFormListInst } from 'pro-naive-ui'
const formListInst = useInjectProFormListInst<{name:string}>()!
</script>

<template>
  <n-button @click="formListInst.move(1,2)">移动</n-button>
</template>
```
