<markdown>
# 编辑表单回显
</markdown>

<script setup lang="tsx">
import { useMessage } from 'naive-ui'
import { createProModalForm } from 'pro-naive-ui'
import { ref } from 'vue'

function delay(time: number) {
  return new Promise(resolve => setTimeout(resolve, time))
}

const loading = ref(false)
const message = useMessage()

const modalForm = createProModalForm<{ name?: string, age?: number }>({
  onSubmit: async (values) => {
    loading.value = true
    await delay(1500)
    message.success('更新成功')
    console.log(values)
    modalForm.close()
    loading.value = false
  },
})

function edit() {
  modalForm.values.value = {
    name: 'zcf',
    age: 26,
  }
  modalForm.open()
}
</script>

<template>
  <n-flex>
    <n-button type="primary" @click="edit">
      编辑表单回显
    </n-button>
  </n-flex>
  <pro-modal-form
    :form="modalForm"
    :loading="loading"
    title="新建表单"
    preset="card"
    label-width="80"
    label-placement="left"
  >
    <pro-input
      title="用户名"
      path="name"
      required
    />
    <pro-digit
      title="年龄"
      path="age"
      required
    />
  </pro-modal-form>
</template>
