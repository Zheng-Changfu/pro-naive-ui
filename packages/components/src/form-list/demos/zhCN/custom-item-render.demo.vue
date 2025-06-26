<markdown>
# 自定义行和操作区域

使用 `item-render` 可以将行和操作区域放在任意位置
</markdown>

<script setup lang="tsx">
import { createProForm } from 'pro-naive-ui'

const form = createProForm()
</script>

<template>
  <pro-form :form="form">
    <pro-form-list
      title="用户信息"
      path="userInfo"
      only-show-first-item-label
    >
      <n-flex>
        <pro-input
          title="姓名"
          path="name"
        />
        <pro-digit
          title="年龄"
          path="age"
        />
      </n-flex>
      <template #item="{ itemDom, actionDom }">
        <n-card
          title="卡片"
          embedded
          class="mb-8px"
        >
          <component :is="itemDom" />
          <template #header-extra>
            <component :is="actionDom" />
          </template>
        </n-card>
      </template>
    </pro-form-list>
  </pro-form>
</template>
