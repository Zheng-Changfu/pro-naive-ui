<markdown>
# 监听值改变

所有的表单项都支持 `on-change` 事件，它只会在值手动发生变化后调用，如果想要统一监听，使用 `createProForm` 的 `onValueChange` 属性<br />

<n-alert type="warning" title="注意" :bordered="false">
  他们只会在手动交互时才会触发
</n-alert>
</markdown>

<script setup lang="ts">
import { useMessage } from 'naive-ui'
import { createProForm } from 'pro-naive-ui'

const message = useMessage()

function messageValue(value: any) {
  message.info(`监听到值改变：${value}`)
}

const form = createProForm({
  onReset: console.log,
  onSubmit: console.log,
  onSubmitFailed: console.log,
  onValueChange: ({ path, value }) => {
    messageValue(`${path} -> ${value}`)
  },
})
</script>

<template>
  <pro-form
    :form="form"
    label-width="auto"
    label-placement="left"
  >
    <pro-input
      title="姓名"
      path="name"
      required
      @change="messageValue"
    />
    <pro-digit
      title="年龄"
      path="age"
      required
      @change="messageValue"
    />
    <pro-select
      title="城市"
      path="city"
      required
      :field-props="{
        options: [
          { label: '北京', value: 0 },
          { label: '上海', value: 1 },
        ],
      }"
      @change="messageValue"
    />
  </pro-form>
</template>
