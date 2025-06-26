<markdown>
# 额外的分页属性

有的时候可能表格还需要增加额外的分页属性，这时候你可以扩展 `tableProps`，如果你觉得很麻烦，参考[组件 Props 覆盖](config-provider#prop-overrides.vue)
</markdown>

<script setup lang="tsx">
import type { DataTableProps } from 'naive-ui'
import { useNDataTable } from 'pro-naive-ui'
import { computed } from 'vue'

interface Item {
  name: {
    last: string
  }
  email: string
  phone: string
  gender: 'male' | 'female'
}

interface Result {
  total: number
  list: Item[]
}

function getTableData({ current, pageSize }: any): Promise<Result> {
  console.log(current, pageSize)
  const query = `page=${current}&size=${pageSize}`

  return fetch(`https://randomuser.me/api?results=55&${query}`)
    .then(res => res.json())
    .then(res => ({
      list: res.results.slice(0, 10),
      total: res.info.results,
    }))
}

const { table: { tableProps } } = useNDataTable(getTableData)

const columns = [
  {
    title: 'name',
    key: 'name.last',
  },
  {
    title: 'email',
    key: 'email',
  },
  {
    title: 'phone',
    key: 'phone',
  },
  {
    title: 'gender',
    key: 'gender',
  },
]

const finalTableProps = computed<DataTableProps>(() => {
  const { pagination, ...rest } = tableProps.value
  return {
    ...rest,
    pagination: {
      ...pagination,
      showSizePicker: true,
      showQuickJumper: true,
      pageSizes: [10, 20, 30, 40],
      prefix: ({ itemCount }) => `Total is ${itemCount}.`,
    },
  }
})
</script>

<template>
  <n-data-table
    :columns="columns"
    :row-key="(row:any) => row.email"
    v-bind="finalTableProps"
  />
</template>
