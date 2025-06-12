import type { ExtractPublicPropTypes, PropType, SlotsType, VNodeChild } from 'vue'
import { isString } from 'lodash-es'
import { NTooltip, tooltipProps } from 'naive-ui'
import { computed, defineComponent } from 'vue'
import { resolveWrappedSlot } from '../../_utils/resolve-slot'

export const proTooltipProps = {
  ...tooltipProps,
  tooltip: [String, Array] as PropType<string | string[]>,
  /**
   * 当 tooltip 为空时是否调用 trigger 插槽显示
   */
  emptyTooltipShowTrigger: Boolean,
} as const

export type ProTooltipProps = ExtractPublicPropTypes<typeof proTooltipProps>

export default defineComponent({
  name: 'ProTooltip',
  props: proTooltipProps,
  slots: Object as SlotsType<{
    trigger: any
    footer: any
    header: any
    default: any
  }>,
  setup(props) {
    const normalizeTootlip = computed<string[]>(() => {
      const { tooltip } = props
      if (!tooltip) {
        return []
      }
      return isString(tooltip) ? [tooltip] : tooltip
    })

    return {
      normalizeTootlip,
    }
  },
  render() {
    const {
      tooltip,
      emptyTooltipShowTrigger,
      ...nTooltipProps
    } = this.$props

    const tooltipsVnode = resolveWrappedSlot(this.$slots.default, (children) => {
      if (!children && this.normalizeTootlip.length <= 0) {
        return null
      }
      return children ?? this.normalizeTootlip.map(tip => <div key={tip}>{tip}</div>)
    }) as VNodeChild | null

    if (!tooltipsVnode) {
      return emptyTooltipShowTrigger
        ? this.$slots.trigger?.()
        : null
    }

    return (
      <NTooltip {...nTooltipProps}>
        {{
          ...this.$slots,
          default: () => tooltipsVnode,
        }}
      </NTooltip>
    )
  },
})
