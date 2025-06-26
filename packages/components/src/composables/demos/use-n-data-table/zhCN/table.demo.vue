<markdown>
# Table 管理

`useNDataTable` 会自动管理表格分页数据，你只需要将返回的 `table` 属性中的 `tableProps` 传递给组件就可以了。
</markdown>

<script setup lang="tsx">
import { useNDataTable } from 'pro-naive-ui'

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
</script>

<template>
  <n-data-table
    :columns="columns"
    :row-key="(row:any) => row.email"
    v-bind="tableProps"
  />
</template>
