import type { SlotsType } from 'vue'
import type { ProDrawerContentProps } from './props'
import type { ProDrawerContentSlots } from './slots'
import { NDrawerContent, NFlex } from 'naive-ui'
import { computed, defineComponent } from 'vue'
import { resolveSlotWithProps } from '../../../_utils/resolve-slot'
import { useOmitProps, useOverrideProps } from '../../../composables'
import Footer from './footer'
import { proDrawerContentExtendProps, proDrawerContentProps } from './props'

const name = 'ProDrawerContent'
export default defineComponent({
  name,
  props: proDrawerContentProps,
  slots: Object as SlotsType<ProDrawerContentSlots>,
  setup(props) {
    const overridedProps = useOverrideProps<ProDrawerContentProps>(
      name,
      props,
    )

    const nDrawerContentProps = useOmitProps(
      overridedProps,
      proDrawerContentExtendProps,
    )

    return {
      nDrawerContentProps,
      footer: computed(() => overridedProps.value.footer),
      resetButtonProps: computed(() => overridedProps.value.resetButtonProps),
      submitButtonProps: computed(() => overridedProps.value.submitButtonProps),
    }
  },
  render() {
    return (
      <NDrawerContent {...this.nDrawerContentProps}>
        {{
          ...this.$slots,
          footer: this.footer !== false
            ? () => {
                const footerDom = (
                  <Footer
                    resetButtonProps={this.resetButtonProps}
                    submitButtonProps={this.submitButtonProps}
                  />
                )

                return resolveSlotWithProps(this.$slots.footer, {
                  footerDom,
                }, () => {
                  return this.footer
                    ? this.footer({ footerDom })
                    : <NFlex justify="flex-end" size="small">{footerDom}</NFlex>
                })
              }
            : null,
        }}
      </NDrawerContent>
    )
  },
})
