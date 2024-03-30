import {
  MRT_PaginationState,
  MantineReactTable,
  type MRT_ColumnDef,
  MRT_TableState,
  MRT_Row,
  MRT_TableInstance,
  MRT_SortingState,
} from 'mantine-react-table'
import createMantineReactTable from '../createMantineReactTable'
import { ReactNode } from 'react'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Tabela<T extends Record<string, any>> = {
  columns: MRT_ColumnDef<T>[]
  data: T[]
  rowCount: number
  setPagination: React.Dispatch<React.SetStateAction<MRT_PaginationState>>
  enablePinning?: boolean
  enableClickToCopy?: boolean
  initialState?: Partial<MRT_TableState<T>>
  enableRowActions?: boolean
  positionActionsColumn?: 'first' | 'last'
  state?: Partial<MRT_TableState<T>>
  rowActions?: (props: {
    row: MRT_Row<T>
    table: MRT_TableInstance<T>
  }) => ReactNode
  enableSorting?: boolean
  setSorting?: React.Dispatch<React.SetStateAction<MRT_SortingState>>
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const PaginationTable = <T extends Record<string, any>>({
  columns,
  data,
  rowCount,
  setPagination,
  initialState,
  enableClickToCopy,
  enablePinning = false,
  state,
  enableRowActions = false,
  positionActionsColumn = 'last',
  rowActions,
  enableSorting = false,
  setSorting,
}: Tabela<T>) => {
  const table = createMantineReactTable<T>({
    customProps: {
      columns,
      data,
      enablePinning: enablePinning,
      enableTopToolbar: false,
      enableBottomToolbar: true,
      enableClickToCopy: enableClickToCopy,
      manualPagination: true,
      enablePagination: true,
      enableDensityToggle: false,
      enableFullScreenToggle: false,
      enableRowActions: enableRowActions,
      positionActionsColumn: positionActionsColumn,
      enableSorting: enableSorting,
      manualSorting: enableSorting,
      onSortingChange: setSorting,
      renderRowActions: rowActions,
      onPaginationChange: setPagination,
      rowCount: rowCount,
      mantinePaginationProps: {
        rowsPerPageOptions: ['5', '10', '25', '50', '100'],
      },
      mantineTableProps: {
        sx: {
          marginRight: -10000,
        },
      },
    },
    initialState,
    state,
  })

  return <MantineReactTable table={table} />
}

export default PaginationTable
