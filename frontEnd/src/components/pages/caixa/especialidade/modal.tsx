import { Button, Divider, Flex, Modal, NumberInput } from '@mantine/core'

import { useDisclosure } from '@mantine/hooks'
import { useEffect } from 'react'
import { IconCircleXFilled, IconDatabasePlus } from '@tabler/icons-react'
import { useForm, zodResolver } from '@mantine/form'
import api from 'src/utils/Api'
import { ValidateAddPedidoEspecialidade } from '../validation/schemaModalEspecialidade'
import { PRODUTO_BY_ID } from 'src/utils/Routes'
import IEspecialidade from 'src/interfaces/Especialidade'
import IPedidoEspecialidade from 'src/interfaces/PedidoEspecialidade'
interface ModalPedidoEspecialidade {
  openModal: boolean
  closeModal: (value: boolean) => void
  idEspecialidade: number | null
  especialidadeEdit: IPedidoEspecialidade | null
  dataModal: (value: IPedidoEspecialidade) => void
}

const ModalPedidoEspecialidade: React.FC<ModalPedidoEspecialidade> = ({
  openModal,
  idEspecialidade,
  especialidadeEdit,
  closeModal,
  dataModal,
}) => {
  const [opened, { open, close }] = useDisclosure(false)
  const form = useForm<{
    id: number | null
    especialidade: IEspecialidade
    quantidade: number
    valor: number
  }>({
    initialValues: {
      id: null,
      especialidade: {},
      quantidade: 0,
      valor: 0,
    },
    validate: zodResolver(ValidateAddPedidoEspecialidade()),
  })
  useEffect(() => {
    resetForm()
    if (especialidadeEdit) {
      form.setValues(especialidadeEdit)
    }
    if (openModal) {
      open()
      api
        .get(
          PRODUTO_BY_ID +
            `${
              especialidadeEdit
                ? especialidadeEdit.especialidade?.id
                : idEspecialidade
            }`
        )
        .then(response => {
          form.setFieldValue('especialidade', response.data)
          form.setFieldValue('valor', response.data.preco)
        })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, openModal, especialidadeEdit])
  const resetForm = () => {
    const dados = {
      id: null,
      especialidade: {},
      quantidade: 0,
      valor: 0,
    }
    form.setValues(dados)
  }
  const fecharModal = () => {
    closeModal(false)
    // setCheckAdicional(false)
    resetForm()
    close()
  }
  const handleSubmit = async () => {
    if (form.isValid()) {
      dataModal(form.values)
      fecharModal()
      // setClearAdicional(true)
    }
    resetForm()
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
      title={form.values.especialidade.nome}
    >
      <Divider />

      <form onSubmit={form.onSubmit(handleSubmit)}>
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
        <NumberInput
          {...form.getInputProps('valor')}
          mt={'1rem'}
          precision={2}
          decimalSeparator=","
          thousandsSeparator="."
          defaultValue={form.values.valor}
          placeholder={'Insira o valor'}
          label={'Valor'}
          withAsterisk
          hideControls
          onChange={value => form.setFieldValue('valor', Number(value))}
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

export default ModalPedidoEspecialidade
