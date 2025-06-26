<markdown>
# 依赖刷新(重复上一次请求)

通过设置 `options.refreshDeps`，在依赖变化时， `useRequest` 会自动调用 `refresh` 方法，实现`刷新（重复上一次请求）`的效果。
</markdown>

<script setup lang="tsx">
import Mock from 'mockjs'
import { useRequest } from 'pro-naive-ui'
import { ref } from 'vue'

const userId = ref()

const { data, loading, run } = useRequest((id: number) => getUsername(id), {
  refreshDeps: [userId],
})

function getUsername(id: number): Promise<string> {
  console.log('getUsername id:', id)
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(Mock.mock('@name'))
    }, 1000)
  })
}
</script>

<template>
  <p>Username: {{ loading ? 'Loading' : data }}</p>
  <div>
    <n-button @click="userId = Math.random()">
      Use previous id to refresh
    </n-button>
  </div>
  <div class="mt-16px">
    <n-button @click="run(Math.random())">
      Use latest id to refresh
    </n-button>
  </div>
</template>
