<markdown>
# 空内容渲染

可以通过 `empty` 属性来渲染空内容，目前支持的有 `form`、`table`、`copyableText`、`dateText`、`images`、`tags`
</markdown>

<script setup lang="tsx">
import type { ProDataTableColumns } from 'pro-naive-ui'
import { createProForm, renderProCopyableText, renderProDateText, renderProImages, renderProTags } from 'pro-naive-ui'
import { ref } from 'vue'

const empty = {
  form: () => <span class="c-red">空</span>,
  table: '没有数据',
  copyableText: '没有数据',
  dateText: '没有数据',
  images: '没有数据',
  tags: '没有数据',
}
const form = createProForm()
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

const tableData = ref([
  { now: null, src: undefined, no: '', title: '', length: '' },
  { now: Date.now(), src: ['https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg', 'https://gw.alipayobjects.com/zos/antfincdn/aPkFc8Sj7n/method-draw-image.svg'], no: '122', title: 'Champagne Supernova', length: '7:27' },
])
</script>

<template>
  <pro-config-provider :empty="empty">
    <pro-form readonly :form="form">
      <pro-input title="用户名" path="name" />
    </pro-form>
    <pro-data-table
      :data="tableData"
      :columns="columns"
      row-key="no"
    />
  </pro-config-provider>
</template>
