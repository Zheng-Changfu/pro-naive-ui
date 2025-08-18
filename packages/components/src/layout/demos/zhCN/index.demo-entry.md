# 布局 ProLayout
<!--single-column-->
ProLayout 提供了标准又不失灵活的中后台布局，支持 `7` 种布局形态、同时也支持移动端布局。当然在一些特殊的中后台系统中，
布局可能是非常定制化的，这时候你可以自己去实现设计稿布局，搭配 `useLayoutMenu` 这个 `composable` 来完成菜单数据的接入，
省去自己去处理菜单联动的复杂逻辑。

自 `2.2.0` 开始提供。
## 演示

```demo
basic.vue
menus.vue
```

## API
### ProLayout 属性
| 名称                  | 类型                                                                                                                 | 默认值       | 说明                                                                     | 版本  |
| --------------------- | -------------------------------------------------------------------------------------------------------------------- | ------------ | ------------------------------------------------------------------------ | ----- |
| mode                  | `"vertical" \| "horizontal" \| "sidebar" \| "mixed-sidebar" \| "full-content" \| "two-column" \| "mixed-two-column"` | `'vertical'` | 布局模式                                                                 |       |
| isMobile              | `boolean`                                                                                                            | `false`      | 是否启用移动端布局                                                       |       |
| collapsed             | `boolean`                                                                                                            | `false`      | 侧边栏是否折叠                                                           |       |
| showLogo              | `boolean`                                                                                                            | `true`       | 是否显示 logo                                                            |       |
| showSidebar           | `boolean`                                                                                                            | `true`       | 是否显示侧边栏                                                           |       |
| showSidebarExtra      | `boolean`                                                                                                            | `true`       | 是否显示侧边栏额外区域，只在 'two-column'、'mixed-two-column' 布局下生效 | 2.4.0 |
| showNav               | `boolean`                                                                                                            | `true`       | 是否显示顶栏                                                             |       |
| showTabbar            | `boolean`                                                                                                            | `true`       | 是否显示标签栏                                                           |       |
| showFooter            | `boolean`                                                                                                            | `true`       | 是否显示底部                                                             |       |
| sidebarWidth          | `number`                                                                                                             | `224`        | 侧边栏宽度                                                               |       |
| sidebarCollapsedWidth | `number`                                                                                                             | `58`         | 侧边栏折叠后的宽度                                                       |       |
| navHeight             | `number`                                                                                                             | `50`         | 顶栏高度                                                                 |       |
| navFixed              | `boolean`                                                                                                            | `true`       | 顶栏是否固定                                                             |       |
| footerHeight          | `number`                                                                                                             | `32`         | 底部高度                                                                 |       |
| footerFixed           | `boolean`                                                                                                            | `false`      | 底部是否固定                                                             |       |
| tabbarHeight          | `number`                                                                                                             | `38`         | 标签栏高度                                                               |       |
| logoClass             | `string \| any[]`                                                                                                    | `-`          | logo 的 class                                                            |       |
| asideClass            | `string \| any[]`                                                                                                    | `-`          | 整个侧边的 class                                                         |       |
| headerClass           | `string \| any[]`                                                                                                    | `-`          | 头部 class                                                               |       |
| navClass              | `string \| any[]`                                                                                                    | `-`          | 顶栏 class                                                               |       |
| tabbarClass           | `string \| any[]`                                                                                                    | `-`          | 标签栏 class                                                             |       |
| contentClass          | `string \| any[]`                                                                                                    | `-`          | 内容区 class                                                             |       |
| footerClass           | `string \| any[]`                                                                                                    | `-`          | 底部 class                                                               |       |
| onUpdate:collapsed    | `(value: boolean) => void>`                                                                                          | `-`          | 侧边栏折叠时触发                                                         |       |
| scrollbarProps        | `ScrollbarProps`                                                                                                     | `-`          | 透传给 n-scrollbar 的属性                                                | 2.4.1 |

### ProLayout 插槽

