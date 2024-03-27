import { Button, Divider, Flex, Modal, NumberInput } from '@mantine/core'

import { useDisclosure } from '@mantine/hooks'
import { useEffect } from 'react'
import { IconCircleXFilled, IconDatabasePlus } from '@tabler/icons-react'
import { useForm, zodResolver } from '@mantine/form'
import { ModalCadastoCompra } from '../validation/schemaModal'
import IItemCompra from 'src/interfaces/compras/itensCompra'
import IMercadoria from 'src/interfaces/mercadoria'
interface ModalInsertCompras {
  openModal: boolean
  data: IMercadoria | null
  closeModal: (value: boolean) => void
  dataModal: (value: IItemCompra) => void
}

const ModalInsertCompras: React.FC<ModalInsertCompras> = ({
  openModal,
  data,
  closeModal,
  dataModal,
}) => {
  const [opened, { open, close }] = useDisclosure(false)
  const form = useForm<{
    quantidade: number
    mercadoria: IMercadoria | null
    valorCompra: number
  }>({
    initialValues: {
      quantidade: 0,
      mercadoria: null,
      valorCompra: 0,
    },
    validate: zodResolver(ModalCadastoCompra()),
  })
  const fecharModal = () => {
    closeModal(false)
    close()
  }
  useEffect(() => {
    if (openModal && data) {
      open()
      form.setFieldValue('mercadoria', data)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, openModal])

  const handleSubmit = async () => {
    if (form.isValid()) {
      dataModal(form.values)
      closeModal(false)
      close()
    }
  }

  return (
    <Modal
      opened={opened}
      shadow={'xl'}
      zIndex={100000}
      onClose={close}
      centered
      size={400}
      closeOnClickOutside={false}
      withCloseButton={false}
      radius={'md'}
      closeOnEscape={false}
      trapFocus={true}
      title={data?.nome}
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
          placeholder={'Insira a quantidade de compra'}
          label={'Quantidade de compra'}
          withAsterisk
          hideControls
          onChange={value => form.setFieldValue('quantidade', Number(value))}
          required
        />
        <NumberInput
          {...form.getInputProps('valorCompra')}
          mt={'1rem'}
          precision={2}
          decimalSeparator=","
          thousandsSeparator="."
          defaultValue={form.values.valorCompra}
          placeholder={'Insira o valor de compra'}
          label={'Valor de compra'}
          withAsterisk
          hideControls
          onChange={value => form.setFieldValue('valorCompra', Number(value))}
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
            Inserir
          </Button>
        </Flex>
      </form>
    </Modal>
  )
}

export default ModalInsertCompras
