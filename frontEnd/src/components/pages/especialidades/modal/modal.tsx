import { Button, Divider, Flex, Modal, NumberInput } from '@mantine/core'

import { useDisclosure } from '@mantine/hooks'
import { useEffect } from 'react'
import { IconCircleXFilled, IconDatabasePlus } from '@tabler/icons-react'
import { useForm, zodResolver } from '@mantine/form'
import { ModalCadastoMercadoria } from '../validation/schemaModal'
import IMercadoria from 'src/interfaces/mercadoria'
import IPedidoMercadoria from 'src/interfaces/PedidoMercadoria'
interface ModalInsertMercadoria {
  openModal: boolean
  data: IPedidoMercadoria | null
  closeModal: (value: boolean) => void
  dataModal: (value: IPedidoMercadoria) => void
}

const ModalInsertMercadoria: React.FC<ModalInsertMercadoria> = ({
  openModal,
  data,
  closeModal,
  dataModal,
}) => {
  const [opened, { open, close }] = useDisclosure(false)
  const form = useForm<{
    quantidade: number
    mercadoria: IMercadoria | null
  }>({
    initialValues: {
      quantidade: 0,
      mercadoria: null,
    },
    validate: zodResolver(ModalCadastoMercadoria()),
  })
  useEffect(() => {
    if (openModal && data) {
      open()
      form.setValues(data)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, openModal])
  const resetForm = () => {
    const dados = {
      quantidade: 0,
      mercadoria: null,
    }
    form.setValues(dados)
  }
  const fecharModal = () => {
    closeModal(false)
    resetForm()
    close()
  }
  const handleSubmit = async () => {
    if (form.isValid()) {
      dataModal(form.values)
      resetForm()
      closeModal(false)
      close()
    }
  }

  return (
    <Modal
      opened={opened}
      shadow={'xl'}
      zIndex={120000}
      onClose={close}
      centered
      size={400}
      closeOnClickOutside={false}
      withCloseButton={false}
      radius={'md'}
      closeOnEscape={false}
      trapFocus={true}
      title={data?.mercadoria?.nome}
    >
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Divider />
        <NumberInput
          {...form.getInputProps('quantidade')}
          mt={'1rem'}
          precision={2}
          decimalSeparator=","
          thousandsSeparator="."
          defaultValue={form.values.quantidade}
          placeholder={'Insira a quantidade'}
          label={'Quantidade'}
          withAsterisk
          hideControls
          onChange={value => form.setFieldValue('quantidade', Number(value))}
          required
        />
        <Flex mt={20} justify={'space-between'}>
          <Button
            color="red"
            leftIcon={<IconCircleXFilled />}
            onClick={() => fecharModal()}
          >
            Cancelar
          </Button>
          <Button leftIcon={<IconDatabasePlus />} type="submit" color="green">
            Salvar
          </Button>
        </Flex>
      </form>
    </Modal>
  )
}

export default ModalInsertMercadoria
