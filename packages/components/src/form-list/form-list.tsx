import type { SlotsType } from 'vue'
import type { ProFormListProps } from './props'
import type { ProFormListSlots } from './slots'
import { computed, defineComponent } from 'vue'
import { useNaiveClsPrefix } from '../_internal/use-cls-prefix'
import { useMountStyle } from '../_internal/use-mount-style'
import { keep } from '../_utils/keep'
import { useOverrideProps } from '../composables'
import { pickProListFieldSharedProps, ProField } from '../form/components'
import FormList from './components/form-list'
import { provideFormListInstStore } from './inst'
import { internalFormListPropKeys, proFormListProps } from './props'
import style from './styles/index.cssr'

const name = 'ProFormList'
export default defineComponent({
  name,
  props: proFormListProps,
  slots: Object as SlotsType<ProFormListSlots>,
  setup(props, { expose }) {
    const {
      exposed,
    } = provideFormListInstStore()

    const mergedClsPrefix = useNaiveClsPrefix()

    const overridedProps = useOverrideProps<ProFormListProps>(
      name,
      props,
    )

    const proFieldProps = computed(() => {
      return pickProListFieldSharedProps(overridedProps.value)
    })

    const internalFormListProps = computed(() => {
      return keep(
        overridedProps.value,
        internalFormListPropKeys,
      )
    })

    useMountStyle(
      name,
      'pro-form-list',
      style,
      mergedClsPrefix,
    )

    expose(exposed)
    return {
      proFieldProps,
      mergedClsPrefix,
      internalFormListProps,
    }
  },
  render() {
    const { mergedClsPrefix } = this

    return (
      <ProField
        {...this.proFieldProps}
        isList={true}
        valueModelName=""
        fieldProps={this.internalFormListProps}
        class={[`${mergedClsPrefix}-pro-form-list-wrapper`]}
      >
        {{
          ...this.$slots,
          input: (pureProps: any) => {
            return <FormList {...pureProps} v-slots={this.$slots}></FormList>
          },
        }}
      </ProField>
    )
  },
})
