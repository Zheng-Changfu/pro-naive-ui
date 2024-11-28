import type { SlotsType } from 'vue'
import type { ProSwitchSlots } from './slots'
import { defineComponent } from 'vue'
import { useOverrideProps, usePostValue } from '../../../composables'
import { InternalValueTypeEnum, ProField } from '../field'
import Switch from './components/switch'
import { proSwitchProps } from './props'

const name = 'ProSwitch'
export default defineComponent({
  name,
  props: proSwitchProps,
  slots: Object as SlotsType<ProSwitchSlots>,
  setup(props) {
    const overridedProps = useOverrideProps(
      name,
      props,
    )

    const postValue = usePostValue(overridedProps, {
      nilToFalsy: true,
    })

    return {
      postValue,
      overridedProps,
    }
  },
  render() {
    return (
      <ProField
        {...this.overridedProps}
        postValue={this.postValue}
        valueType={InternalValueTypeEnum.SWITCH}
      >
        {{
          ...this.$slots,
          input: (pureProps: any) => {
            return (
              <Switch
                {...pureProps}
                v-slots={this.$slots}
              />
            )
          },
        }}
      </ProField>
    )
  },
})
