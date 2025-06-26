import type { SlotsType } from 'vue'
import type { ProColorPickerProps } from './props'
import type { ProColorPickerSlots } from './slots'
import { defineComponent } from 'vue'
import { useOverrideProps } from '../../../composables'
import { ProField } from '../field'
import { useMergePlaceholder } from '../field/composables/use-merge-placeholder'
import ColorPicker from './components/color-picker'
import { proColorPickerProps } from './props'

const name = 'ProColorPicker'
export default defineComponent({
  name,
  props: proColorPickerProps,
  slots: Object as SlotsType<ProColorPickerSlots>,
  setup(props) {
    const placeholder = useMergePlaceholder(
      name,
      props,
    )

    const overridedProps = useOverrideProps<ProColorPickerProps>(
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
            return <ColorPicker {...inputProps} v-slots={this.$slots}></ColorPicker>
          },
        }}
      </ProField>
    )
  },
})
