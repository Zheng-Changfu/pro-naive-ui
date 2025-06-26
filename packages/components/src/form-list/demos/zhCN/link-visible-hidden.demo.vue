<markdown>
# 联动-显示隐藏

使用 `row` 或 `values` 获取当前行的值控制联动
</markdown>

<script setup lang="tsx">
import { createProForm } from 'pro-naive-ui'

const form = createProForm({
  initialValues: {
    userInfo: [
      { name: 'zcf', age: 26 },
      { name: 'cxh', age: 28 },
    ],
  },
  onSubmit: console.log,
})

const { values } = form
</script>

<template>
  <pro-form :form="form" label-placement="top">
    <pro-form-list
      title="用户信息"
      path="userInfo"
      only-show-first-item-label
      :creator-initial-value="() => ({ name: 'Name', age: 0 })"
    >
      <template #default="{ row, index, total }">
        <pro-input
          title="姓名"
          path="name"
        >
          <template #feedback="{ feedbackDom }">
            <div class="flex flex-col">
              <component :is="feedbackDom" />
              <span class="color-#00000073">输入26显示年龄</span>
              <span class="color-#00000073">输入bj显示城市</span>
            </div>
          </template>
        </pro-input>
        <pro-digit
          title="年龄"
          path="age"
          :visible="row.name === '26'"
        />
        <pro-input
          :title="`城市-${total}`"
          path="city"
          required
          :visible="values.userInfo[index]?.name === 'bj'"
        />
      </template>
    </pro-form-list>
    <n-button type="primary" attr-type="submit">
      提交
    </n-button>
  </pro-form>
</template>
