import type { SlotsType, VNodeChild } from 'vue'
import type { ProInputOtpSlots } from '../slots'
import { inputOtpProps, NFlex, NInputOtp } from 'naive-ui'
import { computed, defineComponent } from 'vue'
import { useFieldUtils } from '../../field'

export default defineComponent({
  name: 'InputOtp',
  props: inputOtpProps,
  slots: Object as SlotsType<ProInputOtpSlots>,
  inheritAttrs: false,
  setup(props) {
    const {
      empty,
      value,
      readonly,
      emptyDom,
    } = useFieldUtils()

    const nInputOtpProps = computed(() => {
      return {
        ...props,
        value: props.value ?? null,
      }
    })

    return {
      empty,
      value,
      readonly,
      emptyDom,
      nInputOtpProps,
    }
  },
  render() {
    let dom: VNodeChild
    if (this.readonly) {
      if (this.$slots.default as any) {
        dom = (
          <NInputOtp
            {...this.$attrs}
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
                  <span>{this.value}</span>
                </NFlex>
              )
      }
    }
    else {
      dom = (
        <NInputOtp
          {...this.$attrs}
          {...this.nInputOtpProps}
          v-slots={this.$slots}
        >
        </NInputOtp>
      )
    }
    return this.$slots.input
      ? this.$slots.input({
          inputDom: dom,
          readonly: this.readonly,
          inputProps: this.nInputOtpProps,
        })
      : dom
  },
})
