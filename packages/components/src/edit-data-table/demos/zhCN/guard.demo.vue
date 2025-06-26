<markdown>
# 拦截器
</markdown>

<script setup lang="tsx">
import type { ProEditDataTableActionGuard, ProEditDataTableColumns } from 'pro-naive-ui'
import { useMessage } from 'naive-ui'
import { createProForm } from 'pro-naive-ui'
import { ref } from 'vue'

interface DataSourceType {
  id: string
  title?: string
  now?: number
  rate?: number
}

const message = useMessage()
const editableKeys = ref<string[]>([])

const form = createProForm({
  initialValues: {
    list: [
      {
        id: '1',
        now: Date.now(),
        rate: 4,
        title: '任务一',
      },
      {
        id: '2',
        now: Date.now(),
        rate: 3,
        title: '任务二',
      },
      {
        id: '3',
        now: Date.now(),
        rate: 5,
        title: '任务三',
      },
    ],
  },
  onSubmit: console.log,
})

const columns: ProEditDataTableColumns<DataSourceType> = [
  {
    title: 'Title',
    path: 'title',
    field: 'input',
    width: 200,
  },
  {
    title: '时间',
    path: 'now',
    field: 'date-time',
    width: 200,
  },
  {
    title: '评分',
    path: 'rate',
    field: 'rate',
  },
]

const actionGuard: ProEditDataTableActionGuard = {
  beforeAddRow: async (opt) => {
    await delay(500)
    if (opt.total >= 5) {
      message.warning('最多只能添加 5 行')
      return false
    }
    return true
  },
  afterAddRow: ({ index, insertIndex, total }) => {
    console.log(`✅ 成功添加一行。原始位置：${index}，插入位置：${insertIndex}，总行数：${total}`)
  },
}

function delay(time: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, time)
  })
}
</script>

<template>
  <pro-form :form="form">
    <div class="flex flex-col">
      <pro-edit-data-table
        v-model:editable-keys="editableKeys"
        path="list"
        :columns="columns"
        :record-creator-props="{
          record: () => ({ id: Date.now() }),
        }"
        :action-guard="actionGuard"
        row-key="id"
      />
    </div>
    <n-button type="primary" attr-type="submit">
      提交
    </n-button>
  </pro-form>
</template>
