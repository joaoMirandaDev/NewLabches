import SearchBar from '@components/common/filtro/filtro-sem-remocao-caracter'
import PaginationTable from '@components/common/tabela/paginationTable'
import DrawerCadastroMercadoria from '@components/pages/mercadoria/cadastro'
import DrawerMercadoria from '@components/pages/mercadoria/editar/drawer'
import ModalHistoricoMercadoria from '@components/pages/mercadoria/modalHistorico/modal'
import {
  ActionIcon,
  Box,
  Button,
  Flex,
  Group,
  Text,
  Tooltip,
} from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { useTranslate } from '@refinedev/core'
import { IconCirclePlus, IconEye, IconFileSearch } from '@tabler/icons'
import { IconCircleFilled } from '@tabler/icons-react'
import Cookies from 'js-cookie'
import {
  MRT_ColumnDef,
  MRT_PaginationState,
  MRT_Row,
  MRT_SortingState,
} from 'mantine-react-table'
import { GetServerSideProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useEffect, useMemo, useState } from 'react'
import IMercadoria from 'src/interfaces/mercadoria'
import ISearch from 'src/interfaces/search'
import api from 'src/utils/Api'
import { PAGE_INDEX, PAGE_SIZE } from 'src/utils/Constants'

export default function FornecedorList() {
  const t = useTranslate()
  const [openModal, setOpenModal] = useState<boolean>(false)
  const [openModalHistorico, setOpenModalHistorico] = useState<boolean>(false)
  const [idHistorio, setIdHistorio] = useState<number | null>(null)
  const [opened, { open, close }] = useDisclosure(false)
  const [sorting, setSorting] = useState<MRT_SortingState>([])
  const [produto, setProduto] = useState<IMercadoria | null>(null)
  const [dataMercadoria, setDataMercadoria] = useState<IMercadoria[]>([])
  const [resetPesquisa, setResetPesquisa] = useState<boolean>(false)
  const [totalElements, setTotalElements] = useState<number>(0)
  const [pagination, setPagination] = useState<MRT_PaginationState>({
    pageIndex: PAGE_INDEX,
    pageSize: PAGE_SIZE,
  })
  const [filtro, setFiltro] = useState<ISearch>({
    search: '',
    pagina: 0,
    tamanhoPagina: 10,
    id: 'nome',
    desc: false,
  })
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
    findAllProdutos()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pagination, filtro])

  useEffect(() => {
    if (sorting.length == 0) {
      setSorting([{ id: 'nome', desc: false }])
    }
    sorting.map(value => {
      setFiltro(prevData => ({ ...prevData, id: value.id, desc: value.desc }))
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sorting])

  const filterCliente = (value: string) => {
    if (value.length > 0) {
      setResetPesquisa(true)
    } else {
      setResetPesquisa(false)
    }
    setFiltro(prevData => ({
      ...prevData,
      search: value,
      pagina: 0,
    }))
  }

  const refresDrawerVisualizar = (condicao: boolean) => {
    if (condicao) {
      findAllProdutos()
    }
  }

  const refreshList = (condicao: boolean) => {
    if (condicao) {
      findAllProdutos()
    }
  }

  const findAllProdutos = async () => {
    const value = await api.post('/api/mercadoria/list', filtro)
    setDataMercadoria(value.data.content)
    setTotalElements(value.data.totalElements)
  }

  const columns = useMemo<MRT_ColumnDef<IMercadoria>[]>(
    () => [
      {
        accessorKey: 'nome',
        header: t('pages.mercadoria.table.nome'),
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
      },
      {
        accessorKey: 'saldoEstoque',
        header: t('pages.mercadoria.table.saldoEstoque'),
        enableSorting: true,
        enableColumnFilter: true,
        size: 25,
        minSize: 10,
        maxSize: 40,
        mantineTableBodyCellProps: {
          align: 'center',
        },
        mantineTableHeadCellProps: {
          align: 'center',
        },
        Cell: ({ cell, row }) => (
          <Box
            sx={theme => ({
              backgroundColor:
                cell.getValue<number>() <= row.original.limiteMinimo!
                  ? theme.colors.red[9]
                  : cell.getValue<number>() <= row.original.limiteMinimo! * 1.5
                  ? theme.colors.yellow[9]
                  : theme.colors.green[9],
              borderRadius: '4px',
              color: '#fff',
              maxWidth: '9ch',
              padding: '5px',
            })}
          >
            {cell.getValue<number>()?.toFixed(2)}
          </Box>
        ),
      },
      {
        accessorKey: 'valorVenda',
        header: t('pages.mercadoria.table.valorVenda'),
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
          cell
            .getValue<number>()
            .toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }),
      },
      {
        accessorKey: 'unidadeMedida.nome',
        header: t('pages.mercadoria.table.unidadeMedida'),
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
      },
      {
        accessorKey: 'dataCadastro',
        header: t('pages.mercadoria.table.dataCadastro'),
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
      },
    ],
    [t]
  )

  const visualizar = (id: number) => {
    api.get(`api/mercadoria/findById/${id}`).then(response => {
      setProduto(response.data)
      setOpenModal(true)
    })
  }

  const closeModalHistorico = (value: boolean) => {
    setOpenModalHistorico(value)
    setIdHistorio(null)
  }

  const closeDrawerVisual = (condicao: boolean) => {
    if (!condicao) {
      setOpenModal(condicao)
    }
  }

  const closeDrawer = (condicao: boolean) => {
    if (!condicao) {
      close()
    }
  }

  const validatePermissionRole = () => {
    if (Cookies.get('role') == 'CAIXA') {
      return true
    }
  }

  const getHisotico = (id: number) => {
    setIdHistorio(id)
    setOpenModalHistorico(true)
  }

  const rowActions = ({ row }: { row: MRT_Row<IMercadoria> }) => (
    <Flex>
      <Tooltip label={t('pages.fornecedor.tooltip.visualizar')}>
        <ActionIcon
          size="sm"
          disabled={validatePermissionRole()}
          variant="transparent"
          aria-label="Settings"
          onClick={() => visualizar(row.original.id!)}
        >
          <IconEye style={{ cursor: 'pointer' }} />
        </ActionIcon>
      </Tooltip>
      <Tooltip label={'Histórico'}>
        <ActionIcon
          size="sm"
          disabled={validatePermissionRole()}
          variant="transparent"
          aria-label="Settings"
          onClick={() => getHisotico(row.original.id!)}
        >
          <IconFileSearch style={{ cursor: 'pointer' }} />
        </ActionIcon>
      </Tooltip>
    </Flex>
  )

  return (
    <>
      <SearchBar
        placeholder={t(
          'Pesquise por nome, saldo disponível, valor de venda, unidade de medida e data de cadastro'
        )}
        clearSearch={resetPesquisa}
        textSearch={t('pages.produtos.buttonSearchBar')}
        icone={true}
        onDataFilter={filterCliente}
      />
      <Flex justify={'flex-end'} m={10}>
        <Button
          leftIcon={<IconCirclePlus size={16} />}
          disabled={validatePermissionRole()}
          onClick={() => open()}
        >
          Casdastrar Mercadoria
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
        data={dataMercadoria}
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
          <IconCircleFilled style={{ color: 'red' }} />
          <Text size={'sm'}>Estoque baixo |</Text>
        </Group>
        <Group position="left" align="center" mt={20} spacing={10}>
          <IconCircleFilled style={{ color: 'orange' }} />
          <Text size={'sm'}>Estoque proximo do minímo |</Text>
        </Group>
        <Group position="left" align="center" mt={20} spacing={10}>
          <IconCircleFilled style={{ color: 'green' }} />
          <Text size={'sm'}>Estoque alto</Text>
        </Group>
      </Group>
      <DrawerMercadoria
        close={closeDrawerVisual}
        refresDrawerVisualizar={refresDrawerVisualizar}
        openModal={openModal}
        dataMercadoria={produto}
      />
      <DrawerCadastroMercadoria
        refresh={refreshList}
        openModal={opened}
        close={closeDrawer}
      />
      {idHistorio && (
        <ModalHistoricoMercadoria
          closeHistorico={closeModalHistorico}
          openModal={openModalHistorico}
          id={idHistorio!}
        />
      )}
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async context => {
  const translateProps = await serverSideTranslations(context.locale ?? 'pt', [
    'common',
  ])

  return {
    props: {
      ...translateProps,
    },
  }
}
