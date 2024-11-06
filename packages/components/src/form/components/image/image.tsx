import type { SlotsType } from 'vue'
import type { ProImageSlots } from './slots'
import { isArray, isString } from 'lodash-es'
import { useOverrideProps } from '../../../composables'
import { ProField, ValueTypeEnum } from '../field'
import ProFieldImage from './fields/field-image'
import { proImageProps } from './props'

const name = 'ProImage'
export default defineComponent({
  name,
  props: proImageProps,
  slots: Object as SlotsType<ProImageSlots>,
  setup(props) {
    const overridedProps = useOverrideProps(
      name,
      props,
    )

    function postValue(val: any) {
      if (overridedProps.value.postValue) {
        return overridedProps.value.postValue(val)
      }

      if (isArray(val)) {
        return val.join('\n')
      }

      return val
    }

    function transform(val: any, path: string) {
      if (overridedProps.value.transform) {
        return overridedProps.value.transform(val, path)
      }

      if (isString(val) && val.includes('\n')) {
        return val.split('\n').filter(Boolean)
      }

      return val
    }

    return {
      postValue,
      transform,
      overridedProps,
    }
  },
  render() {
    return (
      <ProField
        {...this.overridedProps}
        defaultValue={null}
        valueType={ValueTypeEnum.IMAGE}
        postValue={this.postValue}
        transform={this.transform}
      >
        {{
          ...this.$slots,
          input: (pureProps: any) => [
            <ProFieldImage
              {...pureProps}
              v-slots={this.$slots}
            />,
          ],
        }}
      </ProField>
    )
  },
})
