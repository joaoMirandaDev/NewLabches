import SearchBar from '@components/common/filtro/filtro-sem-remocao-caracter'
import PaginationTable from '@components/common/tabela/paginationTable'
import DrawerCadastroCompras from '@components/pages/compras/cadastro'
import { ActionIcon, Button, Flex, Tooltip } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { useTranslate } from '@refinedev/core'
import { IconCirclePlus, IconEye, IconFileSearch } from '@tabler/icons'
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
import ICompra from 'src/interfaces/compras'
import ISearch from 'src/interfaces/search'
import api from 'src/utils/Api'
import { PAGE_INDEX, PAGE_SIZE } from 'src/utils/Constants'

export default function FornecedorList() {
  const t = useTranslate()
  // const [openModalHistorico, setOpenModalHistorico] = useState<boolean>(false)
  const [opened, { open, close }] = useDisclosure(false)
  const [sorting, setSorting] = useState<MRT_SortingState>([])
  const [dataCompra, setDataCompra] = useState<ICompra[]>([])
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
    id: 'data_compra',
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

  const refreshList = (condicao: boolean) => {
    if (condicao) {
      findAllProdutos()
    }
  }

  const findAllProdutos = async () => {
    const value = await api.post('/api/compras/list', filtro)
    setDataCompra(value.data.content)
    setTotalElements(value.data.totalElements)
  }

  const columns = useMemo<MRT_ColumnDef<ICompra>[]>(
    () => [
      {
        accessorKey: 'dataCompra',
        header: 'Data da compra',
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
        accessorKey: 'formaPagamento.nome',
        header: 'Forma de pagamento',
        enableSorting: true,
        enableColumnFilter: true,
        size: 10,
        minSize: 10,
        mantineTableBodyCellProps: {
          align: 'center',
        },
        mantineTableHeadCellProps: {
          align: 'center',
        },
      },
      {
        accessorKey: 'fornecedor.nomeRazaoSocial',
        header: 'Fornecedor',
        enableSorting: true,
        enableColumnFilter: true,
        size: 15,
        mantineTableBodyCellProps: {
          align: 'center',
        },
        mantineTableHeadCellProps: {
          align: 'center',
        },
      },
      {
        accessorKey: 'valorTotalCompra',
        header: 'Valor total da compra',
        enableSorting: true,
        enableColumnFilter: true,
        size: 25,
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
    ],
    []
  )

  // const visualizar = (id: number) => {
  //   api.get(`api/mercadoria/findById/${id}`).then(response => {
  //     setProduto(response.data)
  //     setOpenModal(true)
  //   })
  // }

  // const closeModalHistorico = (value: boolean) => {
  //   setOpenModalHistorico(value)
  //   setIdHistorio(null)
  // }

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

  const rowActions = ({ row }: { row: MRT_Row<ICompra> }) => (
    <Flex>
      <Tooltip label={t('pages.fornecedor.tooltip.visualizar')}>
        <ActionIcon
          size="sm"
          disabled={validatePermissionRole()}
          variant="transparent"
          aria-label="Settings"
          // onClick={() => visualizar(row.original.id!)}
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
          onClick={() => console.log(row)}
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
          'Pesquise por data da compra, forma de pagamento, fornecedor e valor total da compra'
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
          Cadastrar compra
        </Button>
      </Flex>
      <PaginationTable
        setSorting={setSorting}
        columns={columns}
        rowActions={rowActions}
        setPagination={setPagination}
        enableRowActions
        enableSorting
        enableClickToCopy={true}
        positionActionsColumn="last"
        data={dataCompra}
        state={{
          sorting,
          pagination: {
            pageIndex: filtro.pagina,
            pageSize: filtro.tamanhoPagina,
          },
        }}
        rowCount={totalElements}
      />
      <DrawerCadastroCompras
        refresh={refreshList}
        openModal={opened}
        closed={closeDrawer}
      />
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