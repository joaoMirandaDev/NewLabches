import {
  Button,
  Divider,
  Drawer,
  Flex,
  NumberInput,
  Select,
  SelectItem,
  TextInput,
  Tabs,
  Card,
  Textarea,
  Text,
  Tooltip,
  ActionIcon,
  Space,
} from '@mantine/core'
import { useEffect, useMemo, useState } from 'react'
import {
  IconCircleXFilled,
  IconDatabasePlus,
  IconEdit,
  IconMeat,
  IconPizza,
  IconTrash,
} from '@tabler/icons-react'
import api from 'src/utils/Api'
import { useForm, zodResolver } from '@mantine/form'
import { ValidateAddPedido } from './validation/schema'
import {
  EDITPEDIDO_BY_ID,
  FIND_ALL_ESPECIALIDADE,
  FIND_ALL_MERCADORIA,
  FIND_ALL_TIPO_PEDIDO,
  MERCADORIA_BY_ID,
  PEDIDO_ADD,
  PEDIDO_BY_ID_COMPLETO,
} from 'src/utils/Routes'
import ITipoPedido from 'src/interfaces/tipoPedido'
import IPedidoMercadoria from 'src/interfaces/PedidoMercadoria'
import IPedidoEspecialidade from 'src/interfaces/PedidoEspecialidade'
import { ErrorNotification, SuccessNotification } from '@components/common'
import { MRT_ColumnDef, MRT_Row } from 'mantine-react-table'
import IEspecialidadeMercadoria from 'src/interfaces/especialidadeCompra'
import SimpleTable from '@components/common/tabela/simpleTable'
import IMercadoria from 'src/interfaces/mercadoria'
import ModalPedidoEspecialidade from './especialidade/modal'
import ModalInsertMercadoria from '../mercadoria/modal'
interface DrawerPedido {
  openModal: boolean
  idCaixa: number
  idPedido: number
  closeModal: (value: boolean) => void
  refresh: (value: boolean) => void
}

