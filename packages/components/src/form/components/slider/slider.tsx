import type { SlotsType } from 'vue'
import type { ProSliderProps } from './props'
import type { ProSliderSlots } from './slots'
import { defineComponent } from 'vue'
import { useOverrideProps } from '../../../composables'
import { ProField } from '../field'
import { useMergePlaceholder } from '../field/composables/use-merge-placeholder'
import Slider from './components/slider'
import { proSliderProps } from './props'

const name = 'ProSlider'
export default defineComponent({
  name,
  props: proSliderProps,
  slots: Object as SlotsType<ProSliderSlots>,
  setup(props) {
    const placeholder = useMergePlaceholder(
      name,
      props,
    )

    const overridedProps = useOverrideProps<ProSliderProps>(
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
            return <Slider {...pureProps} v-slots={this.$slots}></Slider>
          },
        }}
      </ProField>
    )
  },
})
