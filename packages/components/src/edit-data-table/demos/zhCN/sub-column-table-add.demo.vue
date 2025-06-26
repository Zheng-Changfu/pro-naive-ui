<markdown>
# 有子列的表格增加
</markdown>

<script setup lang="tsx">
import type { ProEditDataTableColumns } from 'pro-naive-ui'
import { createProForm } from 'pro-naive-ui'
import { computed, ref } from 'vue'

interface DataSourceType {
  id: string
  title?: string
  now?: number
  rate?: number
  children?: DataSourceType[]
}

const editableKeys = ref<string[]>([])
const form = createProForm({
  initialValues: {
    list: [
      {
        id: '1',
        now: Date.now(),
        rate: 4,
        title: '父级标题',
        children: [
          {
            id: '1-1',
            now: Date.now(),
            rate: 3,
            title: '子标题1',
          },
          {
            id: '1-2',
            now: Date.now(),
            rate: 5,
            title: '子标题2',
          },
        ],
      },
    ],
  },
  onSubmit: console.log,
})

const rowItemToRowInfoMap = computed(() => {
  const map = new Map<string, { row: DataSourceType, parent: DataSourceType | null }>()
  const traverse = (data: DataSourceType[], parent: DataSourceType | null = null) => {
    data.forEach((item) => {
      map.set(item.id, { row: item, parent })
      if (item.children) {
        traverse(item.children, item)
      }
    })
  }
  traverse(form.values.value.list)
  return map
})

const columns: ProEditDataTableColumns<DataSourceType> = [
  {
    title: '',
    render: () => null,
  },
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
                  onClick={() => {
                    cancelEditable(row.id)
                  }}
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
                    cancelEditable(row.id)
                    const { parent } = rowItemToRowInfoMap.value.get(row.id)!
                    if (!parent) {
                      remove(rowIndex)
                    }
                    else {
                      const index = (parent.children ?? []).findIndex(item => item.id === row.id)
                      if (~index) {
                        parent.children!.splice(index, 1)
                      }
                    }
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
          parentRowKey: '1',
        }"
        row-key="id"
      />
    </div>
    <n-button type="primary" attr-type="submit">
      提交
    </n-button>
  </pro-form>
</template>
