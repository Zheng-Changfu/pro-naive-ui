import type { Paths } from 'type-fest'
import type { PropType } from 'vue'
import type { CopyableTextConfig } from './types'
import { CheckOutlined, CopyOutlined } from '@vicons/antd'
import { useClipboard } from '@vueuse/core'
import { get } from 'lodash-es'
import { NButton, NIcon, NTooltip } from 'naive-ui'
import { defineComponent, toRef } from 'vue'
import { useNaiveClsPrefix } from '../../_internal/useClsPrefix'
import { useMountStyle } from '../../_internal/useMountStyle'
import { useLocale } from '../../locales'
import { emptyText, useMergePlainComponentConfig } from '../composables'
import style from './styles/index.cssr'

const name = 'ProCopyableText'
export const ProCopyableText = defineComponent({
  name,
  props: {
    /**
     * 复制的文本
     */
    value: undefined as unknown as PropType<any>,
    /**
     * 预留的配置，暂时没什么用
     */
    config: Object as PropType<CopyableTextConfig>,
  },
  setup(props) {
    const mergedClsPrefix = useNaiveClsPrefix()

    const {
      getMessage,
    } = useLocale(name)

    const {
      mergedValue,
    } = useMergePlainComponentConfig(
      'copyableText',
      toRef(props, 'value'),
      toRef(props, 'config'),
    )

    const {
      copy,
      copied,
    } = useClipboard({ ...props.config, source: mergedValue })

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
      copied,
      copyText,
      getMessage,
      mergedValue,
      mergedClsPrefix,
    }
  },
  render() {
    if (this.mergedValue === emptyText) {
      return emptyText
    }
    return (
      <div class={[`${this.mergedClsPrefix}-pro-copyable-text`]}>
        {this.mergedValue}
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
              return this.getMessage(text)
            },
          }}
        </NTooltip>
      </div>
    )
  },

})

export function renderCopyableText<T extends Record<string, any>>(data: T, path: Paths<T> | ({} & string), config?: CopyableTextConfig) {
  const value = get(data, path)
  return (
    <ProCopyableText
      value={value}
      config={config}
    />
  )
}
