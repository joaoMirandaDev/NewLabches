import { ModalCadastoMercadoria } from '@components/pages/especialidades/validation/schemaModal'
import { Button, Divider, Flex, Modal, NumberInput } from '@mantine/core'
import { useForm, zodResolver } from '@mantine/form'
import { useDisclosure } from '@mantine/hooks'
import { IconCircleXFilled, IconDatabasePlus } from '@tabler/icons-react'
import { useEffect } from 'react'
import IEspecialidadeMercadoria from 'src/interfaces/especialidadeCompra'
import IMercadoria from 'src/interfaces/mercadoria'
interface AdiocionalEspecialidade {
  openModal: boolean
  closeModal: (value: boolean) => void
  data: IEspecialidadeMercadoria | null
  adional: (value: IEspecialidadeMercadoria) => void
}
const ModalAdicional: React.FC<AdiocionalEspecialidade> = ({
  openModal,
  data,
  closeModal,
  adional,
}) => {
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
    if (openModal && data?.mercadoria) {
      form.setValues(data)
      open()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openModal])
  const [opened, { open, close }] = useDisclosure(false)
  const resetForm = () => {
    const dados = {
      quantidade: 0,
      mercadoria: null,
    }
    form.setValues(dados)
  }
  const fecharModal = () => {
    close()
    closeModal(false)
    resetForm()
  }
  const submit = async () => {
    if (form.isValid()) {
      adional(form.values)
      fecharModal()
    }
  }
  return (
    <Modal
      opened={opened}
      shadow={'xl'}
      zIndex={120000}
      onClose={() => close()}
      centered
      size={400}
      closeOnClickOutside={false}
      withCloseButton={false}
      radius={'md'}
      closeOnEscape={false}
      trapFocus={true}
      title={data?.mercadoria?.nome}
    >
      <form onSubmit={form.onSubmit(submit)}>
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
export default ModalAdicional
