<markdown>
# 开发自定义组件

你希望将自定义组件支持在各种表单类型中使用，下面代码介绍了如何封装 `pro-json-code` 组件。
</markdown>

<script setup lang="tsx">
import type { InputProps } from 'naive-ui'
import type { BaseFieldProps, ProFieldSharedSlots } from 'pro-naive-ui'
import type { PropType, SlotsType, VNodeChild } from 'vue'
import { inputProps, NInput } from 'naive-ui'
import { createProForm, ProField, proFieldSharedProps, useFieldUtils, useOverrideProps } from 'pro-naive-ui'
import { defineComponent, ref } from 'vue'

const readonly = ref(true)

const form = createProForm({
  onSubmit: console.log,
  initialValues: {
    code: `{
  "compilerOptions": {
    "target": "esnext",
    "moduleResolution": "node",
    "jsx": "preserve",
    "esModuleInterop": true,
    "experimentalDecorators": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "noImplicitReturns": true,

    "declaration": true,
    "skipLibCheck": true
  },
}
`,
  },
})

const JsonCode = defineComponent({
  name: 'JsonCode',
  props: inputProps,
  setup() {
    /**
     * 这个 composable 包含了一些你可能会用到的属性
     */
    const {
      empty,
      value,
      readonly,
      emptyDom,
    } = useFieldUtils()

    return {
      value,
      empty,
      readonly,
      emptyDom,
    }
  },
  render() {
    let dom: VNodeChild

    if (this.readonly) {
      dom = this.empty
        ? this.emptyDom
        : (
            <pre class="p-16px bg-#ccc">
              <code>{this.value}</code>
            </pre>
          )
    }
    else {
      dom = <NInput {...this.$props} type="textarea" />
    }
    /**
     * 这里将调用用户的 input 插槽(如果存在)，支持用户自定义
     */
    return this.$slots.input
      ? this.$slots.input({
          inputDom: dom,
          readonly: this.readonly,
          inputProps: this.$props,
        })
      : dom
  },
})

const ProJsonCode = defineComponent({
  name: 'ProJsonCode',
  props: {
    /**
     * 应该继承公共的属性
     */
    ...proFieldSharedProps,
    /**
     * InputProps 就是你这个组件的 props，外界使用时通过 fieldProps 传递
     */
    fieldProps: Object as PropType<BaseFieldProps<InputProps>>,
  },
  /**
   * 这里你应该继承公共的插槽
   */
  slots: Object as SlotsType<ProFieldSharedSlots<InputProps>>,
  setup(props) {
    /**
     * 允许该组件的 props 可以被 pro-config-provider 重写
     */
    const overridedProps = useOverrideProps(
      'ProJsonCode',
      props,
    )
    return {
      overridedProps,
    }
  },
  render() {
    return (
      <ProField {...this.overridedProps}>
        {{
          ...this.$slots, // 透传公共的插槽
          input: (options: { inputProps: InputProps, readonly: boolean }) => {
            return <JsonCode {...options.inputProps} v-slots={this.$slots}></JsonCode>
          },
        }}
      </ProField>
    )
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
    <ProJsonCode
      title="json 代码块"
      tooltip="代码块"
      path="code"
      :field-props="{
        autosize: true,
      }"
    />
    <n-button type="primary" attr-type="submit">
      提交
    </n-button>
  </pro-form>
</template>
