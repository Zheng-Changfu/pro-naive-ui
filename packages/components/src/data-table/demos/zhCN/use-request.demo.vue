<markdown>
# 异步

我们封装了 [useNDataTable](use-n-data-table) 帮助你轻松对接 `NDataTable`
</markdown>

<script setup lang="tsx">
import type { ProDataTableColumns } from 'pro-naive-ui'
import { renderProCopyableText, renderProImages, useNDataTable } from 'pro-naive-ui'
import { ref } from 'vue'

const columns = ref<ProDataTableColumns<{ src: any, title: string, now: number }>>([
  {
    title: '远程过滤',
    filter: true,
    path: 'filter',
    width: 300,
    filterOptions: [
      {
        label: 'value1',
        value: 1,
      },
      {
        label: 'value2',
        value: 2,
      },
    ],
    render: row => renderProCopyableText(row.title),
  },
  {
    title: '远程排序',
    width: 300,
    path: 'title',
    sorter: true,
    sortOrder: false,
  },
  {
    title: '图片',
    render: row => renderProImages(row.src),
  },
])

const { table: { tableProps } } = useNDataTable(({
  current,
  pageSize,
  sorter,
  filters,
}) => fetchList({ current, pageSize, sorter, filters }))

function fetchList(params: any) {
  console.log(params, '@@@')
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
  <pro-data-table
    title="远程数据"
    :columns="columns"
    row-key="no"
    v-bind="tableProps"
  />
</template>
