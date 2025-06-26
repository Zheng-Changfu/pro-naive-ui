<markdown>
# 联动-显示隐藏
每个表单项都有 `visible` 和 `hidden` 属性来控制显示和隐藏,`visible` 的优先级比 `hidden` 高，你也可以使用 `v-if`，这取决于你自己。

<n-alert type="warning" title="注意" :bordered="false">
  被隐藏的表单项值在提交时并不会包含在内
</n-alert>
</markdown>

<script setup lang="ts">
import { createProForm } from 'pro-naive-ui'

const form = createProForm<{ color?: string }>({
  onSubmit: console.log,
  initialValues: {
    color: '#ccc',
  },
})

const { values } = form
</script>

<template>
  <pro-form :form="form" label-placement="left" label-width="auto">
    <pro-input
      title="颜色"
      path="color"
      required
      :field-props="{
        style: {
          background: values.color,
        },
      }"
    />
    <pro-input
      title="请在颜色中输入#ccc显示"
      path="color#ccc"
      required
      :visible="values.color === '#ccc'"
    />
    <pro-input
      title="请在颜色中输入#eee隐藏"
      path="color#eee"
      required
      :hidden="values.color === '#eee'"
    />
    <n-button type="primary" attr-type="submit">
      提交
    </n-button>
  </pro-form>
</template>
