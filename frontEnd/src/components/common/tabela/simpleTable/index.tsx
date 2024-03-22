import { ReactNode } from 'react'
import {
  MRT_ColumnDef,
  MRT_Row,
  MRT_TableInstance,
  MRT_TableState,
  MantineReactTable,
} from 'mantine-react-table'
import createMantineReactTable from '../createMantineReactTable'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type SimpleTableType<T extends Record<string, any>> = {
  columns: MRT_ColumnDef<T>[]
  data: T[]
  enableRowActions?: boolean
  positionActionsColumn?: 'first' | 'last'
  height?: number
  initialState?: Partial<MRT_TableState<T>>
  rowActions?: (props: {
    row: MRT_Row<T>
    table: MRT_TableInstance<T>
  }) => ReactNode
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const SimpleTable = <T extends Record<string, any>>({
  rowActions,
  columns,
  height,
  enableRowActions,
  positionActionsColumn = 'last',
  data,
  initialState,
}: SimpleTableType<T>) => {
  const table = createMantineReactTable<T>({
    customProps: {
      columns,
      data,
      enableRowVirtualization: false,
      enableRowActions: enableRowActions,
      renderRowActions: rowActions,
      positionActionsColumn: positionActionsColumn,
      enableSorting: true,
      mantineTableProps: {
        sx: {
          marginRight: -10000,
        },
      },
    },
    height,
    initialState,
  })

  return <MantineReactTable table={table} />
}

export default SimpleTable
