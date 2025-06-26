<markdown>
# 联动-异步循环

有的时候 A 发生变化要改变 B,B 发生变化要改变 A,你可以使用 `onChange` 完成需求
</markdown>

<script setup lang="tsx">
import { createProForm } from 'pro-naive-ui'

function delay(time: number) {
  return new Promise(resolve => setTimeout(resolve, time))
}

const form = createProForm<{
  A?: number
  B?: number
  name?: string
}>()

async function fetchUpdateBAndName() {
  await delay(500)
  form.values.value.B = 1
  form.values.value.name = 'BBBBBB'
}

async function fetchUpdateAAndName() {
  await delay(500)
  form.values.value.A = 0
  form.values.value.name = 'AAAAA'
}
</script>

<template>
  <pro-form
    :form="form"
    label-width="auto"
    label-placement="left"
  >
    <pro-select
      title="A"
      path="A"
      :field-props="{
        options: [
          { label: 'A', value: 0 },
          { label: 'AA', value: 1 },
        ],
      }"
      @change="fetchUpdateBAndName"
    />
    <pro-select
      title="B"
      path="B"
      :field-props="{
        options: [
          { label: 'B', value: 0 },
          { label: 'BB', value: 1 },
        ],
      }"
      @change="fetchUpdateAAndName"
    />
    <pro-input
      title="姓名"
      path="name"
    />
  </pro-form>
</template>
