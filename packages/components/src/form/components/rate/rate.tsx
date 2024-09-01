import type { SlotsType } from 'vue'
import { ProField, ValueTypeEnum } from '../field'
import { proRateProps } from './props'
import type { ProRateSlots } from './slots'
import ProFieldRate from './fields/field-rate'

export default defineComponent({
  name: 'ProRate',
  props: proRateProps,
  slots: Object as SlotsType<ProRateSlots>,
  setup() {},
  render() {
    return (
      <ProField
        {...this.$props}
        defaultValue={null}
        valueType={ValueTypeEnum.RATE}
      >
        {{
          ...this.$slots,
          input: (pureProps: any) => {
            return <ProFieldRate {...pureProps} v-slots={this.$slots} />
          },
        }}
      </ProField>
    )
  },
})