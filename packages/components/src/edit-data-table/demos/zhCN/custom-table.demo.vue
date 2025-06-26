<markdown>
# 自定义可编辑表格
</markdown>

<script setup lang="tsx">
import type { ProEditDataTableColumns } from 'pro-naive-ui'
import { createProForm, ProInput } from 'pro-naive-ui'
import { ref } from 'vue'

interface DataSourceType {
  id: string
  title?: string
  now?: number
  rate?: number
}

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
    width: 200,
    render: (_, __, { editable }) => {
      return <ProInput path="title" readonly={!editable} />
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
  {
    title: '操作',
    width: 120,
    fixed: 'right',
    render: (row, rowIndex, action) => {
      const { remove, editable } = action
      return (
        <n-flex>
          {editable
            ? (
                <n-button
                  text={true}
                  type="primary"
                  onClick={() => cancelEditable(row.id)}
                >
                  保存
                </n-button>
              )
            : [
                <n-button
                  text={true}
                  type="primary"
                  onClick={() => editableKeys.value.push(row.id)}
                >
                  编辑
                </n-button>,
                <n-button
                  text={true}
                  type="error"
                  onClick={() => {
                    remove(rowIndex)
                    cancelEditable(row.id)
                  }}
                >
                  删除
                </n-button>,
              ]}
        </n-flex>
      )
    },
  },
]

function cancelEditable(id: string) {
  editableKeys.value = editableKeys.value.filter(key => key !== id)
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
        row-key="id"
      />
    </div>
    <n-button type="primary" attr-type="submit">
      提交
    </n-button>
  </pro-form>
</template>
