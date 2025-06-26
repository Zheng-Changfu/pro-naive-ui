<markdown>
# 日期相关表单

支持字符串格式和时间戳格式，字符串格式解析请使用 `value-format`
</markdown>

<script setup lang="tsx">
import { createProForm } from 'pro-naive-ui'
import { ref } from 'vue'

const readonly = ref(false)

const form = createProForm({
  initialValues: {
    'date': Date.now(),
    'time': '14:20:21',
    'week': Date.now(),
    'month': Date.now(),
    'quarter': Date.now(),
    'date-range': [
      '2024/07/28',
      '2024/07/29',
    ],
    'date-time-range': [
      Date.now() - 1000 * 60 * 60 * 24,
      Date.now(),
    ],
  },
  onSubmit: console.log,
})
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
    :readonly="readonly"
    label-width="auto"
  >
    <n-flex :style="{ width: '100%' }">
      <pro-date
        title="日期"
        path="date"
        required
      />
      <pro-date
        title="年月"
        path="date"
        required
        :field-props="{
          format: 'yyyy/MM',
        }"
      />
      <pro-date-time
        title="日期时间"
        path="time"
        :field-props="{
          valueFormat: 'HH:mm:ss',
        }"
      />
      <pro-date-week
        title="周"
        path="week"
      />
      <pro-date-month
        title="月"
        path="month"
      />
      <pro-date-month-range
        title="月区间"
        path="month-range"
      />
      <pro-date-quarter
        title="季度"
        path="quarter"
      />
      <pro-date-quarter-range
        title="季度区间"
        path="quarter-range"
      />
      <pro-date-year
        title="年"
        path="year"
      />
      <pro-date-year-range
        title="年区间"
        path="year-range"
      />
      <pro-time
        title="时间"
        path="date-time"
      />
      <pro-date-range
        title="日期区间"
        path="date-range"
        :field-props="{
          separator: '至',
          valueFormat: 'yyyy/MM/dd',
        }"
      />
      <pro-date-time-range
        title="日期时间区间"
        path="date-time-range"
      />
    </n-flex>
    <n-flex class="mt-16px">
      <n-button attr-type="reset">
        重置
      </n-button>
      <n-button type="primary" attr-type="submit">
        提交
      </n-button>
    </n-flex>
  </pro-form>
</template>
