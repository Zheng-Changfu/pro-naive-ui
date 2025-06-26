<markdown>
# 增删守卫
</markdown>

<script setup lang="tsx">
import { createProForm } from 'pro-naive-ui'

function delay(time: number) {
  return new Promise(resolve => setTimeout(resolve, time))
}

const form = createProForm()

async function beforeAddRow(opt: { index: number, insertIndex: number, total: number }) {
  console.log(opt)
  await delay(1000)
  return Math.random() < 0.5
}

async function beforeRemoveRow(opt: { index: number, total: number }) {
  console.log(opt)
  await delay(1000)
  return Math.random() < 0.5
}
</script>

<template>
  <pro-form :form="form">
    <pro-form-list
      title="用户信息"
      path="userInfo"
      only-show-first-item-label
      :action-guard="{
        beforeAddRow,
        beforeRemoveRow,
      }"
    >
      <pro-input
        title="姓名"
        path="name"
      />
      <pro-digit
        title="年龄"
        path="age"
      />
    </pro-form-list>
  </pro-form>
</template>
