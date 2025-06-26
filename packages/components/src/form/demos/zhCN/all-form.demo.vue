<markdown>
# 所有类型的表单

它们都是扩展了 `create-pro-form` ，增加了一些更好用的方法 <br />
</markdown>

<script setup lang="tsx">
import type { ProSearchFormColumns } from 'pro-naive-ui'
import { createProDrawerForm, createProForm, createProModalForm, createProSearchForm } from 'pro-naive-ui'
import { ref } from 'vue'

type FormType = 'pro-form' | 'pro-search-form' | 'pro-modal-form' | 'pro-drawer-form'
interface Info {
  name: string
  age: number
  status: 0 | 1 | 2
  date: number
  time: number
  info: {
    dateRange: [number, number]
  }
  projectName: string
}

function delay(time: number) {
  return new Promise(resolve => setTimeout(resolve, time))
}

const loading = ref(false)
const type = ref<FormType>('pro-form')

const columns: ProSearchFormColumns<Info> = [
  {
    title: '姓名',
    path: 'name',
    tooltip: '最长为 24 位',
    fieldProps: {
      maxlength: 24,
    },
  },
  {
    title: '年龄',
    path: 'age',
    field: 'digit',
  },
  {
    title: '状态',
    path: 'status',
    field: 'select',
    fieldProps: {
      options: [
        { label: '正常', value: 0 },
        { label: '异常', value: 1 },
        { label: '离职', value: 2 },
      ],
    },
  },
  {
    title: '日期',
    path: 'date',
    field: 'date',
  },
  {
    title: '时间',
    path: 'time',
    field: 'time',
  },
  {
    title: '日期时间',
    path: 'info.dateRange',
    field: 'date-time',
  },
  {
    title: '项目名称',
    path: 'projectName',
    field: 'date-time',
  },
]

const form = createProForm({
  initialValues: {
    age: 18,
  },
  onReset: console.log,
  onSubmit: async (values) => {
    loading.value = true
    console.log(values)
    await delay(1500)
    loading.value = false
  },
  onSubmitFailed: console.log,
})

const searchForm = createProSearchForm<Partial<Info>>({
  onReset: console.log,
  onSubmit: async (values) => {
    loading.value = true
    console.log(values)
    await delay(1500)
    loading.value = false
  },
  defaultCollapsed: true,
  onSubmitFailed: console.log,
})

const modalForm = createProModalForm({
  initialValues: {
    age: 18,
  },
  onReset: console.log,
  onSubmit: async (values) => {
    loading.value = true
    console.log(values)
    await delay(1500)
    modalForm.close()
    loading.value = false
  },
  onSubmitFailed: console.log,
})

const drawerForm = createProDrawerForm({
  initialValues: {
    age: 18,
  },
  onReset: console.log,
  onSubmit: async (values) => {
    loading.value = true
    console.log(values)
    await delay(1500)
    drawerForm.close()
    loading.value = false
  },
  onSubmitFailed: console.log,
})
</script>

