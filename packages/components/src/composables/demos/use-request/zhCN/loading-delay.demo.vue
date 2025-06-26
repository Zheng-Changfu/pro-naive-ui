<markdown>
# 避免 loading 闪烁

通过设置 `options.loadingDelay` ，可以延迟 `loading` 变成 `true` 的时间，有效防止闪烁。你可以快速点击下面示例中的按钮以体验效果
</markdown>

<script setup lang="tsx">
import Mock from 'mockjs'
import { useRequest } from 'pro-naive-ui'

const { run, data, loading } = useRequest(getUsername, {
  loadingDelay: 300,
})

function getUsername(): Promise<string> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(Mock.mock('@name'))
    }, 300)
  })
}
</script>

<template>
  <n-button @click="run()">
    run
  </n-button>
  <div>
    Username:  {{ loading ? 'Loading' : data }}
  </div>
</template>
