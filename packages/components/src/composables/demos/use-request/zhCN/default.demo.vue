<markdown>
  # 默认请求

  默认情况下，`useRequest` 第一个参数是一个异步函数，在组件初始化时，会自动执行该异步函数。同时自动管理该异步函数的 `loading` ， `data` ， `error` 等状态。
  </markdown>

<script setup lang="tsx">
import Mock from 'mockjs'
import { useRequest } from 'pro-naive-ui'

function getUsername(): Promise<string> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() > 0.5) {
        resolve(Mock.mock('@name'))
      }
      else {
        reject(new Error('Failed to get username'))
      }
    }, 1000)
  })
}

const { data, error, loading } = useRequest(getUsername)
</script>

<template>
  <div v-if="error">
    {{ error.message }}
  </div>
  <div v-else-if="loading">
    loading...
  </div>
  <div v-else>
    Username: {{ data }}
  </div>
</template>
