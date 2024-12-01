import type { SlotsType } from 'vue'
import type { ProCardSlots } from './slots'
import { DownOutlined, InfoCircleOutlined, UpOutlined } from '@vicons/antd'
import { isFunction } from 'lodash-es'
import { collapseTransitionProps, NCard, NFlex, NIcon } from 'naive-ui'
import { computed, defineComponent } from 'vue'
import ProCollapseTransition from '../_internal/components/collapse-transition/index.vue'
import ProTooltip from '../_internal/components/pro-tooltip'
import { useNaiveClsPrefix } from '../_internal/useClsPrefix'
import { useMountStyle } from '../_internal/useMountStyle'
import { mergeClass } from '../_utils/mergeClass'
import { resolveSlot, resolveWrappedSlotWithProps } from '../_utils/resolveSlot'
import { useOmitProps, useOverrideProps } from '../composables'
import { useLocale } from '../locales'
import { useCollapseTransition } from './composables/useCollapseTransition'
import { proCardExtendProps, proCardProps } from './props'
import style from './styles/index.cssr'

const name = 'ProCard'
export default defineComponent({
  name,
  props: proCardProps,
  slots: Object as SlotsType<ProCardSlots>,
  setup(props, { slots }) {
    const {
      getMessage,
    } = useLocale('ProCard')

    const overridedProps = useOverrideProps(
      name,
      props,
    )

    const mergedClsPrefix = useNaiveClsPrefix()

    const nCardProps = useOmitProps(overridedProps, {
      ...proCardExtendProps,
      ...collapseTransitionProps,
      title: props.title, // 忽略掉 title，自定义 title
    })

    const {
      show,
      nCollapseTransitionProps,
    } = useCollapseTransition(overridedProps)

    const showHeader = computed(() => {
      const { title, tooltip } = overridedProps.value
      return !!title || !!slots.header || !!tooltip
    })

    const collapseText = computed(() => {
      return getMessage('collapse')(!show.value)
    })

    const resolvedTitle = computed(() => {
      const { title } = overridedProps.value
      return isFunction(title) ? title() : title
    })

    const mergedContentClass = computed(() => {
      return mergeClass(
        overridedProps.value.contentClass,
        !show.value && `${mergedClsPrefix.value}-card__content--hidden`,
      )
    })

    function triggerExpand(area: 'main' | 'arrow') {
      const { triggerAreas = [] } = overridedProps.value
      if (triggerAreas.includes(area)) {
        show.value = !show.value
      }
    }

    useMountStyle(
      name,
      'pro-card',
      style,
    )

    return {
      show,
      nCardProps,
      showHeader,
      collapseText,
      resolvedTitle,
      triggerExpand,
      mergedClsPrefix,
      mergedContentClass,
      nCollapseTransitionProps,
      tooltip: computed(() => overridedProps.value.tooltip),
      showCollapse: computed(() => overridedProps.value.showCollapse),
      triggerAreas: computed(() => overridedProps.value.triggerAreas ?? []),
    }
  },
  render() {
    const { mergedClsPrefix } = this

    return (
      <NCard
        {...this.nCardProps}
        class={[
          `${mergedClsPrefix}-pro-card`,
        ]}
        contentClass={this.mergedContentClass}
      >
        {{
          ...this.$slots,
          'default': () => {
            return (
              <ProCollapseTransition {...this.nCollapseTransitionProps}>
                {this.$slots.default?.()}
              </ProCollapseTransition>
            )
          },
          'header': () => {
            if (!this.showHeader) {
              return null
            }
            return (
              <div
                class={[{
                  [`${mergedClsPrefix}-card-header__main--trigger`]: this.triggerAreas.includes('main'),
                }]}
                onClick={() => this.triggerExpand('main')}
              >
                {
                  resolveSlot(this.$slots.header, () => [this.resolvedTitle])
                }
                <ProTooltip
                  trigger="hover"
                  tooltip={this.tooltip}
                >
                  {{
                    trigger: () => [
                      <NIcon
                        size={18}
                        class={`${mergedClsPrefix}-icon--tooltip`}
                      >
                        <InfoCircleOutlined />
                      </NIcon>,
                    ],
                  }}
                </ProTooltip>
              </div>
            )
          },
          'header-extra': () => {
            return [
              this.$slots['header-extra']?.(),
              this.showCollapse && resolveWrappedSlotWithProps(this.$slots.collapse, {
                expanded: this.show,
              }, (children) => {
                children = children ?? [
                  <div>{this.collapseText}</div>,
                  <NIcon>{this.show ? <UpOutlined /> : <DownOutlined />}</NIcon>,
                ] as any

                return (
                  <NFlex
                    size={[4, 0]}
                    align="center"
                    class={[{
                      [`${mergedClsPrefix}-card-header__extra--trigger`]: this.triggerAreas.includes('arrow'),
                    }]}
                    // @ts-expect-error
                    onClick={() => this.triggerExpand('arrow')}
                  >
                    {children}
                  </NFlex>
                )
              }),
            ]
          },
        }}
      </NCard>
    )
  },
})
