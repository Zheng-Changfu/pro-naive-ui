import type { SlotsType } from 'vue'
import type { ProInputSlots } from './slots'
import { ProField, ValueTypeEnum } from '../field'
import ProFieldInput from './fields/field-input'
import { useProInputInst } from './inst'
import { proInputProps } from './props'

export default defineComponent({
  name: 'ProTextarea',
  props: proInputProps,
  slots: Object as SlotsType<ProInputSlots>,
  setup(_, { expose }) {
    const [
      instRef,
      methods,
    ] = useProInputInst()

    expose(methods)
    return {
      instRef,
    }
  },
  render() {
    return (
      <ProField
        {...this.$props}
        defaultValue={null}
        fieldProps={{
          ...this.$props.fieldProps,
          type: 'textarea',
        }}
        valueType={ValueTypeEnum.TEXTAREA}
      >
        {{
          ...this.$slots,
          input: (pureProps: any) => {
            return <ProFieldInput ref="instRef" {...pureProps} v-slots={this.$slots} />
          },
        }}
      </ProField>
    )
  },
})
