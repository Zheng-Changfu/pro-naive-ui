<markdown>
# 开发自定义组件

有的时候你可能会对我们提供的组件再次封装，下面代码介绍了如何对 `pro-input` 进行二次封装
</markdown>

<script setup lang="tsx">
import type { ProInputSlots } from 'pro-naive-ui'
import type { SlotsType } from 'vue'
import { createProForm, ProInput, proInputProps, useForwardRef, useProField } from 'pro-naive-ui'
import { defineComponent, ref } from 'vue'

const readonly = ref(false)

const form = createProForm({
  onSubmit: console.log,
})

const XProInput = defineComponent({
  name: 'XProInput',
  props: proInputProps,
  slots: Object as SlotsType<ProInputSlots>,
  setup(props) {
    // 透传 ref
    const forwardRef = useForwardRef()
    /**
     * 取 'ProInput' 是因为内部会根据该值创建 placeholder 以及 pro-config-provider 组件 prop-overrides 的 key
     */
    const {
      field,
    } = useProField(props, 'ProInput')

    return {
      field,
      forwardRef,
    }
  },
  render() {
    return [
      <div>{this.field.value.value}</div>,
      <ProInput
        ref={this.forwardRef}
        {...this.$props}
        field-instance={this.field}
        v-slots={this.$slots}
      />,
    ]
  },
})
</script>

<template>
  <n-switch v-model:value="readonly" class="mb-8px">
    <template #checked>
      编辑
    </template>
    <template #unchecked>
      只读
    </template>
  </n-switch>
  <pro-form :readonly="readonly" :form="form" label-placement="left" label-width="auto">
    <XProInput title="姓名" path="name" required />
    <n-button type="primary" attr-type="submit">
      提交
    </n-button>
  </pro-form>
</template>