const DrawerPedido: React.FC<DrawerPedido> = ({
  openModal,
  idCaixa,
  idPedido,
  closeModal,
  refresh,
}) => {
  const [tipoPedido, setTipoPedido] = useState<SelectItem[]>([])
  const [itemSelecionado, setItemSelecionado] =
    useState<IPedidoMercadoria | null>(null)
  const [idEspecialidade, setIdEspecialidade] = useState<number | null>(null)
  const [idMercadoria, setIdMercadoria] = useState<number | null>(null)
  const [modalEspecialidade, setmodalEspecialidade] = useState<boolean>(false)
  const [modalMercadoria, setmodalMercadoria] = useState<boolean>(false)
  const [especialidade, setEspecialidade] = useState<SelectItem[]>([])
  const [mercadoria, setMercadoria] = useState<SelectItem[]>([])
  const [especialidadeEdit, setEspecialidadeEdit] =
    useState<IPedidoEspecialidade | null>(null)
  useEffect(() => {
    if (openModal && idCaixa) {
      getAllMethods()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openModal, idCaixa, idPedido])

  const form = useForm<{
    id: number | null
    numeroPedido: string | null
    nomeCliente: string
    tipoPedido: {
      id: number | null
    }
    mesa: number
    observacao: string
    pago: number
    valorTotal: number
    pedidoMercadoria: IPedidoMercadoria[]
    pedidoEspecialidade: IPedidoEspecialidade[]
  }>({
    initialValues: {
      id: null,
      numeroPedido: '',
      valorTotal: 0.0,
      nomeCliente: '',
      observacao: '',
      pago: 0,
      mesa: 0,
      tipoPedido: {
        id: 0,
      },
      pedidoMercadoria: [],
      pedidoEspecialidade: [],
    },
    validate: zodResolver(ValidateAddPedido()),
  })
  const getAllMethods = async () => {
    if (idPedido) {
      await api
        .get(PEDIDO_BY_ID_COMPLETO + idPedido)
        .then(response => {
          form.setValues(response.data)
        })
        .catch(() => {
          ErrorNotification({ message: 'Erro ao buscar pedido' })
        })
      const especialidade = await api.get(FIND_ALL_ESPECIALIDADE)
      setEspecialidade(
        especialidade.data.map((data: IMercadoria) => ({
          value: data.id,
          label: data.nome,
        }))
      )
      const mercadoria = await api.get(FIND_ALL_MERCADORIA)
      setMercadoria(
        mercadoria.data.map((data: IMercadoria) => ({
          value: data.id,
          label: data.nome,
          group: data.tipo.nome,
        }))
      )
    }
    await api.get(FIND_ALL_TIPO_PEDIDO).then(response => {
      const data = response.data.map((data: ITipoPedido) => ({
        value: data.id,
        label: data.name,
      }))
      setTipoPedido(data)
    })
  }

  const resetForm = () => {
    const value = {
      id: null,
      valorTotal: 0.0,
      nomeCliente: '',
      observacao: '',
      pago: 0,
      mesa: 0,
      tipoPedido: {
        id: 0,
      },
      pedidoMercadoria: [],
      pedidoEspecialidade: [],
    }
    form.setValues(value)
  }

  const handleSubmit = async () => {
    if (form.values.valorTotal > 0) {
      if (idPedido) {
        await api
          .put(EDITPEDIDO_BY_ID, form.values)
          .then(() => {
            SuccessNotification({
              message: 'Pedido alterado com sucesso',
            })
            closeModal(true)
            resetForm()
            refresh(true)
          })
          .catch(() => {
            ErrorNotification({ message: 'Erro ao salvar pedido' })
          })
      } else {
        await api
          .post(PEDIDO_ADD + `${idCaixa}`, form.values)
          .then(() => {
            SuccessNotification({
              message: 'Pedido registrado com sucesso',
            })
            closeModal(true)
            resetForm()
            refresh(true)
          })
          .catch(() => {
            ErrorNotification({ message: 'Erro ao salvar pedido' })
          })
      }
    }
  }

  const cancelarPedido = () => {
    closeModal(false)
    resetForm()
  }

  const remove = (row: MRT_Row) => {
    const newPedidoEspecialidade = form.values.pedidoEspecialidade.filter(
      (_, index) => index !== row.index
    )

    form.setFieldValue('pedidoEspecialidade', newPedidoEspecialidade)
  }

  const removeMercadoria = (row: MRT_Row) => {
    const newPedido = form.values.pedidoMercadoria.filter(
      (_, index) => index !== row.index
    )

    form.setFieldValue('pedidoMercadoria', newPedido)
  }

  const editar = (row: IPedidoEspecialidade) => {
    setEspecialidadeEdit(row)
    setIdEspecialidade(null)
    setmodalEspecialidade(true)
  }
  const editarMercadoria = (row: IPedidoMercadoria) => {
    setItemSelecionado(row)
    setIdMercadoria(null)
    setmodalMercadoria(true)
  }

  const handleChangeMercadoria = async () => {
    console.log('clicou')
    await api.get(MERCADORIA_BY_ID + idMercadoria).then(response => {
      setItemSelecionado({ ...itemSelecionado, ['mercadoria']: response.data })
      setmodalMercadoria(true)
    })
  }

  const rowActionsMercadoria = ({
    row,
  }: {
    row: MRT_Row<IPedidoMercadoria>
  }) => (
    <Flex>
      <Tooltip label={'Editar'}>
        <ActionIcon
          size="sm"
          color="blue"
          variant="transparent"
          aria-label="Settings"
          onClick={() => editarMercadoria(row.original)}
        >
          <IconEdit style={{ cursor: 'pointer' }} />
        </ActionIcon>
      </Tooltip>
      <Tooltip label={'Remover'}>
        <ActionIcon
          size="sm"
          color="red"
          variant="transparent"
          aria-label="Settings"
          onClick={() => removeMercadoria(row)}
        >
          <IconTrash style={{ cursor: 'pointer' }} />
        </ActionIcon>
      </Tooltip>
    </Flex>
  )

  const rowActions = ({ row }: { row: MRT_Row<IPedidoEspecialidade> }) => (
    <Flex>
      <Tooltip label={'Editar especialidade'}>
        <ActionIcon
          size="sm"
          color="blue"
          variant="transparent"
          aria-label="Settings"
          onClick={() => editar(row.original)}
        >
          <IconEdit style={{ cursor: 'pointer' }} />
        </ActionIcon>
      </Tooltip>
      <Tooltip label={'Remover especialidade'}>
        <ActionIcon
          size="sm"
          color="red"
          variant="transparent"
          aria-label="Settings"
          onClick={() => remove(row)}
        >
          <IconTrash style={{ cursor: 'pointer' }} />
        </ActionIcon>
      </Tooltip>
    </Flex>
  )

  const columns = useMemo<MRT_ColumnDef<IEspecialidadeMercadoria>[]>(
    () => [
      {
        accessorKey: 'especialidade.nome',
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
        accessorKey: 'valor',
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

  const columnsMercadoria = useMemo<MRT_ColumnDef<IEspecialidadeMercadoria>[]>(
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

  const handleChangeEspecialidade = () => {
    setmodalEspecialidade(true)
  }

  const closeModalEspecialidade = () => {
    setmodalEspecialidade(false)
    setEspecialidadeEdit(null)
  }

  const closeModalMercadoria = (val: boolean) => {
    console.log(val)
    setmodalMercadoria(val)
    setItemSelecionado(null)
  }

  const objetoModalMercadoria = (event: IPedidoMercadoria) => {
    closeModalMercadoria(false)
    const index = form.values.pedidoMercadoria.findIndex(
      val => val.mercadoria?.id === event.mercadoria?.id
    )
    if (index === -1) {
      form.setFieldValue('pedidoMercadoria', [
        ...form.values.pedidoMercadoria,
        event,
      ])
    } else {
      const updatedPedidoMercadoria = form.values.pedidoMercadoria.map(
        (item, idx) =>
          idx === index ? { ...item, quantidade: event.quantidade } : item
      )
      form.setFieldValue('pedidoMercadoria', updatedPedidoMercadoria)
    }
  }

  const objetoModal = (event: IPedidoEspecialidade) => {
    closeModalEspecialidade()
    const index = form.values.pedidoEspecialidade.findIndex(
      val => val.especialidade?.id === event.especialidade?.id
    )
    if (index === -1) {
      form.setFieldValue('pedidoEspecialidade', [
        ...form.values.pedidoEspecialidade,
        event,
      ])
    } else {
      const updatedPedidoEspecialidade = form.values.pedidoEspecialidade.map(
        (item, idx) =>
          idx === index ? { ...item, quantidade: event.quantidade } : item
      )
      form.setFieldValue('pedidoEspecialidade', updatedPedidoEspecialidade)
    }
  }

  const renderTabs = () => {
    return (
      <Tabs defaultValue="especialidades">
        <Tabs.List>
          <Tabs.Tab icon={<IconPizza size="0.8rem" />} value="especialidades">
            Especialidades
          </Tabs.Tab>
          <Tabs.Tab icon={<IconMeat size="0.8rem" />} value="mercadorias">
            Mercadoria
          </Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel value="especialidades" pt="xs">
          <Flex mt={'1rem'} align={'flex-end'} w={'100%'}>
            <Select
              onChange={value => setIdEspecialidade(Number(value))}
              data={especialidade}
              withinPortal
              searchable
              w={'100%'}
              withAsterisk
              label="Selecione a especialidade"
              placeholder="Selecione a especialidade"
            />
            <Button
              leftIcon={<IconDatabasePlus />}
              onClick={() => handleChangeEspecialidade()}
              disabled={!idEspecialidade}
              ml={'0.5rem'}
              color="green"
            >
              Inserir
            </Button>
          </Flex>
          <Space h="xl" />
          <SimpleTable
            enableRowActions
            rowActions={rowActions}
            columns={columns}
            data={form.values.pedidoEspecialidade}
          />
          <ModalPedidoEspecialidade
            closeModal={closeModalEspecialidade}
            dataModal={objetoModal}
            openModal={modalEspecialidade}
            especialidadeEdit={especialidadeEdit}
            idEspecialidade={idEspecialidade}
          />
        </Tabs.Panel>
        <Tabs.Panel value="mercadorias" pt="xs">
          <Flex mt={'1rem'} align={'flex-end'} w={'100%'}>
            <Select
              onChange={value => setIdMercadoria(Number(value))}
              data={mercadoria}
              searchable
              clearable
              withinPortal
              w={'100%'}
              withAsterisk
              label="Selecione as mercadorias"
              placeholder="Selecione as mercadorias"
            />
            <Button
              leftIcon={<IconDatabasePlus />}
              onClick={() => handleChangeMercadoria()}
              disabled={!idMercadoria}
              ml={'0.5rem'}
              color="green"
            >
              Inserir
            </Button>
          </Flex>
          <Space h="xl" />
          <SimpleTable
            enableRowActions
            rowActions={rowActionsMercadoria}
            columns={columnsMercadoria}
            data={form.values.pedidoMercadoria}
          />
          <ModalInsertMercadoria
            closeModal={closeModalMercadoria}
            idMercadoria={idMercadoria}
            dataModal={objetoModalMercadoria}
            openModal={modalMercadoria}
            data={itemSelecionado}
          />
        </Tabs.Panel>
      </Tabs>
    )
  }

  return (
    <Drawer
      opened={openModal}
      onClose={close}
      position="right"
      size={'xl'}
      withinPortal
      closeOnClickOutside={false}
      withCloseButton={false}
      closeOnEscape={false}
      trapFocus={false}
      title={
        idPedido ? (
          <Text fw={'bold'}>Editar pedido n°: {form.values.numeroPedido}</Text>
        ) : (
          <Text fw={'bold'}>Cadastrar novo pedido</Text>
        )
      }
    >
      <Divider />
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Flex align={'center'} wrap={'wrap'} gap="sm" mt={'1rem'}>
          <TextInput
            {...form.getInputProps('nomeCliente')}
            value={form.values.nomeCliente}
            w={'calc(33.33% - 0.5rem)'}
            placeholder="Digite o nome do cliente"
            label="Nome do cliente"
            onChange={values =>
              form.setFieldValue('nomeCliente', values.target.value)
            }
            withAsterisk
          />
          <NumberInput
            {...form.getInputProps('mesa')}
            w={'calc(33.33% - 0.5rem)'}
            defaultValue={form.values.mesa}
            placeholder="Digite o número da mesa"
            label="Número da mesa"
            hideControls
            onChange={value => form.setFieldValue('mesa', Number(value))}
          />
          <Select
            withAsterisk
            {...form.getInputProps('tipoPedido.id')}
            label="Tipo de pedido"
            w={'calc(33.33% - 0.5rem)'}
            placeholder="Selecione o tipo de pedido"
            onChange={event =>
              form.setFieldValue('tipoPedido.id', Number(event))
            }
            withinPortal
            data={tipoPedido}
          />
        </Flex>
        <Textarea
          mt={'1rem'}
          {...form.getInputProps('observacao')}
          mb={'1rem'}
          onChange={event =>
            form.setFieldValue('observacao', event.target.value)
          }
          placeholder="observação"
          label="Observação"
        />
      </form>
      <Card mt={'1rem'} shadow="sm" radius="md" withBorder>
        {renderTabs()}
      </Card>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Flex mt={20} justify={'space-between'}>
          <Button
            leftIcon={<IconCircleXFilled />}
            color="red"
            onClick={cancelarPedido}
          >
            Cancelar
          </Button>
          <Button leftIcon={<IconDatabasePlus />} color="green" type="submit">
            Salvar
          </Button>
        </Flex>
      </form>
    </Drawer>
  )
}

export default DrawerPedido
