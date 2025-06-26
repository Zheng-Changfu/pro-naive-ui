<markdown>
# 横向布局
</markdown>

<script setup lang="tsx">
import { createProForm } from 'pro-naive-ui'

const form = createProForm({
  initialValues: {
    attributes: [
      {
        name: '颜色',
        items: [
          { name: '红' },
          { name: '橙' },
        ],
      },
    ],
  },
})
</script>

<template>
  <pro-form :form="form" label-placement="left">
    <pro-form-list
      title="规格信息"
      path="attributes"
      :min="1"
      :creator-initial-value="() => ({
        name: '颜色',
        items: [
          { name: '红' },
          { name: '橙' },
        ],
      })"
      :copy-button-props="false"
      :creator-button-props="{
        content: '添加规格项',
      }"
    >
      <template #item="{ index, itemDom, actionDom }">
        <n-card
          embedded
          :title="`规格${index + 1}`"
          class="mb-8px"
        >
          <template #header-extra>
            <component :is="actionDom" />
          </template>
          <component :is="itemDom" />
        </n-card>
      </template>
      <pro-input
        title="规格名"
        path="name"
      />
      <pro-form-list
        title="规格值"
        path="items"
        :min="1"
        :creator-button-props="{
          dashed: false,
          block: false,
          renderIcon: undefined,
          ghost: true,
          text: true,
          type: 'info',
          content: '新建',
        }"
        :copy-button-props="false"
        :remove-button-props="{
          tooltip: '删除',
        }"
      >
        <template #item="{ itemDom, actionDom }">
          <div class="inline-flex me-25px">
            <component :is="itemDom" />
            <div class="ml-8px">
              <component :is="actionDom" />
            </div>
          </div>
        </template>
        <pro-input
          path="name"
          :field-props="{
            class: 'w-104px!',
          }"
        />
      </pro-form-list>
    </pro-form-list>
  </pro-form>
</template>
