<markdown>
# 双击行编辑
</markdown>

<script setup lang="tsx">
import type { ProEditDataTableColumns } from 'pro-naive-ui'
import { useMessage } from 'naive-ui'
import { createProForm } from 'pro-naive-ui'
import { ref } from 'vue'

interface DataSourceType {
  id: string
  now?: number
  rate?: number
  title?: string
  children?: DataSourceType[]
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
    title: () => {
      return [
        'Title',
        <span class="c-red">*</span>,
      ]
    },
    path: 'title',
    field: 'input',
    width: 200,
    proFieldProps: {
      required: true,
    },
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

function rowProps(row: DataSourceType) {
  return {
    style: 'cursor: pointer;',
    ondblclick: () => {
      if (!editableKeys.value.length) {
        editableKeys.value = [row.id]
        return
      }
      form.validate()!.then(() => {
        editableKeys.value = [row.id]
        message.success('保存成功')
      }).catch(() => {
        message.error('校验失败')
      })
    },
  }
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
        :row-props="rowProps"
        :action-guard="{
          afterAddRow: ({ insertIndex }) => {
            editableKeys = [form.values.value.list[insertIndex].id]
          },
        }"
        row-key="id"
      />
    </div>
    <n-button type="primary" attr-type="submit">
      提交
    </n-button>
  </pro-form>
</template>
