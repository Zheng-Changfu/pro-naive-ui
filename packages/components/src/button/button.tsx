import type { SlotsType } from 'vue'
import type { ProButtonProps } from './props'
import type { ProButtonSlots } from './slots'
import { NButton } from 'naive-ui'
import { defineComponent } from 'vue'
import ProTooltip from '../_internal/components/pro-tooltip'
import { useOmitProps, useOverrideProps } from '../composables'
import { useTooltip } from './composables/use-tooltip'
import { proButtonExtendProps, proButtonProps } from './props'

const name = 'ProButton'
export default defineComponent({
  name,
  inheritAttrs: false,
  props: proButtonProps,
  slots: Object as SlotsType<ProButtonSlots>,
  setup(props) {
    const overridedProps = useOverrideProps<ProButtonProps>(
      name,
      props,
    )

    const nButtonProps = useOmitProps(
      overridedProps,
      proButtonExtendProps,
    )

    const {
      showTooltip,
      tooltipProps,
    } = useTooltip(overridedProps)

    return {
      showTooltip,
      tooltipProps,
      nButtonProps,
    }
  },
  render() {
    const {
      $props,
      $attrs,
      $slots,
      nButtonProps,
      tooltipProps,
    } = this

    const buttonDom = (
      <NButton
        {...$attrs}
        {...nButtonProps}
      >
        {{
          ...$slots,
          default: () => $props.content ?? $slots.default?.(),
        }}
      </NButton>
    )
    if (!this.showTooltip) {
      return buttonDom
    }
    return (
      <ProTooltip {...tooltipProps}>
        {{
          trigger: () => buttonDom,
        }}
      </ProTooltip>
    )
  },
})
