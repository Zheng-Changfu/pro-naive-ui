<markdown>
# 轮询

过设置 `options.pollingInterval`，进入轮询模式，`useRequest` 会定时触发 service 执行。你可以通过 `cancel` 来停止轮询，通过 `run/runAsync` 来启动轮询
</markdown>

<script setup lang="tsx">
import Mock from 'mockjs'
import { useRequest } from 'pro-naive-ui'

const { data, loading, run, cancel } = useRequest(getUsername, {
  pollingInterval: 1000,
  pollingWhenHidden: false,
})

function getUsername() {
  console.log('polling getUsername')
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(Mock.mock('@name'))
    }, 1000)
  })
}
</script>

<template>
  <p>Username: {{ loading ? 'Loading' : data }}</p>
  <n-button @click="run()">
    start
  </n-button>
  <n-button class="ml-16px" @click="cancel">
    stop
  </n-button>
</template>
