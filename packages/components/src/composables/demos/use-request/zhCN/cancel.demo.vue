<markdown>
# 取消响应

`useRequest` 提供了 `cancel` 函数，用于**忽略**当前 promise 返回的数据和错误

**注意：调用 `cancel` 函数并不会取消 promise 的执行**

同时 `useRequest` 会在以下时机自动忽略响应：

- 组件卸载时，正在进行的 promise
- 竞态取消，当上一次 promise 还没返回时，又发起了下一次 promise，则会忽略上一次 promise 的响应
</markdown>

<script setup lang="tsx">
import { useMessage } from 'naive-ui'
import { useRequest } from 'pro-naive-ui'
import { ref } from 'vue'

const username = ref('')
const message = useMessage()

const { loading, run, cancel } = useRequest(editUsername, {
  manual: true,
  onSuccess: (result, params) => {
    username.value = ''
    message.success(`The username was changed to "${params[0]}" !`)
  },
  onError: (error) => {
    message.error(error.message)
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
    <n-button type="error" @click="cancel">
      Cancel
    </n-button>
  </div>
</template>
