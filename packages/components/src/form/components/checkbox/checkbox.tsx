import type { SlotsType } from 'vue'
import type { ProCheckboxProps } from './props'
import type { ProCheckboxSlots } from './slots'
import { defineComponent } from 'vue'
import { useOverrideProps } from '../../../composables'
import { ProField } from '../field'
import { useMergePlaceholder } from '../field/composables/use-merge-placeholder'
import Checkbox from './components/checkbox'
import { provideCheckboxInstStore } from './inst'
import { proCheckboxProps } from './props'

const name = 'ProCheckbox'
export default defineComponent({
  name,
  props: proCheckboxProps,
  slots: Object as SlotsType<ProCheckboxSlots>,
  setup(props, { expose }) {
    const {
      exposed,
    } = provideCheckboxInstStore()

    const placeholder = useMergePlaceholder(
      name,
      props,
    )

    const overridedProps = useOverrideProps<ProCheckboxProps>(
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
        valueModelName="checked"
        placeholder={this.placeholder}
      >
        {{
          ...this.$slots,
          input: (pureProps: any) => {
            return <Checkbox {...pureProps} v-slots={this.$slots}></Checkbox>
          },
        }}
      </ProField>
    )
  },
})
