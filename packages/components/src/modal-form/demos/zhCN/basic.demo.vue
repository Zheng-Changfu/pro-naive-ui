<markdown>
# 基本用法
</markdown>

<script setup lang="tsx">
import { useMessage } from 'naive-ui'
import { createProModalForm } from 'pro-naive-ui'
import { ref } from 'vue'

const loading = ref(false)
const message = useMessage()

const modalForm = createProModalForm({
  onSubmit: async (values) => {
    loading.value = true
    await delay(1500)
    message.success('更新成功')
    console.log(values)
    modalForm.close()
    loading.value = false
  },
})

const { open } = modalForm

const len = ref(2)

function random(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function updateList() {
  len.value = random(2, 20)
}

function delay(time: number) {
  return new Promise(resolve => setTimeout(resolve, time))
}
</script>

<template>
  <n-flex>
    <n-button type="primary" @click="open">
      新建表单
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
    <n-button class="mb-12px" @click="updateList">
      更新动态高度
    </n-button>
    <pro-input
      v-for="(_, index) in len"
      :key="index"
      :title="`用户名-${index + 1}`"
      :path="`name-${index + 1}`"
    />
  </pro-modal-form>
</template>
