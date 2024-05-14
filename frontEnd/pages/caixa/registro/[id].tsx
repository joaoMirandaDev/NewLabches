import { ErrorNotification } from '@components/common'
import SearchBar from '@components/common/filtro/filtro-sem-remocao-caracter'
import PaginationTable from '@components/common/tabela/paginationTable'
import DrawerPedido from '@components/pages/caixa'
import DeletePedido from '@components/pages/caixa/deletePedido'
import PaymentPedido from '@components/pages/caixa/payment'
import VisualizarPedidoById from '@components/pages/pedido/visualizar'
import {
  ActionIcon,
  Box,
  Button,
  Card,
  Divider,
  Flex,
  Group,
  Space,
  Text,
  Tooltip,
} from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import {
  IconAlertTriangle,
  IconArrowBarLeft,
  IconCircleCheck,
  IconEdit,
  IconEye,
  IconTrash,
} from '@tabler/icons'
import { IconCash } from '@tabler/icons-react'
import {
  MRT_ColumnDef,
  MRT_PaginationState,
  MRT_Row,
  MRT_SortingState,
} from 'mantine-react-table'
import { useRouter } from 'next/router'
import { useEffect, useMemo, useState } from 'react'
import ICaixa from 'src/interfaces/Caixa'
import IPedido from 'src/interfaces/pedido'
import ISearch from 'src/interfaces/search'
import api from 'src/utils/Api'
import { PAGE_INDEX, PAGE_SIZE } from 'src/utils/Constants'
import {
  CAIXA_BY_ID,
  GET_VALOR_TOTAL_BY_CAIXA,
  PEDIDO_PAGE,
} from 'src/utils/Routes'
export default function RegistroCaixa() {
  const navigate = useRouter()
  const [data, setData] = useState<ICaixa>()
  const [dataPedido, setDataPedido] = useState<IPedido[]>([])
  const [idPedido, setIdPedido] = useState<number | null>(null)
  const [openModalVisualizarPedido, setOpenModalVisualizarPedido] =
    useState<boolean>(false)
  const [totalElements, setTotalElements] = useState<number>(0)
  const [opened, { open, close }] = useDisclosure(false)
  const [totalVendas, setTotalVendas] = useState<number>(0)
  const router = useRouter()
  const [resetPesquisa, setResetPesquisa] = useState<boolean>(false)
  const [modalPedido, setModalPedido] = useState<boolean>(false)
  const [modalDeletePedido, setModalDeletePedido] = useState<boolean>(false)
  const [sorting, setSorting] = useState<MRT_SortingState>([
    { id: 'numeroPedido', desc: true },
  ])
  const [filtro, setFiltro] = useState<ISearch>({
    search: '',
    pagina: 0,
    tamanhoPagina: 10,
    id: 'numero_pedido',
    desc: true,
  })
  const { id } = router.query
  const [pagination, setPagination] = useState<MRT_PaginationState>({
    pageIndex: PAGE_INDEX,
    pageSize: PAGE_SIZE,
  })
  useEffect(() => {
    sorting.map(value => {
      setFiltro(prevData => ({ ...prevData, id: value.id, desc: value.desc }))
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sorting])
  useEffect(() => {
    caixaById()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  useEffect(() => {
    if (
      pagination.pageIndex !== filtro.pagina ||
      pagination.pageSize !== filtro.tamanhoPagina
    ) {
      const localFiltro = {
        ...filtro,
        tamanhoPagina: pagination.pageSize,
        pagina: pagination.pageIndex,
      }
      setFiltro(localFiltro)
    }
    findAllPagePedido()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pagination, filtro])
  const caixaById = async () => {
    await api
      .get(CAIXA_BY_ID + id)
      .then(response => {
        setData(response.data)
      })
      .catch(() => {
        ErrorNotification({ message: 'Error ao buscar caixa' })
      })
    await api
      .get(GET_VALOR_TOTAL_BY_CAIXA + id)
      .then(response => {
        setTotalVendas(response.data)
      })
      .catch(() => {
        ErrorNotification({
          message: 'Error ao buscar valor total de vendas',
        })
      })
  }
  const findAllPagePedido = async () => {
    if (id && id != undefined) {
      await api
        .post(PEDIDO_PAGE + id, filtro)
        .then(response => {
          setDataPedido(response.data.content)
          setTotalElements(response.data.totalElements)
        })
        .catch(() => {
          ErrorNotification({ message: 'Error ao buscar pedidos' })
        })
    }
  }
  const closeModalPedido = () => {
    setModalPedido(false)
  }
  const closeModalDeletePedido = () => {
    setModalDeletePedido(false)
  }
  const closeModal = () => {
    close()
  }
  const refresh = (val: boolean) => {
    if (val) {
      caixaById()
      findAllPagePedido()
    }
  }
  const filter = (value: string) => {
    if (value.length > 0) {
      setResetPesquisa(true)
    } else {
      setResetPesquisa(false)
    }
    setFiltro(prevData => ({ ...prevData, search: value, pagina: 0 }))
  }
  const openModal = () => {
    open()
  }
  const columns = useMemo<MRT_ColumnDef<IPedido>[]>(
    () => [
      {
        accessorKey: 'numeroPedido',
        header: 'Número pedido',
        enableSorting: true,
        enableColumnFilter: true,
        size: 15,
        minSize: 10,
        maxSize: 30,
        mantineTableBodyCellProps: {
          align: 'center',
        },
        mantineTableHeadCellProps: {
          align: 'center',
        },
        Cell: ({ renderedCellValue, row }) => (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
            }}
          >
            {row.original.pago == 0 && (
              <>
                <IconAlertTriangle size={16} color="red" />
                <span>{renderedCellValue}</span>
              </>
            )}
            {row.original.pago == 1 && (
              <>
                <IconCircleCheck size={16} color="green" />
                <span>{renderedCellValue}</span>
              </>
            )}
          </Box>
        ),
      },
      {
        accessorKey: 'nomeCliente',
        header: 'Nome cliente',
        enableSorting: true,
        enableColumnFilter: true,
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
          cell.getValue<string>() == null ? '-' : cell.getValue<string>(),
      },
      {
        accessorKey: 'mesa',
        header: 'Mesa',
        enableSorting: true,
        enableColumnFilter: true,
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
          cell.getValue<number>() == null ? '-' : cell.getValue<number>(),
      },
      {
        accessorKey: 'valorTotal',
        header: 'Valor',
        enableSorting: true,
        enableColumnFilter: true,
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
        accessorKey: 'formaPagamento.nome',
        header: 'Forma de pagamento',
        enableSorting: false,
        enableColumnFilter: true,
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
          cell.getValue<string>() == null || cell.getValue<string>() == ''
            ? '-'
            : cell.getValue<string>(),
      },
      {
        accessorKey: 'tipoPedido.name',
        header: 'Tipo de pedido',
        enableSorting: false,
        enableColumnFilter: true,
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
          cell.getValue<string>() == null || cell.getValue<string>() == ''
            ? '-'
            : cell.getValue<string>(),
      },
      {
        accessorKey: 'pago',
        header: 'Status',
        enableSorting: true,
        enableColumnFilter: true,
        size: 15,
        minSize: 10,
        maxSize: 30,
        mantineTableBodyCellProps: {
          align: 'center',
        },
        mantineTableHeadCellProps: {
          align: 'center',
        },
        Cell: ({ row }) => (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
            }}
          >
            {row.original.pago == 0 && (
              <>
                <span>Aberto</span>
              </>
            )}
            {row.original.pago == 1 && (
              <>
                <span>Pago</span>
              </>
            )}
          </Box>
        ),
      },
    ],
    []
  )
  const payment = (value: IPedido) => {
    setIdPedido(Number(value.id))
    setModalPedido(true)
  }
  const deletePedido = (value: IPedido) => {
    setModalDeletePedido(true)
    setIdPedido(Number(value.id))
  }
  const closeModalVisualizarPedido = () => {
    setOpenModalVisualizarPedido(false)
  }
  const visualizarPedido = (id: number) => {
    setOpenModalVisualizarPedido(true)
    setIdPedido(id)
  }
  const retornListPedido = () => {
    navigate.push(`/caixa`)
  }
  const rowActions = ({ row }: { row: MRT_Row<IPedido> }) => (
    <Flex>
      <Tooltip label={'Visualizar pedido'}>
        <ActionIcon
          size="sm"
          variant="transparent"
          aria-label="Settings"
          onClick={() => visualizarPedido(row.original.id!)}
        >
          <IconEye style={{ cursor: 'pointer' }} />
        </ActionIcon>
      </Tooltip>
      <Tooltip label={'Pagamento'}>
        <ActionIcon
          size="sm"
          disabled={row.original.pago === 1}
          variant="transparent"
          aria-label="Settings"
          onClick={() => payment(row.original)}
        >
          <IconCash style={{ cursor: 'pointer' }} />
        </ActionIcon>
      </Tooltip>
      <Tooltip label={'Deletar pedido'}>
        <ActionIcon
          size="sm"
          variant="transparent"
          aria-label="Settings"
          disabled={row.original.pago === 1}
          onClick={() => deletePedido(row.original)}
        >
          <IconTrash style={{ cursor: 'pointer' }} />
        </ActionIcon>
      </Tooltip>
    </Flex>
  )
  return (
    <>
      <Card shadow="sm" radius="md" withBorder>
        <Card.Section>
          <Flex justify={'space-around'} mt={'1rem'}>
            <Card shadow="sm" padding="lg" m={'0.5rem'} radius="md" withBorder>
              <Flex direction={'column'} p={'1rem'} align="center">
                <Text>Número do caixa</Text>
                <Text>{data?.numeroCaixa}</Text>
              </Flex>
            </Card>
            <Card shadow="sm" padding="lg" m={'0.5rem'} radius="md" withBorder>
              <Flex direction={'column'} p={'1rem'} align="center">
                <Text>Data de abertura</Text>
                <Text>{data?.dataAbertura}</Text>
              </Flex>
            </Card>
            <Card shadow="sm" padding="lg" m={'0.5rem'} radius="md" withBorder>
              <Flex direction={'column'} p={'1rem'} align="center">
                <Text>Valor de abertura</Text>
                <Text>
                  {data?.valorAberturaCaixa?.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                  })}
                </Text>
              </Flex>
            </Card>
            <Card shadow="sm" padding="lg" m={'0.5rem'} radius="md" withBorder>
              <Flex direction={'column'} p={'1rem'} align="center">
                <Text>Total de vendas</Text>
                <Text>
                  {totalVendas
                    ? totalVendas.toLocaleString('pt-BR', {
                        style: 'currency',
                        currency: 'BRL',
                      })
                    : '-'}
                </Text>
              </Flex>
            </Card>
          </Flex>
        </Card.Section>
        <Space h="xl" />
        <Divider />
        <Space h="xl" />
        <SearchBar
          placeholder={
            'Pesquise por número do pedido, nome do cliente, valor do pedido e mesa'
          }
          clearSearch={resetPesquisa}
          textSearch="Pesquisar"
          icone={true}
          onDataFilter={filter}
        />
        <Flex justify={'flex-end'}>
          <Button
            leftIcon={<IconEdit size={18} />}
            mb={'1rem'}
            disabled={data?.caixaAberto == 1}
            onClick={() => openModal()}
          >
            Inserir pedido
          </Button>
        </Flex>
        <PaginationTable
          setSorting={setSorting}
          columns={columns}
          rowActions={rowActions}
          setPagination={setPagination}
          enableRowActions
          enableSorting
          enableClickToCopy
          positionActionsColumn="last"
          data={dataPedido}
          state={{
            sorting,
            pagination: {
              pageIndex: filtro.pagina,
              pageSize: filtro.tamanhoPagina,
            },
          }}
          rowCount={totalElements}
        />
        <Group>
          <Group position="left" align="center" mt={20} spacing={10}>
            <IconAlertTriangle style={{ color: 'red' }} />
            <Text size={'sm'}>Pedido em aberto |</Text>
          </Group>
          <Group position="left" align="center" mt={20} spacing={10}>
            <IconCircleCheck style={{ color: 'green' }} />
            <Text size={'sm'}> Pedido pago </Text>
          </Group>
        </Group>
      </Card>
      <Button
        leftIcon={<IconArrowBarLeft />}
        onClick={() => retornListPedido()}
        mt={'0.5rem'}
      >
        Voltar
      </Button>
      <DrawerPedido
        openModal={opened}
        idCaixa={Number(id)}
        refresh={refresh}
        closeModal={closeModal}
      />
      <PaymentPedido
        openModal={modalPedido}
        idPedido={idPedido}
        refresh={refresh}
        closeModalPedido={closeModalPedido}
      />
      <DeletePedido
        openModal={modalDeletePedido}
        idPedido={idPedido}
        refresh={refresh}
        closeModalPedido={closeModalDeletePedido}
      />
      <VisualizarPedidoById
        closed={closeModalVisualizarPedido}
        openModal={openModalVisualizarPedido}
        id={idPedido!}
      />
    </>
  )
}
