import type { InputOtpProps } from 'naive-ui'
import type { SlotsType, VNodeChild } from 'vue'
import type { ProInputOtpSlots } from './slots'
import { NFlex, NInputOtp } from 'naive-ui'
import { computed, defineComponent } from 'vue'
import { useFieldUtils, useProField } from '../field'
import { ProFormItem } from '../form-item'
import { proInputOtpProps } from './props'

const name = 'ProInputOtp'
export default defineComponent({
  name,
  inheritAttrs: false,
  props: proInputOtpProps,
  slots: Object as SlotsType<ProInputOtpSlots>,
  setup(props) {
    const {
      field,
      mergedReadonly,
      proFormItemProps,
      mergedFieldProps,
    } = useProField<InputOtpProps>(props, name)

    const {
      empty,
      emptyDom,
    } = useFieldUtils(field)

    const nInputOtpProps = computed(() => {
      return {
        ...mergedFieldProps.value,
        value: field.value.value ?? null,
      }
    })

    return {
      field,
      empty,
      emptyDom,
      mergedReadonly,
      proFormItemProps,
      nInputOtpProps,
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
              if (this.$slots.default as any) {
                dom = (
                  <NInputOtp
                    {...this.nInputOtpProps}
                    readonly
                    v-slots={this.$slots}
                  >
                  </NInputOtp>
                )
              }
              else {
                dom = this.empty
                  ? this.emptyDom
                  : this.nInputOtpProps.mask
                    ? '********'
                    : (
                        <NFlex size="small">
                          <span>{this.field.value.value}</span>
                        </NFlex>
                      )
              }
            }
            else {
              dom = (
                <NInputOtp
                  {...this.nInputOtpProps}
                  v-slots={this.$slots}
                >
                </NInputOtp>
              )
            }
            return this.$slots.input
              ? this.$slots.input({
                  inputDom: dom,
                  readonly: this.mergedReadonly,
                  inputProps: this.nInputOtpProps,
                })
              : dom
          },
        }}
      </ProFormItem>
    )
  },
})
