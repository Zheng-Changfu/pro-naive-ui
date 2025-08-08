import type { RateProps } from 'naive-ui'
import type { SlotsType, VNodeChild } from 'vue'
import type { ProRateSlots } from './slots'
import { NRate } from 'naive-ui'
import { computed, defineComponent } from 'vue'
import { useProField } from '../field'
import { ProFormItem } from '../form-item'
import { proRateProps } from './props'

const name = 'ProRate'
export default defineComponent({
  name,
  inheritAttrs: false,
  props: proRateProps,
  slots: Object as SlotsType<ProRateSlots>,
  setup(props) {
    const {
      field,
      mergedReadonly,
      proFormItemProps,
      mergedFieldProps,
    } = useProField<RateProps>(props, name)

    const nRateProps = computed(() => {
      return {
        ...mergedFieldProps.value,
        value: field.value.value ?? null as any,
        readonly: mergedReadonly.value || mergedFieldProps.value.readonly,
      }
    })

    return {
      field,
      nRateProps,
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
            const dom: VNodeChild = (
              <NRate
                {...this.nRateProps}
                v-slots={this.$slots}
              >
              </NRate>
            )
            return this.$slots.input
              ? this.$slots.input({
                  inputDom: dom,
                  readonly: this.mergedReadonly,
                  inputProps: this.nRateProps,
                })
              : dom
          },
        }}
      </ProFormItem>
    )
  },
})
