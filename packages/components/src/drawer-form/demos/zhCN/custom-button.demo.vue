<markdown>
# 自定义按钮
</markdown>

<script setup lang="tsx">
import { useMessage } from 'naive-ui'
import { createProDrawerForm } from 'pro-naive-ui'
import { ref } from 'vue'

const loading = ref(false)
const message = useMessage()

const drawerForm1 = createProDrawerForm({
  onSubmit: async (values) => {
    loading.value = true
    await delay(1500)
    message.success('更新成功')
    console.log(values)
    drawerForm1.close()
    loading.value = false
  },
})

const drawerForm2 = createProDrawerForm({
  onSubmit: async (values) => {
    loading.value = true
    await delay(1500)
    message.success('更新成功')
    console.log(values)
    drawerForm2.close()
    loading.value = false
  },
})

const drawerForm3 = createProDrawerForm()
const drawerForm4 = createProDrawerForm()

function delay(time: number) {
  return new Promise(resolve => setTimeout(resolve, time))
}
</script>

<template>
  <n-flex>
    <n-button type="primary" @click="drawerForm1.open">
      自定义 footer 按钮
    </n-button>
    <n-button type="primary" @click="drawerForm2.open">
      自定义文字
    </n-button>
    <n-button type="primary" @click="drawerForm3.open">
      隐藏或修改按钮样式
    </n-button>
    <n-button type="primary" @click="drawerForm4.open">
      隐藏 footer
    </n-button>
  </n-flex>
  <pro-drawer-form
    :form="drawerForm1"
    :loading="loading"
    label-width="80"
    label-placement="left"
  >
    <pro-drawer-content
      title="新建表单"
      :native-scrollbar="false"
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
          <n-button @click="drawerForm1.submit()">
            ok
          </n-button>
        </n-flex>
      </template>
    </pro-drawer-content>
  </pro-drawer-form>
  <pro-drawer-form
    :loading="loading"
    :form="drawerForm2"
    label-width="80"
    label-placement="left"
  >
    <pro-drawer-content
      title="新建表单"
      :native-scrollbar="false"
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
    </pro-drawer-content>
  </pro-drawer-form>
  <pro-drawer-form
    :form="drawerForm3"
    label-width="80"
    label-placement="left"
  >
    <pro-drawer-content
      title="新建表单"
      :native-scrollbar="false"
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
    </pro-drawer-content>
  </pro-drawer-form>
  <pro-drawer-form
    :form="drawerForm4"
    label-width="80"
    label-placement="left"
  >
    <pro-drawer-content
      title="新建表单"
      :footer="false"
      :native-scrollbar="false"
    >
      <pro-input
        title="用户名"
        path="name"
      />
      <pro-digit
        title="年龄"
        path="age"
      />
    </pro-drawer-content>
  </pro-drawer-form>
</template>
