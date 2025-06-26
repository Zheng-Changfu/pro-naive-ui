<markdown>
# 表单和表格联动

`useNDataTable` 接收 `form` 实例后，会返回 search 对象，用来处理表单相关事件。

- `search.submit` 提交表单成功后重置 `current` 到第一页，并重新发起请求
- `search.reset` 重置表单成功后重置 `current` 到第一页，并重新发起请求
- `search.resetLoading` 重置时的 `loading`
- `search.searchLoading` 查询时的 `loading`
- `search.proSearchFormProps` 直接交给 `pro-search-form` 组件的一些属性
</markdown>

<script setup lang="tsx">
import type { ProSearchFormColumns } from 'pro-naive-ui'
import { createProSearchForm, useNDataTable } from 'pro-naive-ui'

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

function getTableData({ current, pageSize }: any, formData: object): Promise<Result> {
  console.log(current, pageSize, formData)
  let query = `page=${current}&size=${pageSize}`
  Object.entries(formData).forEach(([key, value]) => {
    if (value) {
      query += `&${key}=${value}`
    }
  })

  return fetch(`https://randomuser.me/api?results=55&${query}`)
    .then(res => res.json())
    .then(res => ({
      total: res.info.results,
      list: res.results.slice(0, 10),
    }))
}

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

const searchColumns: ProSearchFormColumns<{
  name: string
  email: string
  phone: string
}> = [
  {
    title: 'name',
    path: 'name',
  },
  {
    title: 'email',
    path: 'email',
  },
  {
    title: 'phone',
    path: 'phone',
  },
]

const searchForm = createProSearchForm({
  initialValues: {
    name: 'hello',
    email: 'abc@gmail.com',
  },
})

const {
  table: {
    tableProps,
  },
  search: {
    proSearchFormProps,
  },
} = useNDataTable(getTableData, {
  form: searchForm,
})
</script>

<template>
  <div class="flex flex-col" :style="{ height: '800px' }">
    <pro-card title="筛选条件" class="mb-24px">
      <pro-search-form
        :form="searchForm"
        label-width="55"
        :columns="searchColumns"
        v-bind="proSearchFormProps"
      />
    </pro-card>
    <n-data-table
      class="flex-1"
      flex-height
      :columns="columns"
      :row-key="(row:any) => row.email"
      v-bind="tableProps"
    />
  </div>
</template>
