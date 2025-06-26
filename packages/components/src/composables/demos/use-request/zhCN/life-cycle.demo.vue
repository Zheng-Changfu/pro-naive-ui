<markdown>
# 生命周期

`useRequest` 提供了以下几个生命周期配置项，供你在异步函数的不同阶段做一些处理。

- `onBefore`：请求之前触发
- `onSuccess`：请求成功触发
- `onError`：请求失败触发
- `onFinally`：请求完成触发
</markdown>

<script setup lang="tsx">
import { useMessage } from 'naive-ui'
import { useRequest } from 'pro-naive-ui'
import { ref } from 'vue'

const username = ref('')
const message = useMessage()

const { loading, run } = useRequest(editUsername, {
  manual: true,
  onBefore: (params) => {
    message.info(`Start Request: ${params[0]}`)
  },
  onSuccess: (result, params) => {
    username.value = ''
    message.success(`The username was changed to "${params[0]}" !`)
  },
  onError: (error) => {
    message.error(error.message)
  },
  // eslint-disable-next-line unused-imports/no-unused-vars
  onFinally: (params, result, error) => {
    message.info(`Request finish`)
  },
})

function editUsername(username: string): Promise<void> {
  console.log(username)
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() > 0.5) {
        resolve()
      }
      else {
        reject(new Error('Failed to modify username'))
      }
    }, 1000)
  })
}
</script>

<template>
  <div class="flex gap-16px">
    <n-input
      v-model:value="username"
      placeholder="Please enter username"
      class="w-240px!"
    />
    <n-button :disabled="loading" @click="run(username)">
      {{ loading ? 'Loading' : 'Edit' }}
    </n-button>
  </div>
</template>
