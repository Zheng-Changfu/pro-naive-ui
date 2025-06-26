import type { SlotsType } from 'vue'
import type { ProRadioGroupProps } from './props'
import type { ProRadioGroupSlots } from './slots'
import { defineComponent } from 'vue'
import { useOverrideProps } from '../../../composables'
import { ProField } from '../field'
import { useMergePlaceholder } from '../field/composables/use-merge-placeholder'
import RadioGroup from './components/radio-group'
import { proRadioGroupProps } from './props'

const name = 'ProRadioGroup'
export default defineComponent({
  name,
  props: proRadioGroupProps,
  slots: Object as SlotsType<ProRadioGroupSlots>,
  setup(props) {
    const placeholder = useMergePlaceholder(
      name,
      props,
    )

    const overridedProps = useOverrideProps<ProRadioGroupProps>(
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
          input: ({ inputProps }: any) => {
            return <RadioGroup {...inputProps} v-slots={this.$slots}></RadioGroup>
          },
        }}
      </ProField>
    )
  },
})
