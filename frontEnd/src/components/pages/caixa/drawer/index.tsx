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
import { ValidateAddPedido } from '../validation/schema'
import { FIND_ALL_TIPO_PEDIDO } from 'src/utils/Routes'
import ITipoPedido from 'src/interfaces/tipoPedido'
import PedidoMercadoria from './mercadoria'
import IEspecialidadeMercadoria from 'src/interfaces/especialidadeCompra'
import PedidoEspecialidade from './especialidade'
interface DrawerPedido {
  openModal: boolean
  idCaixa: number
  closeModal: (value: boolean) => void
}

const DrawerPedido: React.FC<DrawerPedido> = ({
  openModal,
  idCaixa,
  closeModal,
}) => {
  const [tipoPedido, setTipoPedido] = useState<SelectItem[]>([])
  useEffect(() => {
    if (openModal) {
      getAllMethods()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openModal, idCaixa])
  const form = useForm<{
    id: number | null
    nome: string
    mesa: number
    tipoPedido: {
      id: number | null
    }
  }>({
    initialValues: {
      id: null,
      nome: '',
      mesa: 0,
      tipoPedido: {
        id: null,
      },
    },
    validate: zodResolver(ValidateAddPedido()),
  })
  const getAllMethods = async () => {
    await api.get(FIND_ALL_TIPO_PEDIDO).then(response => {
      const data = response.data.map((data: ITipoPedido) => ({
        value: data.id,
        label: data.name,
      }))
      setTipoPedido(data)
    })
  }

  const setConfirmacao = () => {
    closeModal(false)
  }

  const listMercadoria = (value: IEspecialidadeMercadoria[]) => {
    console.log(value, 'dados no drawer')
  }

  const cancelarPedido = () => {
    closeModal(false)
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
          <PedidoEspecialidade listMercadoria={listMercadoria} />
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
      <Flex align={'center'} wrap={'wrap'} gap="sm" mt={'1rem'}>
        <TextInput
          {...form.getInputProps('nome')}
          value={form.values.nome}
          w={'calc(33.33% - 0.5rem)'}
          placeholder="Digite o nome do cliente"
          label="Nome do cliente"
          onChange={values => form.setFieldValue('nome', values.target.value)}
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
          label="Tipo de pedido"
          w={'calc(33.33% - 0.5rem)'}
          placeholder="Selecione o tipo de pedido"
          onChange={event => form.setFieldValue('tipoPedido.id', Number(event))}
          withinPortal
          data={tipoPedido}
        />
      </Flex>
      <Textarea
        mt={'1rem'}
        mb={'1rem'}
        placeholder="observação"
        label="Observação"
      />
      <Card mt={'1rem'} shadow="sm" radius="md" withBorder>
        {renderTabs()}
      </Card>
      <Flex mt={20} justify={'space-between'}>
        <Button
          leftIcon={<IconCircleXFilled />}
          color="red"
          onClick={cancelarPedido}
        >
          Cancelar
        </Button>
        <Button
          leftIcon={<IconDatabasePlus />}
          color="green"
          onClick={setConfirmacao}
        >
          Salvar
        </Button>
      </Flex>
    </Drawer>
  )
}

export default DrawerPedido
