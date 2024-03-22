import SearchBar from '@components/common/filtro/filtro-sem-remocao-caracter'
import PaginationTable from '@components/common/tabela/paginationTable'
import DrawerCadastroProduto from '@components/pages/especialidades/cadastro'
import DrawerProduto from '@components/pages/especialidades/editar/drawer'
import { ActionIcon, Button, Flex, Tooltip } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { useTranslate } from '@refinedev/core'
import { IconEye, IconMeat } from '@tabler/icons'
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
import IProduto from 'src/interfaces/produto'
import ISearch from 'src/interfaces/search'
import api from 'src/utils/Api'
import { PAGE_INDEX, PAGE_SIZE } from 'src/utils/Constants'
import { formatarCPFCNPJ, formatarTelefone } from 'src/utils/FormatterUtils'

export default function FornecedorList() {
  const t = useTranslate()
  const [openModal, setOpenModal] = useState<boolean>(false)
  const [opened, { open, close }] = useDisclosure(false)
  const [sorting, setSorting] = useState<MRT_SortingState>([])
  const [produto, setProduto] = useState<IProduto | null>(null)
  const [dataProduto, setDataProduto] = useState<IProduto[]>([])
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
    const value = await api.post('/api/produtos/list', filtro)
    value.data.content.map((value: { cpfCnpj: string; telefone: string }) => {
      value.cpfCnpj = formatarCPFCNPJ(value.cpfCnpj)
      value.telefone = formatarTelefone(value.telefone)
    })
    setDataProduto(value.data.content)
    setTotalElements(value.data.totalElements)
  }

  const columns = useMemo<MRT_ColumnDef<IProduto>[]>(
    () => [
      {
        accessorKey: 'nome',
        header: t('pages.produtos.table.nome'),
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
        accessorKey: 'categoria.nome',
        header: t('pages.produtos.table.categoria'),
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
        accessorKey: 'preco',
        header: t('pages.produtos.table.preco'),
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
        accessorKey: 'data_cadastro',
        header: t('pages.produtos.table.data'),
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
    api.get(`api/produtos/findById/${id}`).then(response => {
      setProduto(response.data)
      setOpenModal(true)
    })
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

  const rowActions = ({ row }: { row: MRT_Row<IProduto> }) => (
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
    </Flex>
  )

  return (
    <>
      <SearchBar
        placeholder={t('pages.produtos.placeHoldeSearchBar')}
        clearSearch={resetPesquisa}
        textSearch={t('pages.produtos.buttonSearchBar')}
        icone={true}
        onDataFilter={filterCliente}
      />
      <Flex justify={'flex-end'} m={10}>
        <Button
          leftIcon={<IconMeat size={16} />}
          disabled={validatePermissionRole()}
          onClick={() => open()}
        >
          {t('pages.produtos.buttonCadastro')}
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
        data={dataProduto}
        state={{
          sorting,
          pagination: {
            pageIndex: filtro.pagina,
            pageSize: filtro.tamanhoPagina,
          },
        }}
        rowCount={totalElements}
      />
      <DrawerProduto
        close={closeDrawerVisual}
        refresDrawerVisualizar={refresDrawerVisualizar}
        openModal={openModal}
        dataProduto={produto}
      />
      <DrawerCadastroProduto
        refresh={refreshList}
        openModal={opened}
        close={closeDrawer}
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
