<markdown>
# 表单默认值

所有的默认值建议统一配置在 `createProForm` 的 `initialValues` 属性中，任何直接使用组件 `v-model:xxx` 和 `default-xxx` 的方式都有可能导致值绑定失效
</markdown>

<script setup lang="ts">
import { createProForm } from 'pro-naive-ui'

const form = createProForm({
  initialValues: {
    name: 'zcf',
    age: 18,
  },
  onReset: console.log,
  onSubmit: console.log,
  onSubmitFailed: console.log,
})
</script>

<template>
  <pro-form
    :form="form"
    label-width="auto"
    label-placement="left"
  >
    <pro-input
      title="用户名"
      path="name"
    />
    <pro-digit
      title="年龄"
      path="age"
    />
    <n-flex>
      <n-button attr-type="reset">
        重置
      </n-button>
      <n-button type="primary" attr-type="submit">
        提交
      </n-button>
    </n-flex>
  </pro-form>
</template>
