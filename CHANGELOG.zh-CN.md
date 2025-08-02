# CHANGELOG

## 2.4.4

### Features
- `useNDataTable` 支持传递 `plugins` 选项

### Fixes
- 修复 `pro-search-form` 的 `column` 传递 `span`、`offset` 不生效问题
- 修复 `pro-modal-form` 的 `width`、`maxHeight` 属性无法被 `pro-config-provider` 的 `prop-overrides` 覆盖问题

## 2.4.3

### Fixes
- 修复 `pro-layout` 非内容区背景色跟 `n-layout` 不一致问题

## 2.4.2

### Fixes
- 修复 `pro-layout` 中相关元素绝对定位未设置 `z-index` 导致被盖住问题

## 2.4.1

### Features

- `pro-layout` 新增 `scrollbar-props`、`content-class` 属性
- `useLayoutMenu` 导出 `getMenuKeyFullPath` 方法

### Fixes

- 修复 `pro-layout` 滚动条阻挡页面元素问题
- 修复 `useLayoutMenu` 展开后的子菜单无法折叠问题

## 2.4.0

### Features

- `pro-layout` 新增 `show-sidebar-extra`、`builtin-theme-overrides` 属性

### Fixes

- 修复 `pro-layout` 在部分布局下的样式异常问题
- 修复 `pro-date-picker`、`pro-time` 组件使用 `value-format` 属性无效问题

## 2.3.2

### Fixes

- 删除 `pro-form` 组件 `submit-on-press-enter` 属性

## 2.3.1

### Features

- `pro-field` 组件 `input` 插槽变更为解构对象，新增 `readonly` 参数
- `useNDataTable` 增加 `submit`、`reset` 方法

### Fixes

- 修复 `pro-form-list` 组件重置数据后在添加一行报错问题

## 2.3.0

### Features

- `pro-radio-group` 的 `field-props` 中新增 `type` 属性，用于支持单选按钮组
- 新增 `ProFieldCustomColumn` 类型，外界可自定义扩展 `field` 类型
- `createProForm` 返回值中新增 `onSubmit`、`onSubmitFailed`、`onReset` 钩子 

### Fixes

- 修复 `pro-form` 组件 `submit-on-press-enter` 属性配置为 `true` 后回车无法提交表单问题
- 修复 `pro-layout` 组件主题切换样式未跟随主题色问题
- 修复 `pro-layout` 组件内容区域自适应无效问题

## 2.2.0

### Features

- 新增 `pro-layout` 组件
- 新增 `pro-input-otp` 组件
- 新增 `useLayoutMenu` composable

## 2.1.6

### Fixes

- 修复 `pro-form` 自定义验证时的错误信息无效问题，close [#94](https://github.com/Zheng-Changfu/pro-naive-ui/issues/94)
- 修复 `pro-data-table` 拖拽卸载时因为找不到 dom 导致的报错问题
- 优化 `pro-data-table` 未配置 `drag-sort-options` 时不做拖拽逻辑绑定

## 2.1.5

### Fixes

- 修复 `pro-data-table` 的拖拽功能在数据源异步获取场景下失效问题

## 2.1.4

### Fixes

- 修复 `pro-cascader`、`pro-tree-select` 使用 `show-path` 属性在只读模式下不生效问题
- 修复 `pro-edit-data-table` 编辑行的 `key` 不能添加值为 0 的问题

## 2.1.3

### Fixes

- 修复 `keep` 方法引起的透传给组件属性失效问题

## 2.1.2

### Fixes

- 修复 `pro-edit-data-table` 透传属性给 `pro-data-table` 失效问题

## 2.1.1

### Fixes

- 优化 `pro-data-table` 拖拽行时的样式
- 修复 `pro-data-table` 拖拽在生产环境时不生效问题

## 2.1.0

### Features

- 新增 `pro-edit-data-table` 组件
- `createProForm` 选项增加 `omitEmptyString` 参数

### Fixes

- 修复 `pro-data-table` 自定义 `render` 空值时错误显示问题
- 修复 `pro-config-provider` 的 `prop-overrides` 覆盖 `pro-form-item` 组件 `props` 时无效问题

## 2.0.0

### Features

- 发布正式版本

## 1.x

- 不稳定版本，不要在生产环境中使用


