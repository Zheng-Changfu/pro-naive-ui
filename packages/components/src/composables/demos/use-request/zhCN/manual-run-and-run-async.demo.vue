<markdown>
# 手动触发

如果设置了 `options.manual = true`，则 `useRequest` 不会默认执行，需要通过 `run` 或者 `runAsync` 来触发执行。

```tsx
const { loading, run, runAsync } = useRequest(service, {
  manual: true
});

<button :disabled="loading" @click="run">
  {{ loading ? 'Loading' : 'Edit' }}
</button>
````

`run` 与 `runAsync` 的区别在于：

- `run` 是一个普通的同步函数，我们会自动捕获异常，你可以通过 `options.onError` 来处理异常时的行为。
- `runAsync` 是一个返回 `Promise` 的异步函数，如果使用 `runAsync` 来调用，则意味着你需要自己捕获异常。

```ts
  runAsync().then((data) => {
    console.log(data);
  }).catch((error) => {
    console.log(error);
  })
```

接下来我们通过修改用户名这个简单的场景，来演示 useRequest 手动触发模式，以及 `run` 与 `runAsync` 的区别。
</markdown>

<script setup lang="tsx">
import { useMessage } from 'naive-ui'
import { useRequest } from 'pro-naive-ui'
import { ref } from 'vue'

const username = ref('')
const username2 = ref('')
const message = useMessage()

const { loading, run } = useRequest(editUsername, {
  manual: true,
  onSuccess: (result, params) => {
    username.value = ''
    message.success(`The username was changed to "${params[0]}" !`)
  },
  onError: (error) => {
    message.error(error.message)
  },
})

const { loading: loading2, runAsync } = useRequest(editUsername, {
  manual: true,
})

async function editUsernameByRunAsync() {
  try {
    const name = username2.value
    await runAsync(name)
    username2.value = ''
    message.success(`The username was changed to "${name}" !`)
  }
  catch (error: any) {
    message.error(error.message)
  }
}

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
  <div>
    <n-h3>通过 run(username) 来修改用户名，通过 onSuccess 和 onError 来处理成功和失败</n-h3>
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
  </div>
  <div>
    <n-h3>通过 runAsync(username) 来修改用户名，此时必须通过 catch 来自行处理异常</n-h3>
    <div class="flex gap-16px">
      <n-input
        v-model:value="username2"
        placeholder="Please enter username"
        class="w-240px!"
      />
      <n-button :disabled="loading2" @click="editUsernameByRunAsync">
        {{ loading2 ? 'Loading' : 'Edit' }}
      </n-button>
    </div>
  </div>
</template>
