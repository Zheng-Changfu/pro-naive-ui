import type { SlotsType } from 'vue'
import type { ProProgressSlots } from './slots'
import { isArray, isString } from 'lodash-es'
import { useOverrideProps } from '../../../composables'
import { ProField, ValueTypeEnum } from '../field'
import ProFieldProgress from './fields/field-progress'
import { proProgressProps } from './props'

const name = 'ProProgress'
export default defineComponent({
  name,
  props: proProgressProps,
  slots: Object as SlotsType<ProProgressSlots>,
  setup(props) {
    const overridedProps = useOverrideProps(
      name,
      props,
    )

    const tryConvertStringToNumber = (val: any) => {
      if (!val)
        return val

      const num = Number(val)
      return Number.isNaN(num) ? val : num
    }

    function postValue(val: any) {
      if (overridedProps.value.postValue) {
        return overridedProps.value.postValue(val)
      }
      if (isString(val)) {
        return tryConvertStringToNumber(val)
      }
      if (isArray(val) && val.length) {
        return val.map((t) => {
          return tryConvertStringToNumber(t)
        })
      }

      return val
    }

    const onInputValue = (value: Ref<any>, inputValue: string) => {
      if (isArray(value.value)) {
        value.value = inputValue.split(',')
      }
      value.value = inputValue
    }

    return {
      postValue,
      onInputValue,
      overridedProps,
    }
  },
  render() {
    return (
      <ProField
        {...this.overridedProps}
        postValue={this.postValue}
        onInputValue={this.onInputValue}
        valueType={ValueTypeEnum.PROGRESS}
      >
        {{
          ...this.$slots,
          input: (pureProps: any) => [
            <ProFieldProgress
              {...pureProps}
              v-slots={this.$slots}
            />,
          ],
        }}
      </ProField>
    )
  },
})
