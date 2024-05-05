import { ErrorNotification, SuccessNotification } from '@components/common'
import {
  Button,
  Flex,
  Group,
  Modal,
  Select,
  SelectItem,
  Text,
} from '@mantine/core'
import { useForm, zodResolver } from '@mantine/form'
import { useDisclosure } from '@mantine/hooks'
import { useEffect, useState } from 'react'
import IFormaPagamento from 'src/interfaces/formaPagamento'
import api from 'src/utils/Api'
import {
  FIND_ALL_FORMA_PAGAMENTO,
  PEDIDO_BY_ID,
  PEDIDO_PAYMENT,
} from 'src/utils/Routes'
import { schemaPayment } from './validation/schemaPayment'
import IPedido from 'src/interfaces/pedido'
import { IconCircleXFilled, IconDatabasePlus } from '@tabler/icons-react'
interface PaymentPedido {
  openModal: boolean
  idPedido: number | null
  closeModalPedido: (value: boolean) => void
  refresh: (value: boolean) => void
}
const PaymentPedido: React.FC<PaymentPedido> = ({
  openModal,
  idPedido,
  closeModalPedido,
  refresh,
}) => {
  const [opened, { open, close }] = useDisclosure(false)
  const [pedido, setPedido] = useState<IPedido | null>(null)
  const [formaPagamento, setFormaPagamento] = useState<SelectItem[]>([])
  useEffect(() => {
    if (openModal) {
      open()
      getAllMethods()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openModal, idPedido])
  const form = useForm<{
    id: number | null
  }>({
    initialValues: {
      id: 0,
    },
    validate: zodResolver(schemaPayment()),
  })
  const getAllMethods = async () => {
    await api
      .get(FIND_ALL_FORMA_PAGAMENTO)
      .then(response => {
        const data = response.data.map((data: IFormaPagamento) => ({
          value: data.id,
          label: data.nome,
        }))
        setFormaPagamento(data)
      })
      .catch(() => {
        ErrorNotification({ message: 'Erro ao buscar forma de pagamento' })
      })
    await api
      .get(PEDIDO_BY_ID + idPedido)
      .then(response => {
        setPedido(response.data)
      })
      .catch(() => {
        ErrorNotification({ message: 'Erro ao buscar pedido' })
      })
  }
  const resetForm = () => {
    const data = {
      id: 0,
    }
    form.setValues(data)
  }
  const closeModalPagamento = () => {
    close()
    closeModalPedido(true)
    resetForm()
  }
  const handleSubmit = () => {
    api
      .put(PEDIDO_PAYMENT + idPedido, form.values)
      .then(response => {
        SuccessNotification({
          message: response.data,
        })
        closeModalPagamento()
        refresh(true)
      })
      .catch(() => {
        ErrorNotification({
          message: 'Erro ao registrar pagamento!',
        })
      })
  }
  return (
    <Modal
      opened={opened}
      onClose={close}
      withCloseButton={false}
      title={'N° pedido: ' + pedido?.numeroPedido}
    >
      <Group>
        <Text fz="md">Nome do cliente: {pedido?.nomeCliente}</Text>
        <Text fz="md">
          Valor do pedido:{' '}
          {pedido?.valorTotal?.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          })}
        </Text>
      </Group>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Select
          mt={'0,5rem'}
          {...form.getInputProps('formaPagamento.id')}
          withinPortal
          onChange={event => form.setFieldValue('id', Number(event))}
          clearButtonProps={{ 'aria-label': 'Clear selection' }}
          clearable
          nothingFound="Nenhuma forma de pgamento encontrado"
          label={'Selecione uma forma de Pagamento'}
          placeholder={'Selecione uma das opções'}
          data={formaPagamento}
        />
        <Flex mt={20} justify={'space-between'}>
          <Button
            leftIcon={<IconCircleXFilled />}
            color="red"
            onClick={closeModalPagamento}
          >
            Cancelar
          </Button>
          <Button leftIcon={<IconDatabasePlus />} color="green" type="submit">
            Salvar
          </Button>
        </Flex>
      </form>
    </Modal>
  )
}
export default PaymentPedido
