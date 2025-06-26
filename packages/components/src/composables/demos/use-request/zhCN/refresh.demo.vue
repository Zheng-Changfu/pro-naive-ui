<markdown>
# 刷新（重复上一次请求）

`useRequest` 提供了 `refresh` 和 `refreshAsync` 方法，使我们可以使用上一次的参数，重新发起请求。

假如在读取用户信息的场景中

1. 我们读取了 ID 为 1 的用户信息 `run(1)`
2. 我们通过某种手段更新了用户信息
3. 我们想重新发起上一次的请求，那我们就可以使用 `refresh` 来代替 `run(1)`，这在复杂参数的场景中是非常有用的

当然 `refresh` 和 `refreshAsync` 的区别和 `run` 和 `runAsync` 是一致的。
</markdown>

<script setup lang="tsx">
import Mock from 'mockjs'
import { useRequest } from 'pro-naive-ui'
import { onMounted } from 'vue'

const { data, loading, run, refresh } = useRequest((id: number) => getUsername(id), {
  manual: true,
})

function getUsername(id: number): Promise<string> {
  console.log('use-request-refresh-id', id)
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(Mock.mock('@name'))
    }, 1000)
  })
}

onMounted(() => {
  run(1)
})
</script>

<template>
  <div v-if="loading">
    loading...
  </div>
  <div v-else>
    <p>Username: {{ data }}</p>
    <n-button @click="refresh">
      Refresh
    </n-button>
  </div>
</template>
