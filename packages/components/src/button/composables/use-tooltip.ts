import type { ComputedRef } from 'vue'
import type { ProTooltipProps } from '../../_internal/components/pro-tooltip'
import type { ProButtonProps } from '../props'
import { computed } from 'vue'

export function useTooltip(props: ComputedRef<ProButtonProps>) {
  const disabled = computed(() => {
    const { tooltip, disabled, disabledTooltip } = props.value
    return disabled ? !disabledTooltip : !tooltip
  })

  const tooltipTexts = computed(() => {
    const { tooltip, disabled, disabledTooltip } = props.value
    if (disabled && disabledTooltip) {
      return disabledTooltip
    }
    if (tooltip) {
      return tooltip
    }
    return []
  })

  const tooltipProps = computed<ProTooltipProps>(() => {
    return {
      trigger: 'hover',
      disabled: disabled.value,
      tooltip: tooltipTexts.value,
      emptyTooltipShowTrigger: true,
    }
  })

  return {
    tooltipProps,
    tooltipTexts,
  }
}
