import {
  ActionIcon,
  Button,
  Divider,
  Flex,
  Select,
  SelectItem,
  Space,
  Tooltip,
} from '@mantine/core'
import { useEffect, useMemo, useState } from 'react'
import IMercadoria from 'src/interfaces/mercadoria'
import { FIND_ALL_ESPECIALIDADE } from 'src/utils/Routes'
import api from 'src/utils/Api'
import { IconDatabasePlus, IconEdit, IconTrash } from '@tabler/icons-react'
import SimpleTable from '@components/common/tabela/simpleTable'
import { MRT_ColumnDef, MRT_Row } from 'mantine-react-table'
import IEspecialidadeMercadoria from 'src/interfaces/especialidadeCompra'
import { useDisclosure } from '@mantine/hooks'
import ModalPedidoEspecialidade from './modal'
import IPedidoEspecialidade from 'src/interfaces/PedidoEspecialidade'

interface PedidoEspecialidade {
  // openModal: boolean
  // idCaixa: number
  listEspecialidade: (value: IPedidoEspecialidade[]) => void
}

const PedidoEspecialidade: React.FC<PedidoEspecialidade> = ({
  listEspecialidade,
}) => {
  const [especialidade, setEspecialidade] = useState<SelectItem[]>([])
  const [idEspecialidade, setIdEspecialidade] = useState<number | null>(null)
  const [opened, { open, close }] = useDisclosure(false)
  const [data, setData] = useState<IEspecialidadeMercadoria[]>([])
  const getMethods = async () => {
    const especialidade = await api.get(FIND_ALL_ESPECIALIDADE)
    setEspecialidade(
      especialidade.data.map((data: IMercadoria) => ({
        value: data.id,
        label: data.nome,
      }))
    )
  }
  const columns = useMemo<MRT_ColumnDef<IEspecialidadeMercadoria>[]>(
    () => [
      {
        accessorKey: 'especialidade.nome',
        header: 'Nome',
        size: 15,
        minSize: 10,
        maxSize: 30,
        mantineTableBodyCellProps: {
          align: 'center',
        },
        mantineTableHeadCellProps: {
          align: 'center',
        },
      },
      {
        accessorKey: 'valor',
        header: 'Valor',
        size: 15,
        minSize: 10,
        maxSize: 30,
        mantineTableBodyCellProps: {
          align: 'center',
        },
        mantineTableHeadCellProps: {
          align: 'center',
        },
        Cell: ({ cell }) =>
          cell.getValue<number>() == null
            ? '-'
            : cell.getValue<number>().toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              }),
      },
      {
        accessorKey: 'quantidade',
        header: 'Quantidade',
        size: 15,
        minSize: 10,
        maxSize: 30,
        mantineTableBodyCellProps: {
          align: 'center',
        },
        mantineTableHeadCellProps: {
          align: 'center',
        },
        Cell: ({ cell }) => cell.getValue<number>().toFixed(2),
      },
    ],
    []
  )
  const objetoModal = (event: IEspecialidadeMercadoria) => {
    const newData = [...data, event]
    setData(newData)
  }

  const handleChangeMercadoria = () => {
    open()
  }
  const rowActions = ({ row }: { row: MRT_Row<IEspecialidadeMercadoria> }) => (
    <Flex>
      <Tooltip label={'Remover'}>
        <ActionIcon
          size="sm"
          variant="transparent"
          aria-label="Settings"
          onClick={() => remove(row)}
        >
          <IconTrash style={{ cursor: 'pointer' }} />
        </ActionIcon>
      </Tooltip>
      <Tooltip label={'Editar'}>
        <ActionIcon
          size="sm"
          variant="transparent"
          aria-label="Settings"
          onClick={() => editar()}
        >
          <IconEdit style={{ cursor: 'pointer' }} />
        </ActionIcon>
      </Tooltip>
    </Flex>
  )

  const remove = (row: MRT_Row) => {
    const newData = [...data]
    newData.splice(row.index, 1)
    setData(newData)
  }

  const editar = () => {
    open()
  }
  useEffect(() => {
    getMethods()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    listEspecialidade(data)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])

  return (
    <>
      <Flex mt={'1rem'} align={'flex-end'} w={'100%'}>
        <Select
          onChange={value => setIdEspecialidade(Number(value))}
          data={especialidade}
          withinPortal
          w={'100%'}
          withAsterisk
          label="Selecione a especialidade"
          placeholder="Selecione a especialidade"
        />
        <Button
          leftIcon={<IconDatabasePlus />}
          onClick={() => handleChangeMercadoria()}
          ml={'0.5rem'}
          color="green"
        >
          Inserir
        </Button>
      </Flex>
      <Space h="xl" />
      <Divider />
      <Space h="xl" />
      <SimpleTable
        enableRowActions
        rowActions={rowActions}
        columns={columns}
        data={data}
      />
      <ModalPedidoEspecialidade
        closeModal={close}
        dataModal={objetoModal}
        openModal={opened}
        idEspecialidade={idEspecialidade}
      />
    </>
  )
}

export default PedidoEspecialidade
