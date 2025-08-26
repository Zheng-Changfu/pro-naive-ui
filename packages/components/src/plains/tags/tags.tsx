import type { PropType } from 'vue'
import type { ProTagsConfig } from './types'
import { isArray, isPlainObject, isString } from 'lodash-es'
import { NFlex, NTag } from 'naive-ui'
import { defineComponent, toValue } from 'vue'
import { useNaiveClsPrefix } from '../../_internal/use-cls-prefix'
import { isEmptyValue } from '../../_utils/is-empty-value'
import { useOverrideProps } from '../../composables'
import { useInjectGlobalConfig } from '../../config-provider'

const name = 'ProTags'
const ProTags = defineComponent({
  name,
  props: {
    /**
     * 传递进来的值
     */
    value: Array as PropType<ProTagsConfig[]>,
    /**
     * 占位，现在没什么用
     */
    config: Object,
  },
  setup(props) {
    const mergedClsPrefix = useNaiveClsPrefix()

    const overridedProps = useOverrideProps(
      name,
      props,
    )

    const {
      mergedEmpty,
    } = useInjectGlobalConfig()

    return {
      mergedEmpty,
      overridedProps,
      mergedClsPrefix,
    }
  },
  render() {
    const { value: tags } = this.overridedProps
    if (isEmptyValue(tags)) {
      return toValue(this.mergedEmpty.tags)
    }
    return (
      <NFlex
        class={[`${this.mergedClsPrefix}-pro-tags`]}
        inline={true}
      >
        {tags!.map((option, index) => {
          const { content, ...nTagProps } = option
          return (
            <NTag
              key={index + content!}
              {...nTagProps}
            >
              {content}
            </NTag>
          )
        })}
      </NFlex>
    )
  },

})

function transformValueToTagOptions(value: any) {
  const list = isArray(value) ? value : [value]
  return list.reduce<ProTagsConfig[]>((p, c) => {
    if (isString(c) && c.length > 0) {
      p.push({
        content: c,
        type: 'primary',
        bordered: false,
      })
    }
    if (isPlainObject(c) && isString(c.content) && c.content.length > 0) {
      p.push({
        type: 'primary',
        bordered: false,
        ...c,
      })
    }
    return p
  }, [])
}

export function renderProTags(
  value: string | ProTagsConfig | Array<string | ProTagsConfig>,
  config?: Record<string, any>,
) {
  return (
    <ProTags
      config={config}
      value={transformValueToTagOptions(value)}
    />
  )
}
