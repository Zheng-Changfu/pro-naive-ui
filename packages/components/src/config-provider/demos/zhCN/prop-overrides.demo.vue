<markdown>
# 覆盖组件 props

我们提供了 `prop-overrides` 选项,你可以对本组件库中的所有组件 props 覆盖为新的值

<n-alert type="warning" title="注意" :bordered="false">
  覆盖规则是浅合并的，优先级遵循就近优先原则
</n-alert>
</markdown>

<script setup lang="tsx">
import type { UploadFileInfo } from 'naive-ui'
import { useMessage } from 'naive-ui'
import { createProForm } from 'pro-naive-ui'

const message = useMessage()
const form = createProForm()
const propOverrides = {
  ProDigit: {
    fieldProps: {
      min: 0,
      precision: 2,
    },
  },
  ProCard: {
    showCollapse: false,
  },
  ProUpload: {
    fieldProps: {
      maxSize: 1,
      onlyAcceptImage: true,
      onOverSize: (maxSize: number, data: {
        file: UploadFileInfo
        fileList: UploadFileInfo[]
      }) => {
        console.log(maxSize, data)
        message.warning('文件超出大小')
      },
      onUnAcceptType: (data: {
        file: UploadFileInfo
        fileList: UploadFileInfo[]
      }) => {
        console.log(data)
        message.warning('不支持的文件类型')
      },
    },
  },
}
</script>

<template>
  <pro-config-provider :prop-overrides="propOverrides">
    <pro-form :form="form">
      <pro-digit title="精度2位,不能小于0" path="digit" />
      <pro-digit title="用户优先" path="digit2" :field-props="{ precision: 0 }" />
      <pro-upload title="上传" path="upload" />
    </pro-form>
    <pro-card title="默认没有展开收起图标">
      <div>这是一段无意义的内容...</div>
      <div>这是一段无意义的内容...</div>
      <div>这是一段无意义的内容...</div>
    </pro-card>
  </pro-config-provider>
</template>
