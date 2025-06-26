<markdown>
# 联动-异步循环
有的时候 A 发生变化要改变 B,B 发生变化要改变 A,你可以使用 `onChange` 完成需求
</markdown>

<script setup lang="tsx">
import { createProForm } from 'pro-naive-ui'

function delay(time: number) {
  return new Promise(resolve => setTimeout(resolve, time))
}

interface Info {
  A: number
  B: number
  name: string
}

const form = createProForm({
  initialValues: {
    info: [
      { name: 'zcf', age: 26, A: null, B: null },
      { name: 'zzx', age: 0.5, A: null, B: null },
    ],
  },
})

async function fetchUpdateBAndName(row: Info) {
  await delay(500)
  row.B = 1
  row.name = 'BBBBBB'
}

async function fetchUpdateAAndName(index: number) {
  await delay(500)
  // @ts-ignore
  form.values.value.info[index].A = 0
  form.values.value.info[index].name = 'AAAAA'
}
</script>

<template>
  <pro-form
    :form="form"
    label-width="auto"
  >
    <pro-form-list
      title="用户信息"
      path="info"
      only-show-first-item-label
    >
      <template #default="{ index, row }">
        <pro-select
          title="A"
          path="A"
          :field-props="{
            class: 'w-180px',
            options: [
              { label: 'A', value: 0 },
              { label: 'AA', value: 1 },
            ],
          }"
          @change="fetchUpdateBAndName(row)"
        />
        <pro-select
          title="B"
          path="B"
          :field-props="{
            class: 'w-180px',
            options: [
              { label: 'B', value: 0 },
              { label: 'BB', value: 1 },
            ],
          }"
          @change="fetchUpdateAAndName(index)"
        />
        <pro-input
          title="姓名"
          path="name"
        />
      </template>
    </pro-form-list>
  </pro-form>
</template>
