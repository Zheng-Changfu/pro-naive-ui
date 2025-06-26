<markdown>
# 基本使用
</markdown>

<script setup lang="tsx">
import { createProForm } from 'pro-naive-ui'
import { ref } from 'vue'

const readonly = ref(false)
const form = createProForm()
const position = ref<'top' | 'bottom'>('bottom')
</script>

<template>
  <n-radio-group v-model:value="position" class="mb-16px">
    <n-flex>
      <n-radio label="顶部" value="top" />
      <n-radio label="底部" value="bottom" />
    </n-flex>
  </n-radio-group>
  <div>
    <span>只读：</span>
    <n-switch v-model:value="readonly" />
  </div>
  <pro-form :form="form">
    <pro-form-list
      title="用户信息"
      path="userInfo"
      :readonly="readonly"
      :position="position"
      only-show-first-item-label
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
