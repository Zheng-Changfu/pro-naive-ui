<markdown>
# 自定义组件接入 pro-search-form

如果想支持以 `field` 的形式在 `pro-search-form`、`pro-edit-data-table` 组件中使用，以 `pro-json-code` 组件为例，你需要做以下事情
- 使用 `Vue` 注册 `pro-json-code` 组件
- `Typescript` 类型提示扩展
</markdown>

<script setup lang="tsx">
import type { InputProps } from 'naive-ui'
import type { BaseFieldProps, ProFieldSharedSlots, ProSearchFormColumns } from 'pro-naive-ui'
import type { ExtractPublicPropTypes, PropType, SlotsType, VNodeChild } from 'vue'
import { inputProps, NInput } from 'naive-ui'
import { createProSearchForm, ProField, proFieldSharedProps, useFieldUtils, useOverrideProps } from 'pro-naive-ui'
import { defineComponent, getCurrentInstance } from 'vue'

const searchForm = createProSearchForm({
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

const columns: ProSearchFormColumns<{ code: string }> = [
  {
    title: '代码块',
    path: 'code',
    tooltip: '代码块',
    field: 'json-code', // 这里会有类型提示
    fieldProps: { // 这里会有类型提示
      autosize: true,
    },
  },
]

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

const props = {
  /**
   * 应该继承公共的属性
   */
  ...proFieldSharedProps,
  /**
   * InputProps 就是你这个组件的 props，外界使用时通过 fieldProps 传递
   */
  fieldProps: Object as PropType<BaseFieldProps<InputProps>>,
} as const

type ProJsonCodeProps = ExtractPublicPropTypes<typeof props>
type ProJsonCodeSlots = ProFieldSharedSlots<InputProps>

const ProJsonCode = defineComponent({
  name: 'ProJsonCode',
  props,
  /**
   * 这里你应该继承公共的插槽
   */
  slots: Object as SlotsType<ProJsonCodeSlots>,
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

/**
 * 实际应该在全局中注册该组件，这里是为了演示效果
 */
const app = getCurrentInstance()?.appContext.app
app?.component('ProJsonCode', ProJsonCode)

/**
 * 实际应该在全局的 .d.ts 中编写，这里是为了演示效果
 */
declare module 'pro-naive-ui'{
  interface ProFieldCustomColumn {
    /**
     * 如果扩展了多个 field，你应该如下编写
     * column: JsonCodeColumn | XColumn | YColumn | ....
     */
    column: JsonCodeColumn
  }

  interface JsonCodeColumn {
    field: 'json-code'
    fieldSlots: ProJsonCodeSlots
    fieldProps: ProJsonCodeProps['fieldProps']
  }
}
</script>

<template>
  <pro-search-form :form="searchForm" :columns="columns" />
</template>
