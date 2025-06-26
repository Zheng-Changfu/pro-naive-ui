<markdown>
# 动态属性

有些时候，你的数据可能是动态获取的，如果是动态的[通用属性](field#通用的属性)，需要写在 `proFieldProps` 中，如果是动态的 `fieldProps`，
你可以写成一个函数
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
  city: number
  appName2: string
}

const citys = ref<any[]>([])
const title = ref('动态通用属性')

const form = createProSearchForm<Partial<Info>>({
  onReset: console.log,
  onSubmit: console.log,
})

const columns: ProSearchFormColumns<Info> = [
  {
    title: '动态数据',
    path: 'city',
    field: 'select',
    fieldProps() {
      return {
        options: citys.value,
      }
    },
  },
  {
    path: 'appName2',
    proFieldProps() {
      return {
        title: title.value,
      }
    },
    onChange: (val) => {
      if (val.length > 6) {
        title.value = val.slice(0, 6)
      }
      else if (val.length <= 0) {
        title.value = '动态通用属性'
      }
      else {
        title.value = val
      }
    },
  },
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

setTimeout(() => {
  citys.value = [
    { label: '北京', value: 0 },
    { label: '上海', value: 1 },
  ]
}, 2000)
</script>

<template>
  <pro-card title="动态属性">
    <pro-search-form
      :form="form"
      :columns="columns"
      label-width="100"
    />
  </pro-card>
</template>