<template>
  <n-radio-group v-model:value="type" class="mb-16px">
    <n-radio-button label="pro-form" value="pro-form" />
    <n-radio-button label="pro-modal-form" value="pro-modal-form" />
    <n-radio-button label="pro-drawer-form" value="pro-drawer-form" />
    <n-radio-button label="pro-search-form" value="pro-search-form" />
  </n-radio-group>
  <pro-form
    v-if="type === 'pro-form'"
    :form="form"
    :loading="loading"
    label-width="auto"
  >
    <n-grid :cols="2" x-gap="16">
      <n-gi>
        <pro-input
          title="姓名"
          path="name"
          tooltip="最长为 24 位"
          :field-props="{
            maxlength: 24,
          }"
        />
      </n-gi>
      <n-gi>
        <pro-digit
          title="年龄"
          path="age"
        />
      </n-gi>
      <n-gi>
        <pro-select
          title="状态"
          path="status"
          :field-props="{
            options: [
              { label: '正常', value: 0 },
              { label: '异常', value: 1 },
              { label: '离职', value: 2 },
            ],
          }"
        />
      </n-gi>
      <n-gi>
        <pro-date title="日期" path="date" />
      </n-gi>
      <n-gi>
        <pro-time title="时间" path="time" />
      </n-gi>
      <n-gi>
        <pro-date-time title="日期时间" path="info.dateRange" />
      </n-gi>
      <n-gi>
        <pro-date-time title="项目名称" path="projectName" />
      </n-gi>
    </n-grid>
    <n-flex>
      <n-button attr-type="reset">
        重置
      </n-button>
      <n-button
        type="primary"
        attr-type="submit"
        :loading="loading"
      >
        {{ loading ? '提交中...' : '提交' }}
      </n-button>
    </n-flex>
  </pro-form>
  <pro-search-form
    v-if="type === 'pro-search-form'"
    :form="searchForm"
    :loading="loading"
    :columns="columns"
  />
  <pro-modal-form
    v-if="type === 'pro-modal-form'"
    title="弹窗表单"
    preset="card"
    :loading="loading"
    :form="modalForm"
  >
    <n-grid :cols="2" x-gap="16">
      <n-gi>
        <pro-input
          title="姓名"
          path="name"
          tooltip="最长为 24 位"
          :field-props="{
            maxlength: 24,
          }"
        />
      </n-gi>
      <n-gi>
        <pro-digit
          title="年龄"
          path="age"
        />
      </n-gi>
      <n-gi>
        <pro-select
          title="状态"
          path="status"
          :field-props="{
            options: [
              { label: '正常', value: 0 },
              { label: '异常', value: 1 },
              { label: '离职', value: 2 },
            ],
          }"
        />
      </n-gi>
      <n-gi>
        <pro-date title="日期" path="date" />
      </n-gi>
      <n-gi>
        <pro-time title="时间" path="time" />
      </n-gi>
      <n-gi>
        <pro-date-time title="日期时间" path="info.dateRange" />
      </n-gi>
      <n-gi>
        <pro-date-time title="项目名称" path="projectName" />
      </n-gi>
    </n-grid>
  </pro-modal-form>
  <pro-drawer-form
    v-if="type === 'pro-drawer-form'"
    :form="drawerForm"
    :loading="loading"
  >
    <pro-drawer-content
      title="抽屉表单"
      :native-scrollbar="false"
      closable
    >
      <n-grid :cols="2" x-gap="16">
        <n-gi>
          <pro-input
            title="姓名"
            path="name"
            tooltip="最长为 24 位"
            :field-props="{
              maxlength: 24,
            }"
          />
        </n-gi>
        <n-gi>
          <pro-digit
            title="年龄"
            path="age"
          />
        </n-gi>
        <n-gi>
          <pro-select
            title="状态"
            path="status"
            :field-props="{
              options: [
                { label: '正常', value: 0 },
                { label: '异常', value: 1 },
                { label: '离职', value: 2 },
              ],
            }"
          />
        </n-gi>
        <n-gi>
          <pro-date title="日期" path="date" />
        </n-gi>
        <n-gi>
          <pro-time title="时间" path="time" />
        </n-gi>
        <n-gi>
          <pro-date-time title="日期时间" path="info.dateRange" />
        </n-gi>
        <n-gi>
          <pro-date-time title="项目名称" path="projectName" />
        </n-gi>
      </n-grid>
    </pro-drawer-content>
  </pro-drawer-form>
  <div class="ml-20px">
    <n-button
      v-if="type === 'pro-modal-form'"
      type="primary"
      @click="modalForm.open "
    >
      新建表单
    </n-button>
    <n-button
      v-if="type === 'pro-drawer-form'"
      type="primary"
      @click="drawerForm.open"
    >
      新建表单
    </n-button>
  </div>
</template>
