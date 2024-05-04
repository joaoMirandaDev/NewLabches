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
import { useDisclosure } from '@mantine/hooks'
import { IconEdit, IconTrash } from '@tabler/icons'
import { MRT_ColumnDef, MRT_Row } from 'mantine-react-table'
import { useEffect, useMemo, useState } from 'react'
import api from 'src/utils/Api'
import IEspecialidadeMercadoria from 'src/interfaces/especialidadeCompra'
import IMercadoria from 'src/interfaces/mercadoria'
import { FIND_ALL_MERCADORIA, MERCADORIA_BY_ID } from 'src/utils/Routes'
import { IconDatabasePlus } from '@tabler/icons-react'
import SimpleTable from '@components/common/tabela/simpleTable'
import ModalAdicional from './modal'
import IAdicional from 'src/interfaces/IAdicional'

interface AdiocionalEspecialidade {
  clear: boolean
  // idCaixa: number
  adicional: (value: IAdicional[]) => void
}
const Adicional: React.FC<AdiocionalEspecialidade> = ({ adicional, clear }) => {
  const [mercadoria, setMercadoria] = useState<SelectItem[]>([])
  const [idMercadoria, setIdMercadoria] = useState<number | null>(null)
  const [itemSelecionado, setItemSelecionado] =
    useState<IEspecialidadeMercadoria | null>(null)
  const [opened, { open, close }] = useDisclosure(false)
  const [data, setData] = useState<IAdicional[]>([])
  const getMethods = async () => {
    const mercadoria = await api.get(FIND_ALL_MERCADORIA)
    const dataMercadoria = mercadoria.data.map((data: IMercadoria) => ({
      value: data.id,
      label: data.nome,
      group: data.tipo.nome,
    }))
    setMercadoria(dataMercadoria)
  }
  useEffect(() => {
    if (clear) {
      setData([])
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clear])
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
    adicional(data)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])

  const itemAdicional = (value: IAdicional) => {
    const index = data.findIndex(
      val => val.mercadoria?.nome === value.mercadoria?.nome
    )
    if (index !== -1) {
      data[index] = value
    } else {
      data.push(value)
    }
    setData([...data])
    setItemSelecionado(null)
  }

  return (
    <>
      <Flex align={'flex-end'} w={'100%'}>
        <Select
          onChange={value => setIdMercadoria(Number(value))}
          data={mercadoria}
          withinPortal
          w={'100%'}
          withAsterisk
          label="Selecione o(s) adicionais desejados"
          placeholder="Selecione o(s) adicionais desejados"
        />
        <Button
          leftIcon={<IconDatabasePlus />}
          disabled={!idMercadoria}
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
      <ModalAdicional
        openModal={opened}
        closeModal={() => close()}
        data={itemSelecionado}
        adional={itemAdicional}
      />
    </>
  )
}
export default Adicional
