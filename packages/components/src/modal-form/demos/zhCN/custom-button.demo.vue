<markdown>
# 自定义按钮
</markdown>

<script setup lang="tsx">
import { useMessage } from 'naive-ui'
import { createProModalForm } from 'pro-naive-ui'
import { ref } from 'vue'

const loading = ref(false)
const message = useMessage()

const modalForm1 = createProModalForm({
  onSubmit: async (values) => {
    loading.value = true
    await delay(1500)
    message.success('更新成功')
    console.log(values)
    modalForm1.close()
    loading.value = false
  },
})

const modalForm2 = createProModalForm({
  onSubmit: async (values) => {
    loading.value = true
    await delay(1500)
    message.success('更新成功')
    console.log(values)
    modalForm2.close()
    loading.value = false
  },
})

const modalForm3 = createProModalForm()
const modalForm4 = createProModalForm()

function delay(time: number) {
  return new Promise(resolve => setTimeout(resolve, time))
}
</script>

<template>
  <n-flex>
    <n-button type="primary" @click="modalForm1.open">
      自定义 footer 按钮
    </n-button>
    <n-button type="primary" @click="modalForm2.open">
      自定义文字
    </n-button>
    <n-button type="primary" @click="modalForm3.open">
      隐藏或修改按钮样式
    </n-button>
    <n-button type="primary" @click="modalForm4.open">
      隐藏 footer
    </n-button>
  </n-flex>
  <pro-modal-form
    :form="modalForm1"
    :loading="loading"
    title="新建表单"
    preset="card"
    label-width="80"
    label-placement="left"
  >
    <pro-input
      title="用户名"
      path="name"
    />
    <pro-digit
      title="年龄"
      path="age"
    />
    <template #footer="{ footerDom }">
      <n-flex justify="end" size="small">
        <component :is="footerDom" />
        <n-button @click="modalForm1.submit()">
          ok
        </n-button>
      </n-flex>
    </template>
  </pro-modal-form>
  <pro-modal-form
    :form="modalForm2"
    :loading="loading"
    title="新建表单"
    preset="card"
    label-width="80"
    label-placement="left"
    :reset-button-props="{
      content: '关闭',
      tooltip: '关闭弹窗',
    }"
    :submit-button-props="{
      content: '提交',
      tooltip: '提交表单',
    }"
  >
    <pro-input
      title="用户名"
      path="name"
    />
    <pro-digit
      title="年龄"
      path="age"
    />
  </pro-modal-form>
  <pro-modal-form
    :form="modalForm3"
    :loading="loading"
    title="新建表单"
    preset="card"
    label-width="80"
    label-placement="left"
    :submit-button-props="false"
    :reset-button-props="{
      dashed: true,
    }"
  >
    <pro-input
      title="用户名"
      path="name"
    />
    <pro-digit
      title="年龄"
      path="age"
    />
  </pro-modal-form>
  <pro-modal-form
    :form="modalForm4"
    title="新建表单"
    preset="card"
    label-width="80"
    label-placement="left"
    :footer="false"
  >
    <pro-input
      title="用户名"
      path="name"
    />
    <pro-digit
      title="年龄"
      path="age"
    />
  </pro-modal-form>
</template>
