<markdown>
# 联动-跨组件

有的时候你的表单项可能被分散在各个组件，你可以使用 `useInjectProForm` 直接注入表单控制器
</markdown>

<script setup lang="tsx">
import { createProForm, useInjectProForm } from 'pro-naive-ui'
import { defineComponent } from 'vue'

interface Info {
  name?: string
  disableInput?: boolean
}

const Comp1 = defineComponent({
  setup() {
    const { values } = useInjectProForm<Info>()!
    return {
      values,
    }
  },
  render() {
    return (
      <pro-input
        title="名字"
        path="name"
        fieldProps={{
          disabled: this.values.disableInput,
        }}
      />
    )
  },
})

const Comp2 = defineComponent({
  render() {
    return <pro-checkbox title="禁用输入框" path="disableInput" />
  },
})

const form = createProForm()
</script>

<template>
  <pro-form :form="form" label-placement="left" label-width="auto">
    <Comp1 />
    <Comp2 />
  </pro-form>
</template>
