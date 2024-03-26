import { Button, Divider, Flex, Modal, NumberInput } from '@mantine/core'

import { useDisclosure } from '@mantine/hooks'
import { useEffect } from 'react'
import { IconArrowBarLeft } from '@tabler/icons'
import IMercadoriaCompraDto from 'src/interfaces/mercadoriaCompraDto'
import { IconDatabasePlus } from '@tabler/icons-react'
interface ModalInsertCompras {
  openModal: boolean
  data: IMercadoriaCompraDto | null
  closeModal: (value: boolean) => void
}

const ModalInsertCompras: React.FC<ModalInsertCompras> = ({
  openModal,
  data,
  closeModal,
}) => {
  const [opened, { open, close }] = useDisclosure(false)
  const fecharModal = () => {
    closeModal(false)
    close()
  }
  useEffect(() => {
    if (openModal) {
      open()
      console.log(data)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, openModal])

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
      <Divider />
      <NumberInput
        // {...form.getInputProps('preco')}
        mt={'1rem'}
        precision={2}
        decimalSeparator=","
        thousandsSeparator="."
        // defaultValue={form.values.preco}
        placeholder={'Insira a quantidade de compra'}
        label={'Quantidade de compra'}
        withAsterisk
        hideControls
        // onChange={value => form.setFieldValue('preco', Number(value))}
        required
      />
      <NumberInput
        // {...form.getInputProps('preco')}
        mt={'1rem'}
        precision={2}
        decimalSeparator=","
        thousandsSeparator="."
        // defaultValue={form.values.preco}
        placeholder={'Insira o valor de compra'}
        label={'Valor de compra'}
        withAsterisk
        hideControls
        // onChange={value => form.setFieldValue('preco', Number(value))}
        required
      />
      <Flex mt={20} justify={'space-between'}>
        <Button leftIcon={<IconArrowBarLeft />} onClick={() => fecharModal()}>
          Voltar
        </Button>
        <Button leftIcon={<IconDatabasePlus />} type="submit" color="green">
          Inserir
        </Button>
      </Flex>
    </Modal>
  )
}

export default ModalInsertCompras
