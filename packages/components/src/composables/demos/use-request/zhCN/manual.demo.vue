<markdown>
# 手动触发

如果设置了 `options.manual = true`，则 useRequest 不会默认执行，需要通过 `run` 来触发执行。
</markdown>

<script setup lang="tsx">
import { useMessage } from 'naive-ui'
import { useRequest } from 'pro-naive-ui'
import { ref } from 'vue'

const username = ref('')
const message = useMessage()

const { loading, run } = useRequest(changeUsername, {
  manual: true,
  onSuccess(result, params) {
    if (result.success) {
      username.value = ''
      message.success(`The username was changed to "${params[0]}" !`)
    }
  },
})

function changeUsername(username: string): Promise<{ success: boolean }> {
  console.log(username)
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: true })
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
