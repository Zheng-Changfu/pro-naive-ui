import type { InputNumberProps } from 'naive-ui'
import type { SlotsType, VNodeChild } from 'vue'
import type { ProDigitSlots } from './slots'
import { NFlex, NInputNumber } from 'naive-ui'
import { computed, defineComponent } from 'vue'
import { useForwardRef } from '../../../composables/use-forward-ref'
import { useFieldUtils, useProField } from '../field'
import { ProFormItem } from '../form-item'
import { proDigitProps } from './props'

const name = 'ProDigit'
export default defineComponent({
  name,
  inheritAttrs: false,
  props: proDigitProps,
  slots: Object as SlotsType<ProDigitSlots>,
  setup(props) {
    const forwardRef = useForwardRef()

    const {
      field,
      mergedReadonly,
      proFormItemProps,
      mergedFieldProps,
    } = useProField<InputNumberProps>(props, name)

    const {
      empty,
      emptyDom,
    } = useFieldUtils(field)

    const nInputNumberProps = computed(() => {
      return {
        ...mergedFieldProps.value,
        value: field.value.value ?? null,
      }
    })
    return {
      field,
      empty,
      emptyDom,
      forwardRef,
      mergedReadonly,
      proFormItemProps,
      nInputNumberProps,
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
                      <span>{this.field.value.value}</span>
                      {this.$slots.suffix && <span>{this.$slots.suffix()}</span>}
                    </NFlex>
                  )
            }
            else {
              dom = (
                <NInputNumber
                  ref={this.forwardRef}
                  {...this.nInputNumberProps}
                  v-slots={this.$slots}
                >
                </NInputNumber>
              )
            }
            return this.$slots.input
              ? this.$slots.input({
                  inputDom: dom,
                  readonly: this.mergedReadonly,
                  inputProps: this.nInputNumberProps,
                })
              : dom
          },
        }}
      </ProFormItem>
    )
  },
})
