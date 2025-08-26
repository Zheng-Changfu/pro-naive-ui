import type { PropType } from 'vue'
import type { ProImagesConfig } from './types'
import { isArray, isString } from 'lodash-es'
import { NFlex, NImage, NImageGroup } from 'naive-ui'
import { defineComponent, toValue } from 'vue'
import { useNaiveClsPrefix } from '../../_internal/use-cls-prefix'
import { isEmptyValue } from '../../_utils/is-empty-value'

import { useOverrideProps } from '../../composables'
import { useInjectGlobalConfig } from '../../config-provider'

const name = 'ProImages'
const ProImages = defineComponent({
  name,
  props: {
    /**
     * 传递进来的值
     */
    value: Array as PropType<string[]>,
    /**
     * 传递给 n-image 的选项，里面的 imageGroupProps 是传递给 n-image-group 组件的
     */
    config: Object as PropType<ProImagesConfig>,
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
    const { value, config } = this.overridedProps
    if (isEmptyValue(value)) {
      return toValue(this.mergedEmpty.images)
    }
    const {
      imageGroupProps = {},
      ...nImageProps
    } = config ?? {}

    function renderSingleImage(src: string) {
      return (
        <NImage
          width={42}
          {...nImageProps}
          src={src}
        />
      )
    }
    const srcs = value as string[]
    if (srcs.length === 1) {
      const src = srcs[0]
      return renderSingleImage(src)
    }
    else {
      return (
        <NImageGroup {...imageGroupProps}>
          <NFlex
            size="small"
            inline={true}
            class={[`${this.mergedClsPrefix}-pro-images`]}
          >
            {srcs.map(renderSingleImage)}
          </NFlex>
        </NImageGroup>
      )
    }
  },

})

function transformValueToSrcs(value: any) {
  const list = isArray(value) ? value : [value]
  return list.reduce<string[]>((p, c) => {
    if (isString(c) && c.length > 0) {
      p.push(c)
    }
    return p
  }, [])
}

export function renderProImages(value: any, config?: ProImagesConfig) {
  return (
    <ProImages
      config={config}
      value={transformValueToSrcs(value)}
    />
  )
}
