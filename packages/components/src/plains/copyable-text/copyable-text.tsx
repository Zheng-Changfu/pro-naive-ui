import type { PropType } from 'vue'
import type { ProCopyableTextConfig } from './types'
import { CheckOutlined, CopyOutlined } from '@vicons/antd'
import { useClipboard } from '@vueuse/core'
import { isString, toString } from 'lodash-es'
import { NButton, NIcon, NTooltip } from 'naive-ui'
import { computed, defineComponent, toValue } from 'vue'
import { useNaiveClsPrefix } from '../../_internal/use-cls-prefix'
import { useMountStyle } from '../../_internal/use-mount-style'
import { isEmptyValue } from '../../_utils/is-empty-value'
import { useOverrideProps } from '../../composables'
import { useInjectGlobalConfig } from '../../config-provider'
import { useLocale } from '../../locales'
import style from './styles/index.cssr'

const name = 'ProCopyableText'
const ProCopyableText = defineComponent({
  name,
  props: {
    /**
     * 复制的文本
     */
    value: String,
    /**
     * 传递给 useClipboard 的选项
     */
    config: Object as PropType<ProCopyableTextConfig>,
  },
  setup(props) {
    const mergedClsPrefix = useNaiveClsPrefix()

    const overridedProps = useOverrideProps(
      name,
      props,
    )

    const {
      t,
    } = useLocale(name)

    const {
      mergedEmpty,
    } = useInjectGlobalConfig()

    const {
      copy,
      copied,
    } = useClipboard({ source: computed(() => props.value!), ...props.config })

    useMountStyle(
      name,
      'pro-copyable-text',
      style,
    )

    function copyText(e: MouseEvent) {
      e.stopPropagation()
      copy()
    }

    return {
      t,
      copied,
      copyText,
      mergedEmpty,
      overridedProps,
      mergedClsPrefix,
    }
  },
  render() {
    const { value } = this.overridedProps
    if (isEmptyValue(value)) {
      return toValue(this.mergedEmpty.copyableText)
    }
    return (
      <div class={[`${this.mergedClsPrefix}-pro-copyable-text`]}>
        {value}
        <NTooltip trigger="hover">
          {{
            trigger: () => (
              <NButton
                text={true}
                type="primary"
                class={[`${this.mergedClsPrefix}-pro-copyable-text__button`]}
                onClick={this.copyText}
              >
                <NIcon>
                  {this.copied ? <CheckOutlined /> : <CopyOutlined />}
                </NIcon>
              </NButton>
            ),
            default: () => {
              const text = this.copied ? 'copied' : 'copy'
              return this.t(text)
            },
          }}
        </NTooltip>
      </div>
    )
  },

})

function transformValueToString(value: any) {
  return isString(value) ? value : toString(value)
}

export function renderProCopyableText(value: any, config?: ProCopyableTextConfig) {
  return (
    <ProCopyableText
      config={config}
      value={transformValueToString(value)}
    />
  )
}
