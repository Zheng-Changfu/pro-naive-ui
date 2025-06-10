import type { SlotsType } from 'vue'
import type { ProCheckboxGroupProps } from './props'
import type { ProCheckboxGroupSlots } from './slots'
import { defineComponent } from 'vue'
import { useOverrideProps } from '../../../composables'
import { ProField } from '../field'
import { useMergePlaceholder } from '../field/composables/use-merge-placeholder'
import CheckboxGroup from './components/checkbox-group'
import { proCheckboxGroupProps } from './props'

const name = 'ProCheckboxGroup'
export default defineComponent({
  name,
  props: proCheckboxGroupProps,
  slots: Object as SlotsType<ProCheckboxGroupSlots>,
  setup(props) {
    const placeholder = useMergePlaceholder(
      name,
      props,
    )

    const overridedProps = useOverrideProps<ProCheckboxGroupProps>(
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
            return <CheckboxGroup {...pureProps} v-slots={this.$slots}></CheckboxGroup>
          },
        }}
      </ProField>
    )
  },
})
