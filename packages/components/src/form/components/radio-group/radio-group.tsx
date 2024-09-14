import type { SlotsType } from 'vue'
import type { ProRadioGroupSlots } from './slots'
import { ProField, ValueTypeEnum } from '../field'
import ProFieldRadioGroup from './fields/field-radio-group'
import { proRadioGroupProps } from './props'

export default defineComponent({
  name: 'ProRadioGroup',
  props: proRadioGroupProps,
  slots: Object as SlotsType<ProRadioGroupSlots>,
  setup() {},
  render() {
    return (
      <ProField
        {...this.$props}
        defaultValue={null}
        valueType={ValueTypeEnum.RADIO_GROUP}
      >
        {{
          ...this.$slots,
          input: (pureProps: any) => {
            return <ProFieldRadioGroup {...pureProps} v-slots={this.$slots} />
          },
        }}
      </ProField>
    )
  },
})
