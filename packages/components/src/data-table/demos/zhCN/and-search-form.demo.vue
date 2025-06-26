<markdown>
# 搭配查询表单

这也是一个表格高度自适应的案例
</markdown>

<script setup lang="tsx">
import type { ProDataTableColumns, ProSearchFormColumns } from 'pro-naive-ui'
import { createProSearchForm, renderProCopyableText, renderProDateText, renderProImages, renderProTags, useNDataTable } from 'pro-naive-ui'
import { ref } from 'vue'

const columns = ref<ProDataTableColumns<{ src: any, title: string, now: number }>>([
  {
    title: '可复制文本',
    render: row => renderProCopyableText(row.title),
  },
  {
    title: 'tags',
    render: row => renderProTags(row.title),
  },
  {
    title: '日期格式化',
    render: row => renderProDateText(row.now, {
      pattern: 'quarter',
    }),
  },
  {
    title: '图片',
    width: 200,
    render: row => renderProImages(row.src),
  },
])

const searchColumns: ProSearchFormColumns<{
  name: string
  endTime: number
  createTime: number
  responseTime: number
}> = [
  {
    title: '名称',
    path: 'name',
  },
  {
    title: '创建时间',
    path: 'createTime',
    field: 'date',
  },
  {
    title: '响应时间',
    path: 'responseTime',
    field: 'date',
  },
  {
    title: '响应时间',
    path: 'responseTime',
    field: 'date',
  },
]

const searchForm = createProSearchForm({
  initialValues: {
    responseTime: Date.now(),
  },
})

const {
  table: {
    tableProps,
  },
  search: {
    proSearchFormProps,
  },
} = useNDataTable(({
  current,
  pageSize,
  filters,
  sorter,
}, values) => fetchList({ current, pageSize, filters, sorter }, values), {
  form: searchForm,
})

function fetchList(params: any, values: any) {
  console.log(params, values, '@@@')
  return new Promise<{ total: number, list: any[] }>((resolve) => {
    setTimeout(() => {
      resolve({
        total: 987,
        list: [
          { now: Date.now(), src: 'https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg', no: '3', title: 'Wonderwall', length: '4:18' },
          { now: Date.now(), src: '', no: '', title: 'Don\'t Look Back in Anger', length: '4:48' },
          { now: Date.now(), src: undefined, no: '12', title: 'Champagne Supernova', length: '7:27' },
          { now: Date.now(), src: null, no: '33', title: 'Wonderwall', length: '4:18' },
          { now: Date.now(), src: [], no: '44', title: 'Don\'t Look Back in Anger', length: '4:48' },
          { now: Date.now(), src: ['https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg', 'https://gw.alipayobjects.com/zos/antfincdn/aPkFc8Sj7n/method-draw-image.svg'], no: '122', title: 'Champagne Supernova', length: '7:27' },
          { now: Date.now(), src: '', no: '333', title: 'Wonderwall', length: '4:18' },
          { now: Date.now(), src: '', no: '4444', title: 'Don\'t Look Back in Anger', length: '4:48' },
          { now: Date.now(), src: '', no: '1222', title: 'Champagne Supernova', length: '7:27' },
          { now: Date.now(), src: '', no: '33333', title: 'Wonderwall', length: '4:18' },
        ],
      })
    }, 1500)
  })
}
</script>

<template>
  <!-- 在后台场景中你需要设置为弹性盒子，然后 flex-1 即可，不需要加这个高度 -->
  <div class="flex flex-col" :style="{ height: '800px' }">
    <pro-card title="筛选条件" class="mb-24px">
      <pro-search-form
        :form="searchForm"
        label-placement="top"
        :columns="searchColumns"
        v-bind="proSearchFormProps"
      />
    </pro-card>
    <pro-data-table
      title="查询表格"
      flex-height
      :columns="columns"
      row-key="no"
      v-bind="tableProps"
    />
  </div>
</template>
