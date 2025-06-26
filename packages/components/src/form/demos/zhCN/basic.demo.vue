<markdown>
# 基本使用

默认的 `empty-text` 为 `'-'`，自定义请查看[空内容调整](config-provider#empty.vue)<br />
表单项的 `placeholder` 根据 `title` 生成，自定义请查看[在现有国际化基础上调整](config-provider#edit-i18n.vue) <br />
如果按钮被 `pro-form` 包裹，使用 `attr-type` 为 `submit` 提交表单， `attr-type` 为 `reset` 重置表单<br />
表单必填，填写 `required` 为 `true` 后内部会自动处理不同的 `type`，必填信息自定义请查看[在现有国际化基础上调整](config-provider#edit-i18n.vue)<br />
</markdown>

<script setup lang="ts">
import { createProForm } from 'pro-naive-ui'
import { ref } from 'vue'

const readonly = ref(false)
const form = createProForm<{
  username?: string
  password?: string
}>({
  onReset: console.log,
  onSubmit: console.log,
  onSubmitFailed: console.log,
})

const rules = {
  user: {
    age: {
      required: true,
    },
  },
}
</script>

<template>
  <n-switch v-model:value="readonly" class="mb-8px">
    <template #checked>
      编辑
    </template>
    <template #unchecked>
      只读
    </template>
  </n-switch>
  <pro-form
    :form="form"
    :rules="rules"
    :readonly="readonly"
    label-width="auto"
    label-placement="left"
  >
    <pro-input
      title="用户名"
      tooltip="用户名"
      path="username"
      required
    />
    <pro-digit
      title="年龄"
      path="user.age"
      :tooltip="['多行tooltip1', '多行tooltip2']"
    />
    <n-flex>
      <n-button attr-type="reset">
        重置
      </n-button>
      <n-button type="primary" attr-type="submit">
        提交
      </n-button>
    </n-flex>
  </pro-form>
</template>
