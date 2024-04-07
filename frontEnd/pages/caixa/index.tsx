import SearchBar from '@components/common/filtro/filtro-sem-remocao-caracter'
import PaginationTable from '@components/common/tabela/paginationTable'
import { Box, Button, Flex, Group, Text, Tooltip } from '@mantine/core'
import { useTranslate } from '@refinedev/core'
import { IconAlertTriangle, IconCircleCheck, IconUserPlus } from '@tabler/icons'
import {
  MRT_ColumnDef,
  MRT_PaginationState,
  MRT_SortingState,
} from 'mantine-react-table'
import { GetServerSideProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useRouter } from 'next/router'
import api from 'src/utils/Api'
import { useEffect, useMemo, useState } from 'react'
import ISearch from 'src/interfaces/search'
import { PAGE_INDEX, PAGE_SIZE } from 'src/utils/Constants'
import { CAIXA_PAGE } from 'src/utils/Routes'
import ICaixa from 'src/interfaces/Caixa'
import { IconInfoSquareRounded } from '@tabler/icons-react'

export default function Caixa() {
  const t = useTranslate()
  const navigate = useRouter()
  const [sorting, setSorting] = useState<MRT_SortingState>([
    { id: 'numeroCaixa', desc: true },
  ])
  const [data, setData] = useState<ICaixa[]>([])
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
    id: 'numero_caixa',
    desc: true,
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
    findPageCaixa()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pagination, filtro])
  useEffect(() => {
    sorting.map(value => {
      setFiltro(prevData => ({ ...prevData, id: value.id, desc: value.desc }))
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sorting])

  const findPageCaixa = async () => {
    const value = await api.post(CAIXA_PAGE, filtro)
    setData(value.data.content)
    setTotalElements(value.data.totalElements)
  }

  const filter = (value: string) => {
    if (value.length > 0) {
      setResetPesquisa(true)
    } else {
      setResetPesquisa(false)
    }
    setFiltro(prevData => ({ ...prevData, search: value, pagina: 0 }))
  }

  const columns = useMemo<MRT_ColumnDef<ICaixa>[]>(
    () => [
      {
        accessorKey: 'numeroCaixa',
        header: 'Numero do caixa',
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
            {row.original.caixaAberto == 1 && (
              <>
                <IconAlertTriangle size={16} color="red" />
                <span>{renderedCellValue}</span>
              </>
            )}
            {row.original.caixaAberto == 0 && (
              <>
                <IconCircleCheck size={16} color="green" />
                <span>{renderedCellValue}</span>
              </>
            )}
          </Box>
        ),
      },
      {
        accessorKey: 'valorAberturaCaixa',
        header: 'Saldo de Abertura',
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
        accessorKey: 'dataAbertura',
        header: 'Data de abertura',
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
        accessorKey: 'valorFechamentoCaixa',
        header: 'Saldo de fechamento',
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
        accessorKey: 'dataFechamento',
        header: 'Data de fechamento',
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
        accessorKey: 'caixaAberto',
        header: 'Status',
        enableSorting: false,
        enableClickToCopy: false,
        enableColumnFilter: false,
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
          <Box>
            {row.original.caixaAberto == 1 && <>Aberto</>}
            {row.original.caixaAberto == 0 && <>Fechado</>}
          </Box>
        ),
      },
    ],
    []
  )

  return (
    <>
      <SearchBar
        placeholder={
          'Pesquise por número do caixa, saldo de abertura, saldo de fechamento, data de abertura e data de fechamento'
        }
        clearSearch={resetPesquisa}
        textSearch={t('pages.fornecedor.buttonSearchBar')}
        icone={true}
        onDataFilter={filter}
      />
      <Flex justify={'space-between'} align={'center'} m={10}>
        <Flex align={'center'}>
          <Text fz={'1.5rem'}>Listagem caixa</Text>
          <Tooltip label="Se houver um caixa aberto, ele deverá ser fechado antes de abrir um novo.">
            <IconInfoSquareRounded
              cursor={'pointer'}
              size={'1rem'}
              style={{ marginLeft: '0.5rem' }}
            />
          </Tooltip>
        </Flex>
        <Button
          leftIcon={<IconUserPlus size={16} />}
          // disabled={validatePermissionRole()}
          onClick={() => navigate.push('fornecedor/cadastro')}
        >
          {t('pages.fornecedor.buttonCadastro')}
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
        data={data}
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
          <Text size={'sm'}>Caixa aberto |</Text>
        </Group>
        <Group position="left" align="center" mt={20} spacing={10}>
          <IconCircleCheck style={{ color: 'green' }} />
          <Text size={'sm'}> Caixa fechado </Text>
        </Group>
      </Group>
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
