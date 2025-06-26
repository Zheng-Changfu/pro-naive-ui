<markdown>
# 应用在表格中

它常常会用在表格列的 `render` 函数中,他们不重,所以不需要考虑性能问题
</markdown>

<script setup lang="tsx">
import type { ProDataTableColumns } from 'pro-naive-ui'
import { renderProCopyableText, renderProDateText, renderProImages, renderProTags } from 'pro-naive-ui'
import { ref } from 'vue'

const columns = ref<ProDataTableColumns<{ src: any, title: string, now: number }>>([
  {
    title: '可复制文本',
    render: row => renderProCopyableText(row.title),
  },
  {
    title: 'tags',
    render: row => Math.random() < 0.5
      ? renderProTags(row.title)
      : renderProTags([
          {
            type: 'info',
            content: row.title,
          },
        ]),
  },
  {
    title: '日期格式化',
    render: row => renderProDateText(row.now, {
      pattern: Math.random() < 0.5 ? 'time' : 'week',
    }),
  },
  {
    title: '图片',
    width: 200,
    render: row => renderProImages(row.src),
  },
])

const data = ref([
  { now: Date.now(), src: 'https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg', no: '', title: 'Wonderwall', length: '4:18' },
  { now: '', src: '', no: '', title: 'Don\'t Look Back in Anger', length: '4:48' },
  { now: Date.now(), src: undefined, no: '12', title: 'Champagne Supernova', length: '7:27' },
  { now: Date.now(), src: null, no: '33', title: 'Wonderwall', length: '4:18' },
  { now: Date.now(), src: [], no: '44', title: null, length: '4:48' },
  { now: null, src: ['https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg', 'https://gw.alipayobjects.com/zos/antfincdn/aPkFc8Sj7n/method-draw-image.svg'], no: '122', title: 'Champagne Supernova', length: '7:27' },
  { now: Date.now(), src: '', no: null, title: 'Wonderwall', length: '4:18' },
  { now: Date.now(), src: '', no: '4444', title: 'Don\'t Look Back in Anger', length: '4:48' },
  { now: Date.now(), src: '', no: '1222', title: 'Champagne Supernova', length: '7:27' },
  { now: Date.now(), src: '', no: '33333', title: 'Wonderwall', length: '' },
])
</script>

<template>
  <pro-data-table
    title="简约组件"
    tooltip="plain component"
    :data="data"
    :columns="columns"
    row-key="no"
  />
</template>
