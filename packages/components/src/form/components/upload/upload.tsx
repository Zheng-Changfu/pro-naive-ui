import type { SlotsType } from 'vue'
import type { ProUploadProps } from './props'
import type { ProUploadSlots } from './slots'
import { defineComponent } from 'vue'
import { useOverrideProps } from '../../../composables'
import { ProField } from '../field'
import { useMergePlaceholder } from '../field/composables/use-merge-placeholder'
import Upload from './components/upload'
import { provideUploadInstStore } from './inst'
import { proUploadProps } from './props'

const name = 'ProUpload'
export default defineComponent({
  name,
  props: proUploadProps,
  slots: Object as SlotsType<ProUploadSlots>,
  setup(props, { expose }) {
    const {
      exposed,
    } = provideUploadInstStore()

    const placeholder = useMergePlaceholder(
      name,
      props,
    )

    const overridedProps = useOverrideProps<ProUploadProps>(
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
        valueModelName="fileList"
        placeholder={this.placeholder}
      >
        {{
          ...this.$slots,
          input: (pureProps: any) => {
            return <Upload {...pureProps} v-slots={this.$slots}></Upload>
          },
        }}
      </ProField>
    )
  },
})
