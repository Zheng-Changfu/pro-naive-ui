import type { SlotsType } from 'vue'
import type { ProSwitchProps } from './props'
import type { ProSwitchSlots } from './slots'
import { defineComponent } from 'vue'
import { useOverrideProps } from '../../../composables'
import { ProField } from '../field'
import { useMergePlaceholder } from '../field/composables/use-merge-placeholder'
import Switch from './components/switch'
import { proSwitchProps } from './props'

const name = 'ProSwitch'
export default defineComponent({
  name,
  props: proSwitchProps,
  slots: Object as SlotsType<ProSwitchSlots>,
  setup(props) {
    const placeholder = useMergePlaceholder(
      name,
      props,
    )

    const overridedProps = useOverrideProps<ProSwitchProps>(
      name,
      props,
    )

    return {
      placeholder,
      overridedProps,
    }
  },
  render() {
    return (
      <ProField
        {...this.overridedProps}
        placeholder={this.placeholder}
      >
        {{
          ...this.$slots,
          input: (pureProps: any) => {
            return <Switch {...pureProps} v-slots={this.$slots}></Switch>
          },
        }}
      </ProField>
    )
  },
})
