import type { DataTableFilterState, DataTableProps, DataTableSortState } from 'naive-ui'
import type { UsePaginationOptions, UsePaginationReturn } from 'pro-composables'
import type { ComputedRef } from 'vue'
import type { ProButtonProps } from '../button'
import { isNil } from 'lodash-es'
import { usePagination } from 'pro-composables'
import { computed, onMounted, ref, toRaw, watch } from 'vue'

export interface UseNDataTableData {
  /**
   * 总条数
   */
  total: number
  /**
   * 列表数据
   */
  list: any[]
}

type FormValues = Record<string, any>

export type UseNDataTableParams = [
  {
    /**
     * 当前页码
     */
    current: number
    /**
     * 分页大小
     */
    pageSize: number
    /**
     * 过滤条件的数据
     */
    filters: DataTableFilterState
    /**
     * 列的排序数据
     */
    sorter: DataTableSortState | DataTableSortState[] | null
    [key: string]: any
  },
  FormValues,
  ...any[],
]

export interface SearchFormLike {
  restoreFieldsValue: () => void
  fieldsValue: ComputedRef<FormValues>
  validate: () => Promise<any> | undefined
}

export type UseNDataTableService<Data extends UseNDataTableData, Params extends UseNDataTableParams> = (
  ...args: Params
) => Promise<Data>

export interface UseNDataTableOptions<
  Data extends UseNDataTableData,
  Params extends UseNDataTableParams,
> extends UsePaginationOptions<Data, Params> {
  form?: SearchFormLike
}

export interface UseNDataTableReturn<
  Data extends UseNDataTableData,
  Params extends UseNDataTableParams,
> extends UsePaginationReturn<Data, Params> {
  table: {
    tableProps: ComputedRef<{
      remote: true
      loading: boolean
      data: Data['list']
      pagination: Exclude<DataTableProps['pagination'], undefined>
      onUpdatePage: Exclude<DataTableProps['onUpdatePage'], undefined>
      onUpdateSorter: Exclude<DataTableProps['onUpdateSorter'], undefined>
      onUpdateFilters: Exclude<DataTableProps['onUpdateFilters'], undefined>
      onUpdatePageSize: Exclude<DataTableProps['onUpdatePageSize'], undefined>
    }>
    onChange: (options?: {
      page?: number
      pageSize?: number
      filters?: DataTableFilterState
      sorter?: DataTableSortState | DataTableSortState[] | null
    }
    ) => void
  }
  search: {
    reset: () => void
    submit: () => void
    resetLoading: ComputedRef<boolean>
    searchLoading: ComputedRef<boolean>
    proSearchFormProps: ComputedRef<{
      resetButtonProps: ProButtonProps
      searchButtonProps: ProButtonProps
    }>
  }
}

export function useNDataTable<
  Data extends UseNDataTableData,
  Params extends UseNDataTableParams,
>(
  service: UseNDataTableService<Data, Params>,
  options: UseNDataTableOptions<Data, Params> = {},
): UseNDataTableReturn<Data, Params> {
  const {
    form,
    manual,
    onFinally,
    refreshDeps,
    refreshDepsAction,
    ...rest
  } = options

  const resetLoading = ref(false)
  const searchLoading = ref(false)

  const fetchInst = usePagination(service, {
    ...rest,
    manual: true,
    onFinally(...args) {
      resetLoading.value = false
      searchLoading.value = false
      onFinally && onFinally(...args)
    },
  })

  if (!isNil(refreshDeps)) {
    watch(refreshDeps, () => {
      if (!manual) {
        refreshDepsAction
          ? refreshDepsAction()
          : onTableChange({ page: 1 })
      }
    })
  }

  function onTableChange(
    options: {
      page?: number
      pageSize?: number
      filters?: DataTableFilterState
      sorter?: DataTableSortState | DataTableSortState[] | null
    } = {},
  ) {
    const { run, pagination, params } = fetchInst
    const [prevParams, prevFormValues, ...restParams] = params.value ?? []

    run(
      // @ts-ignore
      {
        ...(prevParams ?? {}),
        current: options.page ?? pagination.current.value,
        sorter: options.sorter ?? prevParams?.sorter ?? null,
        filters: options.filters ?? prevParams?.filters ?? {},
        pageSize: options.pageSize ?? pagination.pageSize.value,
      },
      toRaw(prevFormValues ?? {}),
      ...restParams,
    )
  }

  function submit() {
    if (form) {
      form.validate()
        ?.then(() => {
          const { params } = fetchInst
          params.value[1] = form.fieldsValue.value
          searchLoading.value = true
          onTableChange({ page: 1 })
        })
        ?.catch(err => err)
    }
    else {
      searchLoading.value = true
      onTableChange({ page: 1 })
    }
  }

  function reset() {
    if (form) {
      form.restoreFieldsValue()
      const { params } = fetchInst
      params.value[1] = form.fieldsValue.value
    }
    resetLoading.value = true
    onTableChange({ page: 1 })
  }

  function onUpdatePage(page: number) {
    onTableChange({ page })
  }

  function onUpdatePageSize(pageSize: number) {
    const { total, current } = fetchInst.pagination
    const totalPage = Math.ceil(total.value / pageSize)
    let _current = current.value
    if (_current > totalPage) {
      _current = Math.max(1, totalPage)
    }
    onTableChange({ page: _current, pageSize })
  }

  function onUpdateFilters(filters: DataTableFilterState) {
    onTableChange({ filters })
  }

  function onUpdateSorter(sorter: DataTableSortState | DataTableSortState[] | null) {
    onTableChange({ sorter })
  }

  onMounted(() => {
    if (!manual) {
      submit()
    }
  })

  return {
    ...fetchInst,
    table: {
      onChange: onTableChange,
      tableProps: computed(() => {
        const {
          data,
          loading,
          pagination,
        } = fetchInst

        return {
          remote: true,
          loading: loading.value,
          data: data.value?.list ?? [],
          pagination: {
            page: pagination.current.value,
            itemCount: pagination.total.value,
            pageSize: pagination.pageSize.value,
          },
          onUpdatePage,
          onUpdateSorter,
          onUpdateFilters,
          onUpdatePageSize,
        }
      }),
    },
    search: {
      reset,
      submit,
      resetLoading: computed(() => resetLoading.value),
      searchLoading: computed(() => searchLoading.value),
      proSearchFormProps: computed(() => {
        return {
          loading: fetchInst.loading.value,
          searchButtonProps: {
            attrType: 'button',
            loading: searchLoading.value,
            disabled: fetchInst.loading.value,
            onClick: submit,
          },
          resetButtonProps: {
            attrType: 'button',
            loading: resetLoading.value,
            onClick: reset,
          },
        }
      }),
    },
  }
}
