import type { RowKey } from 'naive-ui/es/data-table/src/interface'
import type { ProButtonProps } from '../../button'
import type { RecordCreatorProps } from '../types'
import { PlusOutlined } from '@vicons/antd'
import { isArray, isFunction, isNil } from 'lodash-es'
import { NIcon } from 'naive-ui'
import { useInjectField } from 'pro-composables'
import { computed, defineComponent, inject, ref } from 'vue'
import { useNaiveClsPrefix } from '../../_internal/useClsPrefix'
import { findTree } from '../../_utils/tree'
import { warnOnce } from '../../_utils/warn'
import { ProButton } from '../../button'
import { resolveRowKey } from '../../data-table/utils/resolveRowKey'
import { useInjectProForm } from '../../form'
import { useLocale } from '../../locales'
import { editDataTableInjectionKey } from '../context'
import { internalEditDataTableProps } from '../props'

export default defineComponent({
  name: 'CreatorButton',
  props: {
    rowKey: internalEditDataTableProps.rowKey,
    actionGuard: internalEditDataTableProps.actionGuard,
    childrenKey: internalEditDataTableProps.childrenKey,
    recordCreatorProps: internalEditDataTableProps.recordCreatorProps,
  },
  setup(props) {
    const form = useInjectProForm()
    const mergedClsPrefix = useNaiveClsPrefix()

    const {
      getMessage,
    } = useLocale('ProEditDataTable')

    const {
      editableKeys,
    } = inject(editDataTableInjectionKey)!

    const {
      insert,
      value: list,
      stringPath: tablePath,
    } = useInjectField(true)!

    const loading = ref(false)

    const recordCreatorProps = computed(() => {
      return (props.recordCreatorProps ?? {}) as Exclude<RecordCreatorProps, false>
    })

    const proButtonProps = computed<ProButtonProps>(() => {
      const {
        record,
        parentRowKey,
        ...buttonProps
      } = recordCreatorProps.value

      return {
        block: true,
        dashed: true,
        loading: loading.value,
        content: getMessage('add'),
        renderIcon: () => {
          return (
            <NIcon>
              <PlusOutlined />
            </NIcon>
          )
        },
        onClick: add,
        ...(buttonProps ?? {}),
      }
    })

    function insertByParentRowKey(parentRowKey: RowKey | (() => RowKey), row: Record<string, any>) {
      const childrenKey = props.childrenKey ?? 'children'
      parentRowKey = isFunction(parentRowKey) ? parentRowKey() : parentRowKey
      const parentRow = findTree(list.value, (item) => {
        return resolveRowKey(item, props.rowKey) === parentRowKey
      }, childrenKey)
      if (!parentRow) {
        warnOnce(
          'pro-edit-data-table',
          `The parentRowKey does not exist in the list, please check the parentRowKey value.`,
        )
        return
      }
      if (isArray(parentRow[childrenKey])) {
        parentRow[childrenKey].push(row)
      }
      else {
        parentRow[childrenKey] = [row]
      }
    }

    async function add() {
      const { rowKey, actionGuard } = props
      const insertIndex = list.value.length
      const { record, parentRowKey } = recordCreatorProps.value
      const { beforeAddRow, afterAddRow } = actionGuard ?? {}
      if (beforeAddRow) {
        loading.value = true
        const success = await beforeAddRow({ total: list.value.length, index: -1, insertIndex })
        if (success) {
          const row = record?.() ?? {}
          isNil(parentRowKey)
            ? insert(insertIndex, row)
            : insertByParentRowKey(parentRowKey, row)
          editableKeys.value = new Set([
            ...editableKeys.value,
            resolveRowKey(row, rowKey),
          ])
          if (afterAddRow) {
            afterAddRow({ total: list.value.length, index: -1, insertIndex })
          }
          if (form) {
            form.validate(tablePath.value)
          }
        }
        loading.value = false
      }
      else {
        const row = record?.() ?? {}
        isNil(parentRowKey)
          ? insert(insertIndex, row)
          : insertByParentRowKey(parentRowKey, row)
        editableKeys.value = new Set([
          ...editableKeys.value,
          resolveRowKey(row, rowKey),
        ])
        if (afterAddRow) {
          afterAddRow({ total: list.value.length, index: -1, insertIndex })
        }
        if (form) {
          form.validate(tablePath.value)
        }
      }
    }

    return {
      add,
      proButtonProps,
      mergedClsPrefix,
    }
  },
  render() {
    return (
      <ProButton
        class={[`${this.mergedClsPrefix}-pro-edit-data-table__creator-button`]}
        {...this.proButtonProps}
      />
    )
  },
})
