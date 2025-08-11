import type { InputProps } from 'naive-ui'
import type { SlotsType, VNodeChild } from 'vue'
import type { ProInputSlots } from './slots'
import { NFlex, NInput } from 'naive-ui'
import { computed, defineComponent } from 'vue'
import { useForwardRef } from '../../../composables/use-forward-ref'
import { useFieldUtils, useProField } from '../field'
import { ProFormItem } from '../form-item'
import { proInputProps } from './props'

const name = 'ProTextarea'
export default defineComponent({
  name,
  inheritAttrs: false,
  props: proInputProps,
  slots: Object as SlotsType<ProInputSlots>,
  setup(props) {
    const forwardRef = useForwardRef()

    const {
      field,
      mergedReadonly,
      proFormItemProps,
      mergedFieldProps,
    } = useProField<InputProps>(props, name)

    const {
      empty,
      emptyDom,
    } = useFieldUtils(field)

    const nInputProps = computed(() => {
      return {
        ...mergedFieldProps.value,
        type: 'textarea' as const,
        value: field.value.value ?? null,
      }
    })
    return {
      field,
      empty,
      emptyDom,
      forwardRef,
      nInputProps,
      mergedReadonly,
      proFormItemProps,
    }
  },
  render() {
    if (!this.field.show.value) {
      return
    }
    return (
      <ProFormItem {...this.proFormItemProps}>
        {{
          ...this.$slots,
          default: () => {
            let dom: VNodeChild
            if (this.mergedReadonly) {
              dom = this.empty
                ? this.emptyDom
                : (
                    <NFlex size="small">
                      {this.$slots.prefix && <span>{this.$slots.prefix()}</span>}
                      <span style="white-space: pre-wrap;">{this.field.value.value}</span>
                      {this.$slots.suffix && <span>{this.$slots.suffix()}</span>}
                    </NFlex>
                  )
            }
            else {
              dom = (
                <NInput
                  ref={this.forwardRef}
                  {...this.nInputProps}
                  v-slots={this.$slots}
                >
                </NInput>
              )
            }
            return this.$slots.input
              ? this.$slots.input({
                  inputDom: dom,
                  readonly: this.mergedReadonly,
                  inputProps: this.nInputProps,
                })
              : dom
          },
        }}
      </ProFormItem>
    )
  },
})
