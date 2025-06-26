<markdown>
# 扩展的插槽
</markdown>

<script setup lang="tsx">
import type { ProDataTableColumns } from 'pro-naive-ui'
import { renderProCopyableText, renderProDateText, renderProImages, renderProTags } from 'pro-naive-ui'
import { ref } from 'vue'

const columns = ref<ProDataTableColumns<{ src: any, title: string, now: number }>>([
  {
    title: '可复制文本',
    width: 300,
    render: row => renderProCopyableText(row.title),
  },
  {
    title: 'tags',
    width: 100,
    render: row => renderProTags(row.title),
  },
  {
    title: '日期格式化',
    width: 100,
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

const data = ref([
  { now: Date.now(), src: '', no: '', title: 'Don\'t Look Back in Anger', length: '4:48' },
  { now: Date.now(), src: 'https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg', no: '3', title: 'Wonderwall', length: '4:18' },
  { now: Date.now(), src: undefined, no: '12', title: 'Champagne Supernova', length: '7:27' },
])
</script>

<template>
  <pro-data-table
    :data="data"
    :columns="columns"
    row-key="no"
  >
    <template #title>
      #title
    </template>
    <template #toolbar>
      #toolbar
    </template>
    <template #extra>
      #extra
    </template>
    <template #table="{ tableDom }">
      <div>#table</div>
      <component :is="tableDom" />
    </template>
  </pro-data-table>
</template>
