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
} from '@mantine/core'
import { useEffect, useState } from 'react'
import {
  IconCircleXFilled,
  IconDatabasePlus,
  IconMeat,
  IconPizza,
} from '@tabler/icons-react'
import api from 'src/utils/Api'
import { useForm, zodResolver } from '@mantine/form'
import { ValidateAddPedido } from './validation/schema'
import { FIND_ALL_TIPO_PEDIDO, PEDIDO_ADD } from 'src/utils/Routes'
import ITipoPedido from 'src/interfaces/tipoPedido'
import PedidoMercadoria from './mercadoria'
import PedidoEspecialidade from './especialidade'
import IPedidoMercadoria from 'src/interfaces/PedidoMercadoria'
import IPedidoEspecialidade from 'src/interfaces/PedidoEspecialidade'
import { ErrorNotification, SuccessNotification } from '@components/common'
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
  const [totalEspecialidade, setTotalEspecialidade] = useState<number>(0)
  const [totalMercadoria, setTotalMercadoria] = useState<number>(0)
  const [tipoPedido, setTipoPedido] = useState<SelectItem[]>([])
  useEffect(() => {
    if (openModal && idCaixa) {
      getAllMethods()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openModal, idCaixa, idPedido])

  useEffect(() => {
    form.setFieldValue('valorTotal', totalEspecialidade + totalMercadoria)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [totalEspecialidade, totalMercadoria])

  const form = useForm<{
    id: number | null
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

  const listEspecialidade = (value: IPedidoEspecialidade[]) => {
    const especialidade = value.reduce((total, obj) => {
      if (obj) {
        return total + obj.valor! * obj.quantidade!
      }
      return 0
    }, 0)
    setTotalEspecialidade(especialidade)
    form.setFieldValue('pedidoEspecialidade', value)
  }

  const listMercadoria = (value: IPedidoMercadoria[]) => {
    const mercadoria = value.reduce((total, obj) => {
      if (obj) {
        return total + obj.mercadoria!.valorVenda! * obj.quantidade!
      }
      return 0
    }, 0)
    setTotalMercadoria(mercadoria)
    form.setFieldValue('pedidoMercadoria', value)
  }

  const cancelarPedido = () => {
    closeModal(false)
    resetForm()
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
          <PedidoEspecialidade listEspecialidade={listEspecialidade} />
        </Tabs.Panel>
        <Tabs.Panel value="mercadorias" pt="xs">
          <PedidoMercadoria listMercadoria={listMercadoria} />
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
      title={'Cadastro de pedidos'}
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
