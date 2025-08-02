import type { PropType } from 'vue'
import type { ProFieldSharedProps } from '../../form'
import type { ProSearchFormColumn } from '../types'
import { isFunction } from 'lodash-es'
import { NGi } from 'naive-ui'
import { computed, defineComponent } from 'vue'
import { resolveComponentByField } from '../../_utils/resolve-component-by-field'
import { pickProFieldSharedProps } from '../../form'

export default defineComponent({
  name: 'GridFieldItem',
  /**
   * 支持 n-grid
   */
  __GRID_ITEM__: true,
  props: {
    column: {
      type: Object as PropType<ProSearchFormColumn>,
      required: true,
    },
    span: [String, Number] as PropType<string | number>,
    offset: [String, Number] as PropType<string | number>,
  },
  setup(props) {
    const proFieldProps = computed<ProFieldSharedProps>(() => {
      const { column } = props
      const proFieldSharedProps = pickProFieldSharedProps(column)
      const resolvedProFieldSharedProps = isFunction(column.proFieldProps) ? column.proFieldProps() : (column.proFieldProps ?? {})
      return {
        ...proFieldSharedProps,
        ...resolvedProFieldSharedProps,
      }
    })

    // 这里类型复杂会导致构建类型声明文件失败，先用 Record<string, any> 解决
    const fieldProps = computed<Record<string, any>>(() => {
      const { fieldProps } = props.column
      return isFunction(fieldProps) ? fieldProps() : (fieldProps ?? {})
    })

    const columnVisible = computed(() => {
      /**
       * 确保表单被隐藏后 NGi 也被隐藏
       */
      const {
        hidden,
        visible,
      } = proFieldProps.value

      if (visible === undefined && hidden === undefined) {
        return true
      }
      return visible !== undefined
        ? visible
        : !hidden
    })

    return {
      fieldProps,
      columnVisible,
      proFieldProps,
    }
  },
  render() {
    if (!this.columnVisible) {
      return null
    }

    const {
      span,
      offset,
      column,
    } = this.$props

    return (
      <NGi span={span} offset={offset}>
        {{
          default: () => {
            return column.render
              ? column.render()
              : resolveComponentByField(column.field ?? 'input', {
                  fieldProps: this.fieldProps,
                  fieldSlots: column.fieldSlots,
                  proFieldProps: {
                    ...this.proFieldProps,
                    path: column.path,
                  },
                })
          },
        }}
      </NGi>
    )
  },
})
