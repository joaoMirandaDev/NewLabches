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
import { FIND_ALL_MERCADORIA, MERCADORIA_BY_ID } from 'src/utils/Routes'
import api from 'src/utils/Api'
import { IconDatabasePlus, IconEdit, IconTrash } from '@tabler/icons-react'
import SimpleTable from '@components/common/tabela/simpleTable'
import { MRT_ColumnDef, MRT_Row } from 'mantine-react-table'
import IEspecialidadeMercadoria from 'src/interfaces/especialidadeCompra'
import ModalInsertMercadoria from '@components/pages/especialidades/modal/modal'
import { useDisclosure } from '@mantine/hooks'
import IPedidoMercadoria from 'src/interfaces/PedidoMercadoria'

interface PedidoMercadoria {
  listMercadoriaBanco: IPedidoMercadoria[]
  listMercadoria: (value: IPedidoMercadoria[]) => void
}

const PedidoMercadoria: React.FC<PedidoMercadoria> = ({
  listMercadoria,
  listMercadoriaBanco,
}) => {
  const [mercadoria, setMercadoria] = useState<SelectItem[]>([])
  const [idMercadoria, setIdMercadoria] = useState<number | null>(null)
  const [itemSelecionado, setItemSelecionado] =
    useState<IPedidoMercadoria | null>(null)
  const [opened, { open, close }] = useDisclosure(false)
  const [data, setData] = useState<IPedidoMercadoria[]>([])
  useEffect(() => {
    if (listMercadoriaBanco.length > 0) {
      setData(listMercadoriaBanco)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [listMercadoriaBanco])
  const getMethods = async () => {
    setData([])
    const mercadoria = await api.get(FIND_ALL_MERCADORIA)
    const dataMercadoria = mercadoria.data.map((data: IMercadoria) => ({
      value: data.id,
      label: data.nome,
      group: data.tipo.nome,
    }))
    setMercadoria(dataMercadoria)
  }
  const columns = useMemo<MRT_ColumnDef<IEspecialidadeMercadoria>[]>(
    () => [
      {
        accessorKey: 'mercadoria.nome',
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
        accessorKey: 'mercadoria.valorVenda',
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
  const objetoModal = (event: IPedidoMercadoria) => {
    const index = data.findIndex(
      val => val.mercadoria?.nome === event.mercadoria?.nome
    )
    if (index !== -1) {
      data[index] = event
    } else {
      data.push(event)
    }
    setData([...data])
    setItemSelecionado(null)
  }
  const handleChange = (key: string, event: IEspecialidadeMercadoria) => {
    setItemSelecionado({ ...itemSelecionado, [key]: event })
  }
  const handleChangeMercadoria = () => {
    api.get(MERCADORIA_BY_ID + `${idMercadoria}`).then(response => {
      handleChange('mercadoria', response.data)
      open()
    })
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
          onClick={() => editar(row)}
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

  const editar = (row: MRT_Row) => {
    setItemSelecionado(row.original)
    open()
  }
  useEffect(() => {
    getMethods()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    listMercadoria(data)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])

  return (
    <>
      <Flex mt={'1rem'} align={'flex-end'} w={'100%'}>
        <Select
          onChange={value => setIdMercadoria(Number(value))}
          data={mercadoria}
          searchable
          clearable
          withinPortal
          w={'100%'}
          withAsterisk
          label="Selecione as mercadorias"
          placeholder="Selecione as mercadorias"
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
      <ModalInsertMercadoria
        closeModal={close}
        dataModal={objetoModal}
        openModal={opened}
        data={itemSelecionado}
      />
    </>
  )
}

export default PedidoMercadoria
