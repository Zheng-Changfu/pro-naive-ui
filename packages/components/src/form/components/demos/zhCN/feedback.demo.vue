<markdown>
# 校验反馈

我们对 `feedback` 插槽扩展了参数，现在你可以用它实现`自定义校验 ui`或插入一些额外的东西
</markdown>

<script setup lang="ts">
import { createProForm } from 'pro-naive-ui'

const form = createProForm({
  onSubmit: console.log,
})
</script>

<template>
  <pro-form :form="form" label-placement="left" label-width="auto">
    <pro-input
      title="自定义校验 ui"
      path="custom-validate-ui"
      required
    >
      <template #feedback="{ feedbacks, feedbackColor }">
        <div v-if="feedbacks.length > 0" :style="{ color: feedbackColor }">
          😂😂😂{{ feedbacks[0].message }}😂😂😂
        </div>
      </template>
    </pro-input>
    <pro-digit
      title="extra 文案"
      path="extra"
      required
    >
      <template #feedback="{ feedbackDom }">
        <div class="flex flex-col">
          <component :is="feedbackDom" />
          <span class="color-#00000073">extra 文案信息....</span>
        </div>
      </template>
    </pro-digit>
    <n-button type="primary" attr-type="submit">
      提交
    </n-button>
  </pro-form>
</template>
