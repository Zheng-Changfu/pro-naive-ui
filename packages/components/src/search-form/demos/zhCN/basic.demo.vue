<markdown>
# 基本使用

`field` 代表要被渲染的组件, 默认为 `'input'`
</markdown>

<script setup lang="tsx">
import type { ProSearchFormColumns } from 'pro-naive-ui'
import { createProSearchForm } from 'pro-naive-ui'
import { ref } from 'vue'

interface Info {
  appName: string
  appStatus: string
  createTime: number
  responseDate: number
  endTime: number
}

const loading = ref(false)
const layout = ref<'left' | 'top'>('left')

const form = createProSearchForm<Partial<Info>>({
  defaultCollapsed: true, // 默认收起
  onReset: console.log,
  onSubmit: async (values) => {
    console.log(values)
    loading.value = true
    await delay(1500)
    loading.value = false
  },
})

const columns: ProSearchFormColumns<Info> = [
  {
    title: '应用名称',
    path: 'appName',
  },
  {
    title: '创建时间',
    path: 'createTime',
    field: 'date',
  },
  {
    title: '应用状态',
    path: 'appStatus',
  },
  {
    title: '响应日期',
    path: 'responseDate',
    field: 'date-time',
  },
  {
    title: '结束日期',
    path: 'endTime',
    field: 'date',
  },
]

function delay(time: number) {
  return new Promise(resolve => setTimeout(resolve, time))
}
</script>

<template>
  <div class="mb-12px flex">
    <div class="mr-12px">
      布局方式:
    </div>
    <n-radio-group v-model:value="layout">
      <n-radio label="水平" value="left" />
      <n-radio label="垂直" value="top" />
    </n-radio-group>
  </div>
  <pro-card title="搜索表单">
    <pro-search-form
      :form="form"
      :loading="loading"
      :columns="columns"
      :label-placement="layout"
    />
  </pro-card>
</template>
