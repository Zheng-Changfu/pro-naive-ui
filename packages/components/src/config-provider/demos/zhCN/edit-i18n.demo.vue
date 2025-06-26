<markdown>
# 在现有国际化基础上调整

你可以使用 `createLocale` 在现有国际化基础上调整，例如以下例子对表单必填信息做出了调整，[所有可调整配置参考](https://github.com/Zheng-Changfu/pro-naive-ui/blob/master/packages/components/src/locales/zhCN.ts)
</markdown>

<script setup lang="tsx">
import { createLocale } from 'naive-ui'
import { zhCN as _zhCN, createProForm } from 'pro-naive-ui'

const form = createProForm()
const zhCN = createLocale({
  ProForm: {
    validateMessages: {
      required: (title: string) => {
        return `${title}是一个必填项哦!`
      },
    },
  },
} as any, _zhCN)
</script>

<template>
  <pro-config-provider :locale="zhCN">
    <pro-form :form="form">
      <pro-input required title="用户名" path="name" />
      <pro-digit required title="年龄" path="age" />
      <n-button type="primary" attr-type="submit">
        提交
      </n-button>
    </pro-form>
  </pro-config-provider>
</template>
