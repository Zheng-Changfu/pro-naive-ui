import type { SlotsType, VNodeChild } from 'vue'
import type { ProAutoCompleteSlots } from './slots'
import { NAutoComplete, NFlex } from 'naive-ui'
import { computed, defineComponent } from 'vue'
import { useForwardRef } from '../../../composables/use-forward-ref'
import { useFieldUtils, useProField } from '../field'
import { ProFormItem } from '../form-item'
import { proAutoCompleteProps } from './props'

const name = 'ProAutoComplete'
export default defineComponent({
  name,
  inheritAttrs: false,
  props: proAutoCompleteProps,
  slots: Object as SlotsType<ProAutoCompleteSlots>,
  setup(props) {
    const forwardRef = useForwardRef()

    const {
      field,
      mergedReadonly,
      proFormItemProps,
      mergedFieldProps,
    } = useProField(props, name)

    const {
      empty,
      emptyDom,
    } = useFieldUtils(field)

    const nAutoCompleteProps = computed(() => {
      return {
        ...mergedFieldProps.value,
        value: field.value.value ?? '',
      }
    })

    return {
      field,
      empty,
      emptyDom,
      forwardRef,
      mergedReadonly,
      proFormItemProps,
      nAutoCompleteProps,
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
                <NAutoComplete
                  ref={this.forwardRef}
                  {...this.nAutoCompleteProps}
                  v-slots={this.$slots}
                >
                </NAutoComplete>
              )
            }
            return this.$slots.input
              ? this.$slots.input({
                  inputDom: dom,
                  readonly: this.mergedReadonly,
                  inputProps: this.nAutoCompleteProps,
                })
              : dom
          },
        }}
      </ProFormItem>
    )
  },
})
