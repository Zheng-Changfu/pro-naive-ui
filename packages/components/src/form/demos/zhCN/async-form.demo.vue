<markdown>
# 异步获取数据

你可以使用 [useRequest](use-request) 异步获取数据
</markdown>

<script setup lang="tsx">
import { createProForm, useRequest } from 'pro-naive-ui'

interface Info {
  name: string
  userInfo: Array<{
    age: number
    name: string
  }>
}

function delay(time: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, time)
  })
}

async function reqUserInfo() {
  await delay(1000)
  const result: Info = {
    name: 'zcf',
    userInfo: [
      { name: 'zcf', age: 18 },
    ],
  }
  return result
}

const form = createProForm<Partial<Info>>({
  onSubmit: console.log,
})

const { loading, run } = useRequest(reqUserInfo, {
  manual: true,
  onSuccess(res) {
    form.restoreValidation() // 根据实际需求判断是否需要添加此代码，这里添加此行代码是有可能先点击提交触发校验，在点击获取数据需要清空校验
    form.values.value = res
    form.setInitialValues(res) // 将请求回来的值作为初始值，重置会回到初始值
  },
})
</script>

<template>
  <n-flex class="mb-8px">
    <n-button @click="run()">
      请求
    </n-button>
    <n-button @click="form.restoreFieldsValue">
      重置
    </n-button>
    <n-button @click="form.submit">
      提交
    </n-button>
  </n-flex>
  <n-spin :show="loading">
    <pro-form :form="form">
      <pro-input
        title="姓名"
        path="name"
        required
      />
      <pro-form-list
        title="用户信息"
        path="userInfo"
        only-show-first-item-label
        required
      >
        <pro-input
          title="姓名"
          path="name"
          required
        />
        <pro-digit
          title="年龄"
          path="age"
          required
        />
      </pro-form-list>
    </pro-form>
  </n-spin>
</template>
