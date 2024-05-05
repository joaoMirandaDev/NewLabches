import {
  ActionIcon,
  Button,
  Card,
  Checkbox,
  Divider,
  Flex,
  Modal,
  NumberInput,
  Tooltip,
} from '@mantine/core'

import { useDisclosure } from '@mantine/hooks'
import { useEffect, useMemo, useState } from 'react'
import {
  IconCircleXFilled,
  IconDatabasePlus,
  IconTrash,
} from '@tabler/icons-react'
import { useForm, zodResolver } from '@mantine/form'
import api from 'src/utils/Api'
import IEspecialidadeMercadoria from 'src/interfaces/especialidadeCompra'
import { ValidateAddPedidoEspecialidade } from '../validation/schemaModalEspecialidade'
import SimpleTable from '@components/common/tabela/simpleTable'
import { PRODUTO_BY_ID } from 'src/utils/Routes'
import { MRT_ColumnDef, MRT_Row } from 'mantine-react-table'
import Adicional from '../adicional'
import IEspecialidade from 'src/interfaces/Especialidade'
import IAdicional from 'src/interfaces/IAdicional'
interface ModalPedidoEspecialidade {
  openModal: boolean
  closeModal: (value: boolean) => void
  idEspecialidade: number | null
  dataModal: (value: IEspecialidadeMercadoria) => void
}

const ModalPedidoEspecialidade: React.FC<ModalPedidoEspecialidade> = ({
  openModal,
  idEspecialidade,
  closeModal,
  dataModal,
}) => {
  const [opened, { open, close }] = useDisclosure(false)
  const [checkAdicional, setCheckAdicional] = useState<boolean>(false)
  const [clearAdicional, setClearAdicional] = useState<boolean>(false)
  const [dataIngrediente, setDataIngrediente] = useState<
    IEspecialidadeMercadoria[]
  >([])
  const form = useForm<{
    especialidade: IEspecialidade
    quantidade: number
    valor: number
    adicionalEspecialidades: IAdicional[]
  }>({
    initialValues: {
      especialidade: {},
      quantidade: 0,
      valor: 0,
      adicionalEspecialidades: [],
    },
    validate: zodResolver(ValidateAddPedidoEspecialidade()),
  })
  useEffect(() => {
    if (openModal) {
      open()
      api.get(PRODUTO_BY_ID + `${idEspecialidade}`).then(response => {
        setDataIngrediente(response.data.especialidadeMercadoria)
        form.setFieldValue('especialidade', response.data)
        form.setFieldValue('valor', response.data.preco)
      })
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
    setCheckAdicional(false)
    resetForm()
    close()
  }
  const handleSubmit = async () => {
    if (form.isValid()) {
      dataModal(form.values)
      fecharModal()
      setClearAdicional(true)
    }
  }
  const insertAdicional = (value: IAdicional[]) => {
    form.setFieldValue('adicionalEspecialidades', value)
    if (value.length > 0) {
      const valor = value.reduce((total, obj) => {
        return total + obj.mercadoria!.valorVenda! * obj.quantidade!
      }, 0)
      form.setFieldValue('valor', form.values.especialidade.preco! + valor)
    } else {
      form.setFieldValue('valor', form.values.especialidade.preco!)
    }
  }
  const remove = (row: MRT_Row) => {
    const newData = [...dataIngrediente]
    newData.splice(row.index, 1)
    setDataIngrediente(newData)
    form.setFieldValue('especialidade.especialidadeMercadoria', newData)
  }
  const rowActions = ({ row }: { row: MRT_Row<IEspecialidadeMercadoria> }) => (
    <Flex>
      <Tooltip label={'Remover'}>
        <ActionIcon
          size="sm"
          variant="transparent"
          aria-label="Settings"
          onClick={() => remove(row)}
        >
          <IconTrash style={{ cursor: 'pointer' }} />
        </ActionIcon>
      </Tooltip>
    </Flex>
  )
  const columns = useMemo<MRT_ColumnDef<IEspecialidadeMercadoria>[]>(
    () => [
      {
        accessorKey: 'mercadoria.nome',
        header: 'Nome',
        size: 15,
        minSize: 10,
        maxSize: 30,
        mantineTableBodyCellProps: {
          align: 'center',
        },
        mantineTableHeadCellProps: {
          align: 'center',
        },
      },
      {
        accessorKey: 'quantidade',
        header: 'Quantidade',
        size: 15,
        minSize: 10,
        maxSize: 30,
        mantineTableBodyCellProps: {
          align: 'center',
        },
        mantineTableHeadCellProps: {
          align: 'center',
        },
        Cell: ({ cell }) => cell.getValue<number>().toFixed(2),
      },
    ],
    []
  )
  return (
    <Modal
      opened={opened}
      shadow={'xl'}
      zIndex={110000}
      onClose={close}
      centered
      size={600}
      closeOnClickOutside={false}
      withCloseButton={false}
      radius={'md'}
      closeOnEscape={false}
      trapFocus={true}
      title={form.values.especialidade.nome}
    >
      <Divider mb={'1rem'} />
      <SimpleTable
        rowActions={rowActions}
        enableRowActions
        columns={columns}
        data={dataIngrediente}
      />
      <Checkbox
        mt={'0.5rem'}
        label="Inserir adicional"
        defaultChecked={false}
        onChange={event => setCheckAdicional(event.target.checked)}
        color="green"
      />
      {checkAdicional && (
        <Card mt={'0.5rem'} shadow="sm" padding="lg" radius="md" withBorder>
          <Adicional clear={clearAdicional} adicional={insertAdicional} />
        </Card>
      )}
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Flex align={'center'} justify={'space-around'}>
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
            onChange={value => form.setFieldValue('quantidade', Number(value))}
            required
          />
        </Flex>
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
