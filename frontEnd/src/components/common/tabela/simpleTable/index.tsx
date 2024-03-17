import {
  MRT_ColumnDef,
  MRT_TableState,
  MantineReactTable,
} from 'mantine-react-table'
import createMantineReactTable from '../createMantineReactTable'
import { faTrashCan } from '@fortawesome/pro-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Tooltip } from '@mantine/core'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type SimpleTableType<T extends Record<string, any>> = {
  columns: MRT_ColumnDef<T>[]
  data: T[]
  acoes: T[]
  enableRowActions?: boolean
  positionActionsColumn?: 'first' | 'last'
  onDelete: (value: number) => void
  height?: number
  initialState?: Partial<MRT_TableState<T>>
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const SimpleTable = <T extends Record<string, any>>({
  acoes,
  columns,
  height,
  enableRowActions,
  positionActionsColumn = 'last',
  data,
  onDelete,
  initialState,
}: SimpleTableType<T>) => {
  const excluirAction = acoes.find(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (element: any) => element.label === 'EXCLUIR'
  )
  const table = createMantineReactTable<T>({
    customProps: {
      columns,
      data,
      enableRowVirtualization: false,
      enableRowActions: enableRowActions,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      renderRowActions: (rowIndex: any) => (
        <>
          {excluirAction && (
            <Tooltip label={'Excluir'}>
              <FontAwesomeIcon
                icon={faTrashCan}
                cursor={'pointer'}
                style={{ fontSize: '14px' }}
                onClick={() => onDelete(rowIndex.row.index)}
              />
            </Tooltip>
          )}
        </>
      ),
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
