import { ErrorNotification, SuccessNotification } from '@components/common'
import { Button, Flex, Group, Modal, Text } from '@mantine/core'
import { useForm, zodResolver } from '@mantine/form'
import { useDisclosure } from '@mantine/hooks'
import { useEffect, useState } from 'react'
import api from 'src/utils/Api'
import { DELETE_BY_ID, PEDIDO_BY_ID } from 'src/utils/Routes'
import { schemaPayment } from './validation/schemaPayment'
import IPedido from 'src/interfaces/pedido'
import { IconCircleXFilled, IconDatabaseX } from '@tabler/icons-react'
interface DeletePedido {
  openModal: boolean
  idPedido: number | null
  closeModalPedido: (value: boolean) => void
  refresh: (value: boolean) => void
}
const DeletePedido: React.FC<DeletePedido> = ({
  openModal,
  idPedido,
  closeModalPedido,
  refresh,
}) => {
  const [opened, { open, close }] = useDisclosure(false)
  const [pedido, setPedido] = useState<IPedido | null>(null)
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
    refresh(true)
  }
  const deleteById = () => {
    api
      .delete(DELETE_BY_ID + idPedido)
      .then(response => {
        SuccessNotification({
          message: response.data,
        })
        closeModalPagamento()
      })
      .catch(() => {
        ErrorNotification({
          message: 'Erro ao deletar pedido!',
        })
      })
  }
  return (
    <Modal
      opened={opened}
      onClose={close}
      centered
      withCloseButton={false}
      title="Deletar pedido"
    >
      <Group>
        <Text fz="md">Deseja excluir este pedido: {pedido?.numeroPedido}</Text>
      </Group>
      <Flex mt={20} justify={'space-between'}>
        <Button
          leftIcon={<IconCircleXFilled />}
          color="red"
          onClick={closeModalPagamento}
        >
          Cancelar
        </Button>
        <Button leftIcon={<IconDatabaseX />} color="green" onClick={deleteById}>
          Deletar
        </Button>
      </Flex>
    </Modal>
  )
}
export default DeletePedido
