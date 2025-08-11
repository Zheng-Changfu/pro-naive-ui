import type { ArrayFieldAction } from 'pro-composables'
import type { Merge } from 'type-fest'
import type { ProDataTableInst } from '../data-table/inst'

export type ProEditDataTableInst<RowData = any> = Merge<ArrayFieldAction<RowData>, ProDataTableInst>
