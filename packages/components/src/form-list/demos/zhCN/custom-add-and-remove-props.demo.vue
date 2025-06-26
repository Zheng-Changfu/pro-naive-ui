<markdown>
# 自定义新增、复制、删除属性

如果传入的属性为 `false`，则不显示对应按钮
</markdown>

<script setup lang="tsx">
import { CloseCircleOutlined, PlusCircleTwotone, SmileOutlined } from '@vicons/antd'
import { NIcon } from 'naive-ui'
import { createProForm } from 'pro-naive-ui'

const form = createProForm()

function renderCreatorIcon() {
  return (
    <NIcon>
      <PlusCircleTwotone />
    </NIcon>
  )
}

function renderCopyIcon() {
  return (
    <NIcon>
      <SmileOutlined />
    </NIcon>
  )
}

function renderRemoveIcon() {
  return (
    <NIcon>
      <CloseCircleOutlined />
    </NIcon>
  )
}
</script>

<template>
  <pro-form :form="form">
    <pro-form-list
      title="用户信息"
      path="userInfo"
      only-show-first-item-label
      :creator-button-props="{
        tooltip: '新增~~',
        renderIcon: renderCreatorIcon,
      }"
      :copy-button-props="{
        tooltip: '你是牛马么？',
        renderIcon: renderCopyIcon,
      }"
      :remove-button-props="{
        tooltip: 'No~',
        renderIcon: renderRemoveIcon,
      }"
    >
      <pro-input
        title="姓名"
        path="name"
      />
      <pro-digit
        title="年龄"
        path="age"
      />
    </pro-form-list>
  </pro-form>
</template>
