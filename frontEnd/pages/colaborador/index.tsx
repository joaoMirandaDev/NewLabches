import { ErrorNotification, SuccessNotification } from '@components/common'
import SearchBar from '@components/common/filtro'
import PaginationTable from '@components/common/tabela/paginationTable'
import ModalColaborador from '@components/pages/colaborador/modal'
import { ActionIcon, Button, Flex, Tooltip } from '@mantine/core'
import { useTranslate } from '@refinedev/core'
import { IconEdit, IconEye, IconTrash, IconUserPlus } from '@tabler/icons'
import Cookies from 'js-cookie'
import {
  MRT_ColumnDef,
  MRT_PaginationState,
  MRT_Row,
  MRT_SortingState,
} from 'mantine-react-table'
import { GetServerSideProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useRouter } from 'next/router'
import { useEffect, useMemo, useState } from 'react'
import IColaborador from 'src/interfaces/colaborador'
import ISearch from 'src/interfaces/search'
import api from 'src/utils/Api'
import { PAGE_INDEX, PAGE_SIZE } from 'src/utils/Constants'
import { formatarCPFCNPJ, formatarTelefone } from 'src/utils/FormatterUtils'

export default function ColaboradorList() {
  const t = useTranslate()
  const navigate = useRouter()
  const [openModal, setOpenModal] = useState<boolean>(false)
  const [idCliente, setIdCliente] = useState<number>(0)
  const [sorting, setSorting] = useState<MRT_SortingState>([])
  const [dataCliente, setDataCliente] = useState<IColaborador[]>([])
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
    findAllColaborador()
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
    setFiltro(prevData => ({ ...prevData, search: value, pagina: 0 }))
  }

  const findAllColaborador = async () => {
    const value = await api.post('/api/colaborador/list', filtro)
    value.data.content.map((value: { cpf: string; telefone: string }) => {
      value.cpf = formatarCPFCNPJ(value.cpf)
      value.telefone = formatarTelefone(value.telefone)
    })
    setDataCliente(value.data.content)
    setTotalElements(value.data.totalElements)
  }
  const deleteColaboradorById = async (id: number) => {
    setIdCliente(id)
    setOpenModal(true)
  }

  const confirmaExclusao = async (confirm: boolean) => {
    if (idCliente && confirm) {
      api
        .delete(`/api/colaborador/deleteById/${idCliente}`)
        .then(response => {
          SuccessNotification({ message: response.data })
          findAllColaborador()
          setOpenModal(false)
        })
        .catch(error => {
          ErrorNotification({ message: error })
        })
    } else {
      setOpenModal(false)
    }
  }

  const validatePermissionRole = () => {
    if (Cookies.get('role') == 'CAIXA') {
      return true
    }
  }

  const columns = useMemo<MRT_ColumnDef<IColaborador>[]>(
    () => [
      {
        accessorKey: 'nome',
        header: t('pages.colaborador.table.nome'),
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
        accessorKey: 'cpf',
        header: t('pages.colaborador.table.cpf'),
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
        accessorKey: 'telefone',
        header: t('pages.colaborador.table.telefone'),
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
    navigate.push(`colaborador/visualizar/${id}`)
  }

  const editar = (id: number) => {
    navigate.push(`colaborador/editar/${id}`)
  }

  const rowActions = ({ row }: { row: MRT_Row<IColaborador> }) => (
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
      <Tooltip label={t('pages.fornecedor.tooltip.editar')}>
        <ActionIcon
          disabled={validatePermissionRole()}
          size="sm"
          variant="transparent"
          aria-label="Settings"
          onClick={() => editar(row.original.id!)}
        >
          <IconEdit />
        </ActionIcon>
      </Tooltip>
      <Tooltip label={t('pages.fornecedor.tooltip.excluir')}>
        <ActionIcon
          disabled={validatePermissionRole()}
          size="sm"
          variant="transparent"
          aria-label="Settings"
          onClick={() => deleteColaboradorById(row.original.id!)}
        >
          <IconTrash />
        </ActionIcon>
      </Tooltip>
    </Flex>
  )

  return (
    <>
      <SearchBar
        placeholder={t('pages.colaborador.placeHoldeSearchBar')}
        clearSearch={resetPesquisa}
        textSearch={t('pages.fornecedor.buttonSearchBar')}
        icone={true}
        onDataFilter={filterCliente}
      />
      <Flex justify={'flex-end'} m={10}>
        <Button
          disabled={validatePermissionRole()}
          leftIcon={<IconUserPlus size={16} />}
          onClick={() => navigate.push('colaborador/cadastro')}
        >
          {t('pages.colaborador.buttonCadastro')}
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
        data={dataCliente}
        state={{
          sorting,
          pagination: {
            pageIndex: filtro.pagina,
            pageSize: filtro.tamanhoPagina,
          },
        }}
        rowCount={totalElements}
      />
      <ModalColaborador
        openModal={openModal}
        title={t('pages.colaborador.modal.title')}
        textExclusao={t('pages.colaborador.modal.text')}
        idCliente={idCliente}
        confirmaExclusao={confirmaExclusao}
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
