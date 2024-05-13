import { ErrorNotification } from '@components/common'
import { Button, Flex, Modal } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { IconArrowBarLeft } from '@tabler/icons'
import { useEffect, useState } from 'react'
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
  return (
    <Modal
      onClose={close}
      zIndex={200000000000}
      centered
      closeOnEscape={true}
      closeOnClickOutside={false}
      withCloseButton={false}
      opened={opened}
    >
      <h1>{id}</h1>
      <Flex mt={20} justify={'space-between'}>
        <Button leftIcon={<IconArrowBarLeft />} onClick={closeModal}>
          Voltar
        </Button>
      </Flex>
    </Modal>
  )
}
export default VisualizarPedidoById
