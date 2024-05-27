import { Button, Divider, Flex, Modal, NumberInput } from '@mantine/core'

import { useDisclosure } from '@mantine/hooks'
import { useEffect } from 'react'
import { IconCircleXFilled, IconDatabasePlus } from '@tabler/icons-react'
import { useForm, zodResolver } from '@mantine/form'
import IMercadoria from 'src/interfaces/mercadoria'
import IPedidoMercadoria from 'src/interfaces/PedidoMercadoria'
import { ModalCadastoMercadoria } from '@components/pages/especialidades/validation/schemaModal'
interface ModalInsertMercadoria {
  openModal: boolean
  data: IPedidoMercadoria | null
  idMercadoria: number | null
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
    id: number | null
    quantidade: number
    mercadoria: IMercadoria | null
  }>({
    initialValues: {
      id: null,
      quantidade: 0,
      mercadoria: null,
    },
    validate: zodResolver(ModalCadastoMercadoria()),
  })
  useEffect(() => {
    if (openModal && data) {
      form.setValues(data)
      open()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openModal])

  const resetForm = () => {
    const dados = {
      id: null,
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
      title={
        data?.mercadoria?.nome
          ? data?.mercadoria?.nome
          : form.values.mercadoria?.nome
      }
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
