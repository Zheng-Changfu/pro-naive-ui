import type { SlotsType } from 'vue'
import { computed } from 'vue'
import { uid } from 'pro-components-hooks'
import { isArray } from 'lodash-es'
import { ProField, ValueTypeEnum } from '../form/components'
import { useMountStyle } from '../_internal/useMountStyle'
import { proFormListProps } from './props'
import type { ProFormListSlots } from './slots'
import { AUTO_CREATE_ID } from './context'
import style from './styles/index.cssr'
import { useProFormListInst } from './inst'
import FieldList from './fields/field-list'

export default defineComponent({
  name: 'ProFormList',
  props: proFormListProps,
  slots: Object as SlotsType<ProFormListSlots>,
  setup(props, { expose }) {
    const [
      instRef,
      methods,
    ] = useProFormListInst()

    const separateProps = computed(() => {
      const {
        min,
        max,
        position,
        actionGuard,
        copyButtonProps,
        removeButtonProps,
        creatorButtonProps,
        creatorInitialValue,
        onlyShowFirstItemLabel,
        ...proFieldProps
      } = props

      return {
        proFieldProps,
        fieldListProps: {
          min,
          max,
          position,
          actionGuard,
          copyButtonProps,
          removeButtonProps,
          creatorButtonProps,
          creatorInitialValue,
          onlyShowFirstItemLabel,
        },
      }
    })

    useMountStyle(
      'ProFormItem',
      'pro-form-item',
      style,
    )

    function autoCreateRowId(val: any) {
      const { postState } = props
      if (!isArray(val)) {
        return postState ? postState(val) : []
      }
      const normalizedVals = val.map((item) => {
        return item[AUTO_CREATE_ID]
          ? item
          : { ...item, [AUTO_CREATE_ID]: uid() }
      })
      return postState
        ? postState(normalizedVals)
        : normalizedVals
    }

    expose(methods)
    return {
      instRef,
      separateProps,
      autoCreateRowId,
    }
  },
  render() {
    return (
      <ProField
        ref="instRef"
        class="n-pro-form-item"
        {...this.separateProps.proFieldProps}
        is-list={true}
        post-state={this.autoCreateRowId}
        field-props={this.separateProps.fieldListProps}
        valueType={ValueTypeEnum.FORM_LIST}
      >
        {{
          ...this.$slots,
          input: (pureProps: any) => {
            return <FieldList {...pureProps} v-slots={this.$slots}></FieldList>
          },
        }}
      </ProField>
    )
  },
})