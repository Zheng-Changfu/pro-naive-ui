<markdown>
# 开发自定义组件

有的时候你可能想从 0 开发一个组件接入到各个表单形态中（如 pro-form、 pro-search-form、pro-modal-form 等），以下例子展示了封装 `pro-json-code` 组件
</markdown>

<script setup lang="tsx">
import type { InputProps } from 'naive-ui'
import type { BaseFieldProps, ProFieldSharedSlots, ProSearchFormColumns } from 'pro-naive-ui'
import type { ExtractPublicPropTypes, PropType, SlotsType, VNodeChild } from 'vue'
import { NInput } from 'naive-ui'
import { createProSearchForm, proFieldSharedProps, ProFormItem, useFieldUtils, useProField } from 'pro-naive-ui'
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

const props = {
  /**
   * 继承公共的属性
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
  inheritAttrs: false,
  props,
  slots: Object as SlotsType<ProJsonCodeSlots>, // 继承公共的插槽
  setup(props) {
    const {
      field, // 字段实例
      mergedReadonly, // 是否为只读模式
      proFormItemProps, // 传递给 pro-form-item 的 props
      mergedFieldProps, // 传递给表单控件的 props，合并了 placeholder、v-model、外界传入的 field-props
    } = useProField(props)

    const {
      empty, // 值是否为空
      emptyDom, // 值为空时的 dom
    } = useFieldUtils(field) // 这是一个工具 composable

    return {
      field,
      empty,
      emptyDom,
      mergedReadonly,
      proFormItemProps,
      mergedFieldProps,
    }
  },
  render() {
    // 支持 visible、hidden 属性控制组件展示
    if (!this.field.show.value) {
      return
    }
    // pro-form-item 理解成 n-form-item 即可
    return (
      <ProFormItem>
        {{
          ...this.$slots,
          default: () => {
            let dom: VNodeChild
            if (this.mergedReadonly) {
              dom = this.empty
                ? this.emptyDom
                : (
                    <pre class="p-16px bg-#ccc">
                      <code>{this.field.value.value}</code>
                    </pre>
                  )
            }
            else {
              dom = <NInput {...this.mergedFieldProps} type="textarea" />
            }
            /**
             * 这里将调用用户的 input 插槽(如果存在)，支持用户自定义
             */
            return this.$slots.input
              ? this.$slots.input({
                  inputDom: dom,
                  readonly: this.mergedReadonly,
                  inputProps: this.mergedFieldProps,
                })
              : dom
          },
        }}
      </ProFormItem>
    )
  },
})

/**
 * 这里的代码作用是在 pro-search-form、pro-edit-data-table 编写 columns 具备完善的 ts 类型提示
 * 实际应该在全局的 .d.ts 中编写，这里是为了演示效果
 */
/**
 * 实际应该在全局中注册该组件，这里是为了演示效果
 */
const app = getCurrentInstance()?.appContext.app
app?.component('ProJsonCode', ProJsonCode)
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
