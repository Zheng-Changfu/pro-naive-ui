<markdown>
# 异步获取数据
</markdown>

<script lang="tsx">
import { createProForm } from 'pro-naive-ui'
import { defineComponent, ref } from 'vue'

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

export default defineComponent({
  setup() {
    const loading = ref(false)
    const form = createProForm<Info>({
      onSubmit: console.log,
    })

    async function reqUserInfo() {
      loading.value = true
      await delay(1000)
      const result: Info = {
        name: 'zcf',
        userInfo: [
          { name: 'zcf', age: 18 },
        ],
      }
      form.restoreValidation() // 根据实际需求判断是否需要添加此代码，这里添加此行代码是有可能先点击提交触发校验，在点击获取数据需要清空校验
      form.setFieldsValue(result) // 覆盖表单的所有数据，而不是合并
      form.setInitialValues(result) // 将请求回来的值作为初始值，重置会回到初始值
      loading.value = false
      return result
    }

    return {
      form,
      loading,
      reqUserInfo,
    }
  },
})
</script>

<template>
  <n-flex class="mb-8px">
    <n-button @click="reqUserInfo">
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
