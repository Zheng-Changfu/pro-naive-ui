import type { SlotsType } from 'vue'
import type { ProInputProps } from './props'
import type { ProInputSlots } from './slots'
import { defineComponent } from 'vue'
import { useOverrideProps } from '../../../composables'
import { ProField } from '../field'
import { useMergePlaceholder } from '../field/composables/use-merge-placeholder'
import Password from './components/password'
import { provideTextInstStore } from './inst'
import { proInputProps } from './props'

const name = 'ProPassword'
export default defineComponent({
  name,
  props: proInputProps,
  slots: Object as SlotsType<ProInputSlots>,
  setup(props, { expose }) {
    const {
      exposed,
    } = provideTextInstStore()

    const placeholder = useMergePlaceholder(
      name,
      props,
    )

    const overridedProps = useOverrideProps<ProInputProps>(
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
          ...this.overridedProps.fieldProps,
          type: 'password',
        }}
        placeholder={this.placeholder}
      >
        {{
          ...this.$slots,
          input: ({ inputProps }: any) => {
            return <Password {...inputProps} v-slots={this.$slots}></Password>
          },
        }}
      </ProField>
    )
  },
})
