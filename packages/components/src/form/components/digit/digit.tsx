import type { SlotsType } from 'vue'
import type { ProDigitProps } from './props'
import type { ProDigitSlots } from './slots'
import { defineComponent } from 'vue'
import { useOverrideProps } from '../../../composables'
import { ProField } from '../field'
import { useMergePlaceholder } from '../field/composables/use-merge-placeholder'
import Digit from './components/digit'
import { provideDigitInstStore } from './inst'
import { proDigitProps } from './props'

const name = 'ProDigit'
export default defineComponent({
  name,
  props: proDigitProps,
  slots: Object as SlotsType<ProDigitSlots>,
  setup(props, { expose }) {
    const {
      exposed,
    } = provideDigitInstStore()

    const placeholder = useMergePlaceholder(
      name,
      props,
    )

    const overridedProps = useOverrideProps<ProDigitProps>(
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
        placeholder={this.placeholder}
      >
        {{
          ...this.$slots,
          input: ({ inputProps }: any) => {
            return <Digit {...inputProps} v-slots={this.$slots}></Digit>
          },
        }}
      </ProField>
    )
  },
})
