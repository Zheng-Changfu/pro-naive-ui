<markdown>
# 节流

通过设置 `options.throttleWait`，进入节流模式，此时如果频繁触发 `run` 或者 `runAsync`，则会以节流策略进行请求。你可以在下面 input 框中快速输入文本，体验效果
</markdown>

<script setup lang="tsx">
import Mock from 'mockjs'
import { useRequest } from 'pro-naive-ui'

const { data, loading, run } = useRequest(getEmail, {
  throttleWait: 1000,
  manual: true,
})

function getEmail(search?: string): Promise<string[]> {
  console.log('throttle getEmail', search)
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(Mock.mock({ 'data|5': ['@email'] }).data)
    }, 300)
  })
}
</script>

<template>
  <div>
    <n-input
      placeholder="Search Emails"
      @update:value="run"
    />
    <p v-if="loading">
      loading...
    </p>
    <ul v-else class="mt-8px">
      <li v-for="item in (data ?? [])" :key="item">
        {{ item }}
      </li>
    </ul>
  </div>
</template>
