import { Button, Flex, Modal } from '@mantine/core'

import { useDisclosure } from '@mantine/hooks'
import api from 'src/utils/Api'
import { useEffect, useMemo, useState } from 'react'
import ISearch from 'src/interfaces/search'
import IMercadoriaCompra from 'src/interfaces/MercadoriaCompras'
import PaginationTable from '@components/common/tabela/paginationTable'
import {
  MRT_ColumnDef,
  MRT_PaginationState,
  MRT_SortingState,
} from 'mantine-react-table'
import { PAGE_INDEX, PAGE_SIZE } from 'src/utils/Constants'
import { IconArrowBarLeft } from '@tabler/icons'
interface ModalHistoricoMercadoria {
  openModal: boolean
  id: number
  closeHistorico: (value: boolean) => void
}

const ModalHistoricoMercadoria: React.FC<ModalHistoricoMercadoria> = ({
  openModal,
  id,
  closeHistorico,
}) => {
  const [opened, { open, close }] = useDisclosure(false)
  const [sorting, setSorting] = useState<MRT_SortingState>([])
  const [totalElements, setTotalElements] = useState<number>(0)
  const [pagination, setPagination] = useState<MRT_PaginationState>({
    pageIndex: PAGE_INDEX,
    pageSize: PAGE_SIZE,
  })
  const [filtro, setFiltro] = useState<ISearch>({
    search: '',
    pagina: 0,
    tamanhoPagina: 10,
    id: 'data',
    desc: false,
  })

  const [data, setData] = useState<IMercadoriaCompra[]>([])
  useEffect(() => {
    if (openModal) {
      open()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, openModal])

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
    getMerdoriasCompra()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pagination, filtro])

  const getMerdoriasCompra = async () => {
    const dados = await api.post(`api/merdoriasCompra/list/${id}`, filtro)
    console.log(dados)
    setTotalElements(dados.data.totalElements)
    setData(dados.data.content)
  }

  const fecharModal = () => {
    close()
    closeHistorico(false)
  }

  const columns = useMemo<MRT_ColumnDef<IMercadoriaCompra>[]>(
    () => [
      {
        accessorFn: row =>
          `${row.quantidade?.toLocaleString('pt-BR', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })} ${row.unidadeMedida?.nome}`,
        accessorKey: 'quantidade',
        header: 'Quantidade',
        enableSorting: true,
        enableColumnFilter: true,
        size: 10,
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
        accessorKey: 'valorFinalUnitario',
        header: 'Valor unitário',
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
        accessorKey: 'valorCompra',
        header: 'Valor de compra',
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
        accessorKey: 'data',
        header: 'Data de compra',
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
    []
  )

  return (
    <Modal
      opened={opened}
      onClose={close}
      centered
      size={800}
      closeOnClickOutside={false}
      withCloseButton={false}
      radius={'md'}
      closeOnEscape={false}
      trapFocus={false}
      title={'Histórico'}
    >
      <PaginationTable
        setSorting={setSorting}
        columns={columns}
        setPagination={setPagination}
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
      <Flex mt={20} justify={'flex-start'}>
        <Button leftIcon={<IconArrowBarLeft />} onClick={() => fecharModal()}>
          Voltar
        </Button>
      </Flex>
    </Modal>
  )
}

export default ModalHistoricoMercadoria
