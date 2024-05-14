import { ErrorNotification } from '@components/common'
import SimpleTable from '@components/common/tabela/simpleTable'
import { Button, Card, Flex, Group, Modal, Tabs, Text } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { IconArrowBarLeft, IconMeat, IconPizza } from '@tabler/icons'
import { MRT_ColumnDef, MRT_Row } from 'mantine-react-table'
import { useEffect, useMemo, useState } from 'react'
import IPedidoEspecialidade from 'src/interfaces/PedidoEspecialidade'
import IPedidoMercadoria from 'src/interfaces/PedidoMercadoria'
import IPedido from 'src/interfaces/pedido'
import api from 'src/utils/Api'
import { PEDIDO_BY_ID_COMPLETO } from 'src/utils/Routes'
interface VisualizarPedidoById {
  id: number
  openModal: boolean
  closed: (value: boolean) => void
}

const VisualizarPedidoById: React.FC<VisualizarPedidoById> = ({
  id,
  openModal,
  closed,
}) => {
  const [opened, { open, close }] = useDisclosure(false)
  const [dataPedido, setDataPedido] = useState<IPedido | null>(null)
  const closeModal = () => {
    close()
    closed(true)
  }
  const columns = useMemo<MRT_ColumnDef<IPedidoEspecialidade>[]>(
    () => [
      {
        accessorKey: 'especialidade.nome',
        header: 'Nome',
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
        accessorKey: 'especialidade.preco',
        header: 'Preço',
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
        accessorKey: 'quantidade',
        header: 'Quantidade',
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
            : cell.getValue<number>().toFixed(2),
      },
      {
        accessorKey: 'especialidade.categoria.nome',
        header: 'Tipo',
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
    ],
    []
  )
  const columnsMercadoria = useMemo<MRT_ColumnDef<IPedidoMercadoria>[]>(
    () => [
      {
        accessorKey: 'mercadoria.nome',
        header: 'Nome',
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
        accessorKey: 'mercadoria.valorVenda',
        header: 'Preço',
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
        accessorKey: 'quantidade',
        header: 'Quantidade',
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
            : cell.getValue<number>().toFixed(2),
      },
      {
        accessorKey: 'mercadoria.tipo.nome',
        header: 'Tipo',
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
    ],
    []
  )
  const getPedido = () => {
    api
      .get(PEDIDO_BY_ID_COMPLETO + id)
      .then(response => {
        setDataPedido(response.data)
      })
      .catch(() => {
        ErrorNotification({ message: 'Erro ao buscar pedido' })
      })
  }
  useEffect(() => {
    if (openModal) {
      getPedido()
      open()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openModal])
  const tabList = () => {
    const especialidadeMaiorQueZero =
      dataPedido && dataPedido?.pedidoEspecialidade!.length > 0
    const mercadoriaMaiorQueZero =
      dataPedido && dataPedido?.pedidoMercadoria!.length > 0

    if (especialidadeMaiorQueZero && mercadoriaMaiorQueZero) {
      return 'especialidades'
    } else if (!especialidadeMaiorQueZero && mercadoriaMaiorQueZero) {
      return 'mercadorias'
    } else if (especialidadeMaiorQueZero && !mercadoriaMaiorQueZero) {
      return 'especialidades'
    }
  }
  const renderDetail = ({ row }: { row: MRT_Row<IPedidoEspecialidade> }) => {
    if (
      row.original.adicionalEspecialidades &&
      row.original.adicionalEspecialidades?.length > 0
    ) {
      return row.original.adicionalEspecialidades?.map(obj => (
        <Group key={obj.id} ml={'1rem'}>
          <Text fw={'bold'}>Adicional: {obj.mercadoria?.nome}</Text>
          <Text fw={'bold'}>|</Text>
          <Text fw={'bold'}>Quantidade: {obj.quantidade?.toFixed(2)}</Text>
          <Text fw={'bold'}>|</Text>
          <Text fw={'bold'}>
            Preço:{' '}
            {obj.mercadoria?.valorVenda
              ? obj.mercadoria?.valorVenda.toLocaleString('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                })
              : '-'}
          </Text>
        </Group>
      ))
    }
    return (
      <Text fw={'bold'} ml={'1rem'}>
        Sem adicionais
      </Text>
    )
  }
  const renderTabs = () => {
    return (
      <Tabs defaultValue={tabList()}>
        <Tabs.List>
          {dataPedido?.pedidoEspecialidade &&
            dataPedido?.pedidoEspecialidade.length > 0 && (
              <Tabs.Tab
                icon={<IconPizza size="0.8rem" />}
                value="especialidades"
              >
                Especialidades
              </Tabs.Tab>
            )}
          {dataPedido?.pedidoMercadoria &&
            dataPedido?.pedidoMercadoria?.length > 0 && (
              <Tabs.Tab icon={<IconMeat size="0.8rem" />} value="mercadorias">
                Mercadoria
              </Tabs.Tab>
            )}
        </Tabs.List>
        <Tabs.Panel value="especialidades" pt="xs">
          <SimpleTable
            renderDetailPanel={renderDetail}
            columns={columns}
            data={
              dataPedido?.pedidoEspecialidade
                ? dataPedido?.pedidoEspecialidade
                : []
            }
          />
        </Tabs.Panel>
        <Tabs.Panel value="mercadorias" pt="xs">
          <SimpleTable
            columns={columnsMercadoria}
            data={
              dataPedido?.pedidoMercadoria ? dataPedido?.pedidoMercadoria : []
            }
          />
        </Tabs.Panel>
      </Tabs>
    )
  }
  return (
    <Modal
      onClose={close}
      centered
      size={'xl'}
      closeOnEscape={true}
      closeOnClickOutside={false}
      withCloseButton={false}
      opened={opened}
    >
      <Flex align={'center'} justify={'center'}>
        <Text fw={700}>{dataPedido?.nomeCliente}</Text>
      </Flex>
      <Flex direction={'column'}>
        <Text fw={700}>N° do pedido: {dataPedido?.numeroPedido}</Text>
        <Text fw={700}>Tipo do pedido: {dataPedido?.tipoPedido?.name}</Text>
        <Text fw={700}>
          Status: {dataPedido?.pago == 0 ? 'Aberto' : 'Pago'}
        </Text>
      </Flex>
      <Card mt={'1rem'} shadow="sm" radius="md" withBorder>
        {renderTabs()}
      </Card>
      <Flex justify={'flex-end'}>
        <Text fw={700} mt={'0.5rem'} color="green">
          Valor do pedido:{' '}
          {dataPedido?.valorTotal
            ? dataPedido?.valorTotal.toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              })
            : ' - '}
        </Text>
      </Flex>
      <Flex mt={20} justify={'space-between'}>
        <Button leftIcon={<IconArrowBarLeft />} onClick={closeModal}>
          Voltar
        </Button>
      </Flex>
    </Modal>
  )
}
export default VisualizarPedidoById
