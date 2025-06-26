<markdown>
# 自定义按钮
</markdown>

<script setup lang="tsx">
import type { ProSearchFormColumns } from 'pro-naive-ui'
import { createProSearchForm } from 'pro-naive-ui'

interface Info {
  appName: string
  appStatus: string
  createTime: number
}

const form1 = createProSearchForm({
  onReset: console.log,
  onSubmit: console.log,
})

const form2 = createProSearchForm({
  onReset: console.log,
  onSubmit: console.log,
})

const form3 = createProSearchForm({
  onReset: console.log,
  onSubmit: console.log,
})

const form4 = createProSearchForm({
  onReset: console.log,
  onSubmit: console.log,
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
]
</script>

<template>
  <n-flex vertical>
    <pro-card title="自定义按钮">
      <pro-search-form
        :form="form1"
        :columns="columns"
      >
        <template #suffix="{ suffixDom }">
          <n-button type="error" @click="form1.toggleCollapse()">
            ok
          </n-button>
          <component :is="suffixDom" />
        </template>
      </pro-search-form>
    </pro-card>
    <pro-card title="自定义文字">
      <pro-search-form
        :form="form2"
        :columns="columns"
        :reset-button-props="{
          content: '重置～',
        }"
        :search-button-props="{
          content: '搜索',
        }"
        :collapse-button-props="{
          content: form2.collapsed.value ? '展开～' : '收起～',
        }"
      />
    </pro-card>
    <pro-card title="隐藏或修改按钮样式">
      <pro-search-form
        :form="form3"
        :columns="columns"
        :search-button-props="false"
        :collapse-button-props="false"
        :reset-button-props="{
          dashed: true,
        }"
      />
    </pro-card>
    <pro-card title="隐藏 suffix">
      <pro-search-form
        :form="form4"
        :columns="columns"
        :show-suffix-grid-item="false"
      />
    </pro-card>
  </n-flex>
</template>