| 名称          | 参数  | 说明                                                                 | 版本 |
| ------------- | ----- | -------------------------------------------------------------------- | ---- |
| logo          | `any` | logo 区域                                                            |      |
| nav-left      | `any` | 顶栏左侧                                                             |      |
| nav-center    | `any` | 顶栏中间                                                             |      |
| nav-right     | `any` | 顶栏右侧                                                             |      |
| sidebar       | `any` | 侧边栏，在 `'horizontal'`、`'full-content'` 布局中不生效             |      |
| sidebar-extra | `any` | 侧边栏额外区域，只在 `'two-column'`、`'mixed-two-column'` 布局中生效 |      |
| tabbar        | `any` | tabbar 区域                                                          |      |
| footer        | `any` | 底部                                                                 |      |
| default       | `any` | 内容区域                                                             |      |

### useLayoutMenu Options
下面列举的参数是传递给 useLayoutMenu 的，引用到的类型声明介绍如下
```ts
import type { MenuOption } from 'naive-ui'

type MaybeRefOrGetter<T = any> = MaybeRef<T> | ComputedRef<T> | (() => T);

```

| 名称          | 类型                                                                                                                 | 默认值       | 说明                     | 版本 |
| ------------- | -------------------------------------------------------------------------------------------------------------------- | ------------ | ------------------------ | ---- |
| mode          | `"vertical" \| "horizontal" \| "sidebar" \| "mixed-sidebar" \| "full-content" \| "two-column" \| "mixed-two-column"` | `-`          | 布局模式                 |      |
| menus         | `MaybeRefOrGetter<MenuOption[]>`                                                                                     | `[]`         | 菜单数据                 |      |
| childrenField | `string`                                                                                                             | `'children'` | 菜单数据中子菜单的字段名 |      |

### useLayoutMenu Returned
下面列举的参数是调用 useLayoutMenu 函数返回的，引用到的类型声明介绍如下
```ts
import type { Ref, ComputedRef } from 'vue'
import type { MenuProps } from 'naive-ui'
// import type { LayoutMenuReturn } from 'pro-naive-ui'

/**
 * 内部返回的 MenuProps 中只包含以下数据
 *  mode
 *  responsive
 *  options
 *  value
 *  collapsed
 *  expandedKeys
 *  onUpdateValue
 *  onUpdateExpandedKeys
 */

interface LayoutMenuReturn {
  /**
   * 水平菜单数据,一般放在 header 区域
   */
  horizontalMenuProps: MenuProps
  /**
   * 垂直菜单数据,一般放在 sidebar 区域
   */
  verticalMenuProps: MenuProps
  /**
   * 垂直菜单数据,一般放在 sidebar 额外区域
   */
  verticalExtraMenuProps: MenuProps
}

```

| 名称                 | 类型                            | 默认值 | 说明                                                     | 版本         |
| -------------------- | ------------------------------- | ------ | -------------------------------------------------------- | ------------ |
| activeKey            | `Ref<string \| number \| null>` | `-`    | 当前激活的菜单 `key`                                     |              |
| fullKeys             | `ComputedRef<string \| number>` | `-`    | 所有的菜单 `key`                                         | 3.0.2 |
| layout               | `ComputedRef<LayoutMenuReturn>` | `-`    | 当前布局模式下需要的数据，会根据 `mode` 切换自动改变数据 |              |
| verticalLayout       | `ComputedRef<LayoutMenuReturn>` | `-`    | `'vertical'` 布局时的数据                                |              |
| horizontalLayout     | `ComputedRef<LayoutMenuReturn>` | `-`    | `'horizontal'` 布局时需要的数据                          |
| mixedSidebarLayout   | `ComputedRef<LayoutMenuReturn>` | `-`    | `'mixed-sidebar'` 布局时需要的数据                       |              |
| fullContentLayout    | `ComputedRef<LayoutMenuReturn>` | `-`    | `'full-content'` 布局时需要的数据                        |              |
| twoColumnLayout      | `ComputedRef<LayoutMenuReturn>` | `-`    | `'two-column'` 布局时需要的数据                          |              |
| mixedTwoColumnLayout | `ComputedRef<LayoutMenuReturn>` | `-`    | `'mixed-two-column'` 布局时需要的数据                    |              |

