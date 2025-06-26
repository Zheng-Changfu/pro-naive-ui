<markdown>
# 参数管理

`useRequest` 返回的 `params` 会记录当次调用 `service` 的参数数组。比如你触发了 `run(1, 2, 3)`，则 `params` 中的内容为 `[1, 2, 3]` 。
</markdown>

<script setup lang="tsx">
import Mock from 'mockjs'
import { useRequest } from 'pro-naive-ui'
import { ref } from 'vue'

const username = ref('')
const { data, params, run } = useRequest(getUsername)

function getUsername(id: string): Promise<string> {
  console.log(id)
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(Mock.mock('@name'))
    }, 1000)
  })
}
</script>

<template>
  <div class="flex flex-col">
    <div class="flex gap-16px">
      <n-input
        v-model:value="username"
        placeholder="Please enter username"
        class="w-240px!"
      />
      <n-button @click="run(username)">
        GetUserName
      </n-button>
    </div>
    <p>
      UserId: {{ params[0] }}
    </p>
    <p>Username: {{ data }}</p>
  </div>
</template>
