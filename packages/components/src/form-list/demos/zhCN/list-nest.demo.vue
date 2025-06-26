<markdown>
# 表单列表嵌套

内部会自动处理路径，可以很方便的实现嵌套及联动
</markdown>

<script setup lang="tsx">
import { createProForm } from 'pro-naive-ui'

const form = createProForm({
  initialValues: {
    users: [
      { name: 'zcf' },
    ],
  },
  onSubmit: console.log,
})
</script>

<template>
  <pro-form :form="form">
    <pro-input
      title="姓名"
      path="name"
      required
    />
    <pro-form-list
      title="用户信息"
      path="users"
      required
    >
      <template #item="{ index, itemDom, actionDom }">
        <n-card
          embedded
          :title="`标题${index + 1}`"
          class="mb-8px"
        >
          <component :is="itemDom" />
          <template #header-extra>
            <component :is="actionDom" />
          </template>
        </n-card>
      </template>
      <n-flex>
        <pro-input
          title="姓名"
          name="name"
        />
        <pro-input
          title="昵称"
          name="nickName"
        />
      </n-flex>
      <pro-form-list
        title="用户信息"
        path="labels"
        required
        :copy-button-props="{
          tooltip: '复制',
        }"
        :remove-button-props="{
          tooltip: '不需要这行了',
        }"
      >
        <n-flex>
          <pro-input
            title="值"
            path="value"
          />
          <pro-input
            title="显示名称"
            path="label"
          />
        </n-flex>
      </pro-form-list>
    </pro-form-list>
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
