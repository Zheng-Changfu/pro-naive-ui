import { collapseTransitionProps } from 'naive-ui'
import { defineComponent, vShow, withDirectives } from 'vue'
import { useNaiveClsPrefix } from '../../use-cls-prefix'
import { useMountStyle } from '../../use-mount-style'
import ProFadeInExpandTransition from '../fade-in-expand-transition'
import style from './styles/index.cssr'

/**
 * 没有用 n-collapse-transition，是因为内部用的 v-if
 * 这里专门给卡片使用，卡片的使用场景很多，这里默认为 v-show，后期看 issues 决定是否添加 `display-directive` 属性
 */
export default defineComponent({
  name: 'ProCollapseTransition',
  inheritAttrs: false,
  props: collapseTransitionProps,
  setup() {
    const mergedClsPrefix = useNaiveClsPrefix()

    useMountStyle(
      'ProCollapseTransition',
      'pro-collapse-transition',
      style,
    )

    return {
      mergedClsPrefix,
    }
  },
  render() {
    return (
      <ProFadeInExpandTransition appear={this.$props.appear}>
        {
          withDirectives(
            <div
              {...this.$attrs}
              class={[`${this.mergedClsPrefix}-pro-collapse-transition`]}
            >
              {this.$slots.default?.()}
            </div>,
            [[vShow, this.$props.show]],
          )
        }
      </ProFadeInExpandTransition>
    )
  },
})
