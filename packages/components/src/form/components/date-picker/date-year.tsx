import type { SlotsType } from 'vue'
import type { ProDatePickerProps } from './props'
import type { ProDatePickerSlots } from './slots'
import { defineComponent } from 'vue'
import { useOverrideProps } from '../../../composables'
import { ProField } from '../field'
import { useMergePlaceholder } from '../field/composables/use-merge-placeholder'
import DatePicker from './components/date-picker'
import { provideDatePickerInstStore } from './inst'
import { proDatePickerProps } from './props'

const name = 'ProDateYear'
export default defineComponent({
  name,
  props: proDatePickerProps,
  slots: Object as SlotsType<ProDatePickerSlots>,
  setup(props, { expose }) {
    const {
      exposed,
    } = provideDatePickerInstStore()

    const placeholder = useMergePlaceholder(
      name,
      props,
    )

    const overridedProps = useOverrideProps<ProDatePickerProps>(
      name,
      props,
    )

    expose(exposed)
    return {
      placeholder,
      overridedProps,
    }
  },
  render() {
    return (
      <ProField
        {...this.overridedProps}
        fieldProps={{
          ...(this.overridedProps.fieldProps ?? {}),
          type: 'year',
        }}
        placeholder={this.placeholder}
      >
        {{
          ...this.$slots,
          input: (pureProps: any) => {
            return <DatePicker {...pureProps} v-slots={this.$slots}></DatePicker>
          },
        }}
      </ProField>
    )
  },
})
