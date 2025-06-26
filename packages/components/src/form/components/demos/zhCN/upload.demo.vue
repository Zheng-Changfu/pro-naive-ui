<markdown>
# 上传表单

我们增加了一些额外的属性
- title:按钮文本，优先级低于默认插槽
- maxSize:文件的最大大小，单位 kb
- onlyAcceptImage:是否只允许上传图片类型
- onOverSize:超出文件最大大小时触发的回调
- onUnAcceptType:上传不支持的类型文件时触发的回调
</markdown>

<script setup lang="tsx">
import type { UploadFileInfo } from 'naive-ui'
import { ArchiveOutline as ArchiveIcon } from '@vicons/ionicons5'
import { useMessage } from 'naive-ui'
import { createProForm, uid } from 'pro-naive-ui'

const message = useMessage()

const form = createProForm({
  initialValues: {
    'upload': [
      {
        id: uid(),
        name: 'naive',
        url: 'https://www.naiveui.com/assets/naivelogo-BdDVTUmz.svg',
        status: 'finished',
      },
    ],
    'upload-image': [
      {
        id: uid(),
        name: 'naive-1',
        url: 'https://www.naiveui.com/assets/naivelogo-BdDVTUmz.svg',
        status: 'finished',
      },
      {
        id: uid(),
        name: 'naive-2',
        url: 'https://www.naiveui.com/assets/naivelogo-BdDVTUmz.svg',
        status: 'finished',
      },
    ],
    'drag-upload': [
      {
        id: 'a',
        name: '我错了，但我可以改.png',
        status: 'error',
      },
      {
        id: 'd',
        name: '现在还不行呢.doc',
        status: 'uploading',
        percentage: 50,
      },
      {
        id: 'c',
        name: '现在就可下载哟.png',
        status: 'finished',
        url: 'https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg',
      },
    ],
  },
  onSubmit: console.log,
})

function onUnAcceptType(data: {
  file: UploadFileInfo
  fileList: UploadFileInfo[]
}) {
  console.log(data)
  message.warning('只支持上传图片')
}
</script>

<template>
  <pro-form :form="form" label-width="auto">
    <n-card title="上传表单" embedded>
      <pro-upload title="上传" path="upload" />
      <pro-upload
        title="上传"
        path="upload-image"
        :field-props="{
          listType: 'image-card',
          onlyAcceptImage: true,
          onUnAcceptType,
        }"
      />
      <pro-upload
        title="拖拽上传"
        path="drag-upload"
        :field-props="{
          multiple: true,
          action: 'https://www.mocky.io/v2/5e4bafc63100007100d8b70f',
          directoryDnd: true,
        }"
      >
        <n-upload-dragger>
          <div style="margin-bottom: 12px">
            <n-icon size="48" :depth="3">
              <ArchiveIcon />
            </n-icon>
          </div>
          <n-text style="font-size: 16px">
            点击或者拖动文件到该区域来上传
          </n-text>
          <n-p depth="3" style="margin: 8px 0 0 0">
            请不要上传敏感数据，比如你的银行卡号和密码，信用卡号有效期和安全码
          </n-p>
        </n-upload-dragger>
      </pro-upload>
    </n-card>
    <n-flex class="mt-16px">
      <n-button attr-type="reset">
        重置
      </n-button>
      <n-button type="primary" attr-type="submit">
        提交
      </n-button>
    </n-flex>
  </pro-form>
</template>
