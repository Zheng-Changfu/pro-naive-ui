<markdown>
# 异步获取数据
你可以使用 [useRequest](use-request) 异步获取数据
</markdown>

<script setup lang="tsx">
import type { ProEditDataTableColumns } from 'pro-naive-ui'
import { createProForm, useRequest } from 'pro-naive-ui'
import { ref } from 'vue'

interface DataSourceType {
  id: string
  title?: string
  now?: number
  rate?: number
}

interface Info {
  name: string
  userInfo: Array<{
    age: number
    name: string
  }>
  list: DataSourceType[]
}

async function reqUserInfo() {
  await delay(1000)
  const result: Info = {
    name: 'zcf',
    userInfo: [
      { name: 'zcf', age: 18 },
    ],
    list: [
      {
        id: '1',
        now: Date.now(),
        rate: 4,
        title: '任务一',
      },
      {
        id: '2',
        now: Date.now(),
        rate: 3,
        title: '任务二',
      },
      {
        id: '3',
        now: Date.now(),
        rate: 5,
        title: '任务三',
      },
    ],
  }
  return result
}
const editableKeys = ref<string[]>([])
const form = createProForm<Partial<Info>>({
  onSubmit: console.log,
})

const { loading, run } = useRequest(reqUserInfo, {
  manual: true,
  onSuccess(res) {
    form.restoreValidation() // 根据实际需求判断是否需要添加此代码，这里添加此行代码是有可能先点击提交触发校验，在点击获取数据需要清空校验
    form.values.value = res
    form.setInitialValues(res) // 将请求回来的值作为初始值，重置会回到初始值
  },
})

const columns: ProEditDataTableColumns<DataSourceType> = [
  {
    title: 'Title',
    path: 'title',
    field: 'input',
    width: 200,
  },
  {
    title: '时间',
    path: 'now',
    field: 'date-time',
    width: 200,
  },
  {
    title: '评分',
    path: 'rate',
    field: 'rate',
  },
  {
    title: '操作',
    width: 120,
    fixed: 'right',
    render: (row, rowIndex, action) => {
      const { remove, editable } = action
      return (
        <n-flex>
          {editable
            ? (
                <n-button
                  text={true}
                  type="primary"
                  onClick={() => cancelEditable(row.id)}
                >
                  保存
                </n-button>
              )
            : [
                <n-button
                  text={true}
                  type="primary"
                  onClick={() => editableKeys.value.push(row.id)}
                >
                  编辑
                </n-button>,
                <n-button
                  text={true}
                  type="error"
                  onClick={() => {
                    remove(rowIndex)
                    cancelEditable(row.id)
                  }}
                >
                  删除
                </n-button>,
              ]}
        </n-flex>
      )
    },
  },
]

function delay(time: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, time)
  })
}

function cancelEditable(id: string) {
  editableKeys.value = editableKeys.value.filter(key => key !== id)
}
</script>

<template>
  <n-flex class="mb-8px">
    <n-button @click="run()">
      请求
    </n-button>
    <n-button @click="form.restoreFieldsValue">
      重置
    </n-button>
    <n-button @click="form.submit">
      提交
    </n-button>
  </n-flex>
  <n-spin :show="loading">
    <pro-form :form="form">
      <pro-input
        title="姓名"
        path="name"
        required
      />
      <pro-form-list
        title="用户信息"
        path="userInfo"
        only-show-first-item-label
        required
      >
        <pro-input
          title="姓名"
          path="name"
          required
        />
        <pro-digit
          title="年龄"
          path="age"
          required
        />
      </pro-form-list>
      <pro-edit-data-table
        v-model:editable-keys="editableKeys"
        path="list"
        title="列表"
        required
        :columns="columns"
        :record-creator-props="{
          record: () => ({ id: Date.now() }),
        }"
        row-key="id"
      />
    </pro-form>
  </n-spin>
</template>
