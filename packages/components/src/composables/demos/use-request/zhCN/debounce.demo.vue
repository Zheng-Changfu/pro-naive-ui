<markdown>
# 防抖

通过设置 `options.debounceWait`，进入防抖模式，此时如果频繁触发 `run` 或者 `runAsync`，则会以防抖策略进行请求。你可以在下面 input 框中快速输入文本，体验效果
</markdown>

<script setup lang="tsx">
import Mock from 'mockjs'
import { useRequest } from 'pro-naive-ui'

function getEmail(search?: string): Promise<string[]> {
  console.log('debounce getEmail', search)
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(Mock.mock({ 'data|5': ['@email'] }).data)
    }, 300)
  })
}

const { data, loading, run } = useRequest(getEmail, {
  manual: true,
  debounceWait: 1000,
})
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
