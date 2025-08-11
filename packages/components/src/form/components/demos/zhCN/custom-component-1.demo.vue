<markdown>
# 接入自定义组件

有的时候你希望以最简单的方式接入自定义组件，这时候可以使用 `pro-field` 组件。
</markdown>

<script setup lang="tsx">
import { createProForm } from 'pro-naive-ui'
import { ref } from 'vue'

const readonly = ref(false)
const form = createProForm({
  onSubmit: console.log,
})
</script>

<template>
  <n-switch v-model:value="readonly" class="mb-8px">
    <template #checked>
      编辑
    </template>
    <template #unchecked>
      只读
    </template>
  </n-switch>
  <pro-form :readonly="readonly" :form="form" label-placement="left" label-width="auto">
    <pro-field
      title="标题"
      path="title"
      required
      :field-props="{
        placeholder: '请输入标题',
      }"
    >
      <template #input="{ inputProps }">
        <n-input v-bind="inputProps" />
      </template>
    </pro-field>
    <pro-field
      title="标题2"
      path="title2"
      required
      :field-props="{
        placeholder: '支持只读模式',
      }"
    >
      <template #input="{ inputProps, readonly }">
        <span v-if="readonly">{{ inputProps.value }}</span>
        <n-input v-else v-bind="inputProps" />
      </template>
    </pro-field>
    <n-button type="primary" attr-type="submit">
      提交
    </n-button>
  </pro-form>
</template>
