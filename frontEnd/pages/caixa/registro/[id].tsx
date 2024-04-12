import { ErrorNotification } from '@components/common'
import SearchBar from '@components/common/filtro/filtro-sem-remocao-caracter'
import PaginationTable from '@components/common/tabela/paginationTable'
import { Box, Button, Card, Divider, Flex, Space, Text } from '@mantine/core'
import { IconAlertTriangle, IconCircleCheck, IconEdit } from '@tabler/icons'
import {
  MRT_ColumnDef,
  MRT_PaginationState,
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
  const [data, setData] = useState<ICaixa>()
  const [dataPedido, setDataPedido] = useState<IPedido[]>([])
  const [totalElements, setTotalElements] = useState<number>(0)
  const [totalVendas, setTotalVendas] = useState<number>(0)
  const router = useRouter()
  const [resetPesquisa, setResetPesquisa] = useState<boolean>(false)
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
  const filter = (value: string) => {
    if (value.length > 0) {
      setResetPesquisa(true)
    } else {
      setResetPesquisa(false)
    }
    setFiltro(prevData => ({ ...prevData, search: value, pagina: 0 }))
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
            // disabled={!caixaAberto}
            // onClick={() => openModalCaixa()}
          >
            Inserir pedido
          </Button>
        </Flex>
        <PaginationTable
          setSorting={setSorting}
          columns={columns}
          // rowActions={rowActions}
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
      </Card>
    </>
  )
}
