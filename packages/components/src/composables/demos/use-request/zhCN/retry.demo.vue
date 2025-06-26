<markdown>
# 错误重试

通过设置 `options.retryCount`，指定错误重试次数，则 useRequest 在失败后会进行重试。你可以在下面 input 框中输入文本，并点击 Edit 按钮，体验效果
</markdown>

<script setup lang="tsx">
import { useMessage } from 'naive-ui'
import { useRequest } from 'pro-naive-ui'
import { ref } from 'vue'

const username = ref('')
const message = useMessage()

const { loading, run } = useRequest(editUsername, {
  manual: true,
  retryCount: 3,
  onError: (error) => {
    message.error(error.message)
  },
})

function editUsername(username: string) {
  console.log(username)
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject(new Error('Failed to modify username'))
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
