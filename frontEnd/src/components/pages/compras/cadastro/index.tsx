import {
  ActionIcon,
  Button,
  Divider,
  Drawer,
  Flex,
  Group,
  Select,
  SelectItem,
  Space,
  Textarea,
  Tooltip,
} from '@mantine/core'
import { useEffect, useState, useMemo } from 'react'
import 'dayjs/locale/pt-br'
import { DatePickerInput, DatesProvider } from '@mantine/dates'
import { useTranslate } from '@refinedev/core'
import { IconCircleXFilled, IconDatabasePlus } from '@tabler/icons-react'
import api from 'src/utils/Api'
import { useForm, zodResolver } from '@mantine/form'
import { DrowerCadastroProdutos } from '../validation/schema'
import { ErrorNotification, SuccessNotification } from '@components/common'
import { IconArrowBarLeft, IconEdit, IconTrash } from '@tabler/icons'
import IFornecedor from 'src/interfaces/fornecedor'
import SimpleTable from '@components/common/tabela/simpleTable'
import IMercadoria from 'src/interfaces/mercadoria'
import ITensCompra from 'src/interfaces/itensCompra'
import ModalInsertCompras from '../modal/modal'
import { useDisclosure } from '@mantine/hooks'
import IItemCompra from 'src/interfaces/compras/itensCompra'
import { MRT_ColumnDef, MRT_Row } from 'mantine-react-table'
interface DrawerCadastroCompras {
  openModal: boolean
  closed: (value: boolean) => void
  refresh: (value: boolean) => void
}

interface formaPagamento {
  id?: number
  nome?: string
}

const DrawerCadastroCompras: React.FC<DrawerCadastroCompras> = ({
  openModal,
  closed,
  refresh,
}) => {
  const t = useTranslate()
  const [opened, { open, close }] = useDisclosure(false)
  const form = useForm<{
    id: number | null
    observacao: string
    fornecedor: {
      id: number | null
      nome: string
    }
    formaPagamento: {
      id: number | null
      nome: string
    }
    dataCompra: Date | null
    dataPagamento: Date | null
    idMercadoria: number
    ativo: number
    itensCompras: IItemCompra[]
  }>({
    initialValues: {
      observacao: '',
      itensCompras: [],
      id: null,
      ativo: 0,
      idMercadoria: 0,
      fornecedor: {
        id: 0,
        nome: '',
      },
      formaPagamento: {
        id: 0,
        nome: '',
      },
      dataCompra: new Date(),
      dataPagamento: new Date(),
    },
    validate: zodResolver(DrowerCadastroProdutos()),
  })
  useEffect(() => {
    if (openModal) {
      getAllServices()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openModal])
  const [dataFornecedor, setDataFornecedor] = useState<SelectItem[]>([])
  const [itemSelecionado, setItemSelecionado] = useState<IItemCompra | null>(
    null
  )
  const [formaPagamento, setFormaPagamento] = useState<SelectItem[]>([])
  const [data, setData] = useState<IItemCompra[]>([])
  const [mercadoria, setMercadoria] = useState<SelectItem[]>([])
  const columns = useMemo<MRT_ColumnDef<ITensCompra>[]>(
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
      {
        accessorKey: 'valorCompra',
        header: 'Valor de compra',
        size: 15,
        minSize: 10,
        maxSize: 30,
        mantineTableBodyCellProps: {
          align: 'center',
        },
        mantineTableHeadCellProps: {
          align: 'center',
        },
        Cell: ({ cell }) =>
          cell
            .getValue<number>()
            .toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }),
      },
    ],
    []
  )
  const removeMercadoria = (row: MRT_Row) => {
    const newData = [...data]
    newData.splice(row.index, 1)
    setData(newData)
  }
  const editarMercadoria = (row: MRT_Row) => {
    setItemSelecionado(row.original)
    open()
  }
  const rowActions = ({ row }: { row: MRT_Row<IItemCompra> }) => (
    <Flex>
      <Tooltip label={'Remover'}>
        <ActionIcon
          size="sm"
          variant="transparent"
          aria-label="Settings"
          onClick={() => removeMercadoria(row)}
        >
          <IconTrash style={{ cursor: 'pointer' }} />
        </ActionIcon>
      </Tooltip>
      <Tooltip label={'Editar'}>
        <ActionIcon
          size="sm"
          variant="transparent"
          aria-label="Settings"
          onClick={() => editarMercadoria(row)}
        >
          <IconEdit style={{ cursor: 'pointer' }} />
        </ActionIcon>
      </Tooltip>
    </Flex>
  )
  const getAllServices = async () => {
    const fornecedor = await api.get('api/fornecedor/findAll')
    const value = await api.get('api/formaPagamento/findAll')
    const mercadoria = await api.get('api/mercadoria/findAll')
    const mercadoriaSelect = mercadoria.data.map((data: IMercadoria) => ({
      value: data.id,
      label: data.nome,
      group: data.tipo.nome,
    }))
    setMercadoria(mercadoriaSelect)
    const fornecedorSelect = fornecedor.data.map((data: IFornecedor) => ({
      value: data.id,
      label: data.nomeRazaoSocial,
    }))
    setDataFornecedor(fornecedorSelect)
    const data = value.data.map((data: formaPagamento) => ({
      value: data.id,
      label: data.nome,
    }))
    setFormaPagamento(data)
  }

  const objetoModal = (event: IItemCompra) => {
    const index = data.findIndex(
      val => val.mercadoria?.nome == event.mercadoria?.nome
    )
    if (index != -1) {
      data.splice(index, 1)
    }
    setItemSelecionado(null)
    setData(prev => [...prev, event])
  }

  const getFormaPagamento = (event: number) => {
    formaPagamento.forEach(val => {
      if (Number(val.value) == event) {
        form.setFieldValue('formaPagamento.id', val.value)
        form.setFieldValue('formaPagamento.nome', val.label)
      }
    })
  }

  const resetForm = () => {
    setData([])
    const dados = {
      itensCompras: [],
      id: null,
      ativo: 0,
      idMercadoria: 0,
      fornecedor: {
        id: 0,
        nome: '',
      },
      formaPagamento: {
        id: 0,
        nome: '',
      },
      dataCompra: new Date(),
      dataPagamento: new Date(),
    }
    form.setValues(dados)
  }

  const handleSubmit = async () => {
    if (data.length == 0) {
      return ErrorNotification({ message: 'Insira no mínimo uma mercadoria!' })
    }
    if (form.isValid()) {
      const updatedFormValues = { ...form.values, itensCompras: data }
      await api
        .post('api/compras/addCompra', updatedFormValues)
        .then(() => {
          SuccessNotification({
            message: 'Compra cadastrada com sucesso',
          })
          handleClose()
          resetForm()
          refresh(true)
        })
        .catch(() => {
          ErrorNotification({ message: 'Erro ao cadastrar mercadoria' })
        })
    }
  }

  const handleClose = () => {
    resetForm()
    closed(false)
  }

  const handleChange = (key: string, event: IItemCompra) => {
    setItemSelecionado({ ...itemSelecionado, [key]: event })
  }

  const handleCHangeMercadoria = () => {
    api
      .get(`api/mercadoria/findById/${form.values.idMercadoria}`)
      .then(response => {
        handleChange('mercadoria', response.data)
        open()
      })
  }

  const renderButtons = () => (
    <>
      <Flex mt={'1rem'} justify={'space-between'}>
        <Group>
          <Button leftIcon={<IconArrowBarLeft />} onClick={() => handleClose()}>
            {t('components.button.voltar')}
          </Button>
          <Button
            color="red"
            leftIcon={<IconCircleXFilled />}
            onClick={() => handleClose()}
          >
            {t('components.button.cancelar')}
          </Button>
        </Group>
        <Button leftIcon={<IconDatabasePlus />} type="submit" color="green">
          {t('components.button.salvar')}
        </Button>
      </Flex>
    </>
  )

  return (
    <Drawer
      opened={openModal}
      onClose={() => closed(false)}
      position="right"
      size={'xl'}
      withinPortal
      closeOnClickOutside={false}
      withCloseButton={false}
      closeOnEscape={false}
      trapFocus={false}
      title={'Cadastro de compras'}
    >
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Divider />
        <Flex>
          <Select
            {...form.getInputProps('fornecedor.id')}
            mt={'1rem'}
            mr={'0.5rem'}
            onChange={event =>
              form.setFieldValue('fornecedor.id', Number(event))
            }
            clearButtonProps={{ 'aria-label': 'Clear selection' }}
            nothingFound="Nenhum fornecedor encontrado"
            w={'50%'}
            withinPortal
            withAsterisk
            searchable
            label={t('Selecione um fornecedor')}
            placeholder={t('Selecione uma das opções')}
            data={dataFornecedor}
          />
          <Select
            {...form.getInputProps('formaPagamento.id')}
            mt={'1rem'}
            onChange={event => getFormaPagamento(Number(event))}
            clearButtonProps={{ 'aria-label': 'Clear selection' }}
            nothingFound="Nenhuma forma de pgamento encontrado"
            withinPortal
            w={'50%'}
            withAsterisk
            label={t('Selecione uma forma de Pagamento')}
            placeholder={t('Selecione uma das opções')}
            data={formaPagamento}
          />
        </Flex>
        <Space h="xl" />
        <Divider />
        <Flex>
          <DatesProvider
            settings={{
              locale: 'pt-br',
            }}
          >
            <DatePickerInput
              {...form.getInputProps('dataCompra')}
              mt={'1rem'}
              w={'100%'}
              required
              mr={'0.5rem'}
              label="Selecione a data de compra"
              placeholder="Escolha uma data"
              maxDate={new Date()}
            />
          </DatesProvider>
          {form.values.formaPagamento.nome == 'PRAZO' && (
            <>
              <Space h="xl" />
              <Divider />
              <DatesProvider
                settings={{
                  locale: 'pt-br',
                }}
              >
                <DatePickerInput
                  {...form.getInputProps('dataPagamento')}
                  mt={'1rem'}
                  w={'100%'}
                  required
                  label="Selecione a data para pagamento"
                  placeholder="Escolha uma data"
                  minDate={new Date()}
                />
              </DatesProvider>
            </>
          )}
        </Flex>
        <Space h="xl" />
        <Divider />
        <Flex mt={'1rem'} align={'flex-end'} w={'100%'}>
          <Select
            {...form.getInputProps('idMercadoria')}
            onChange={event =>
              form.setFieldValue('idMercadoria', Number(event))
            }
            clearButtonProps={{ 'aria-label': 'Clear selection' }}
            nothingFound="Nenhuma mercadoria encontrada"
            withinPortal
            w={'100%'}
            searchable
            clearable
            withAsterisk
            label={t('Selecione uma mercadoria')}
            placeholder={t('Selecione uma das opções')}
            data={mercadoria}
          />
          <Button
            leftIcon={<IconDatabasePlus />}
            onClick={() => handleCHangeMercadoria()}
            ml={'0.5rem'}
            color="green"
          >
            Inserir
          </Button>
        </Flex>
        <Space h="xl" />
        <Divider />
        <Textarea
          mt={'1rem'}
          onChange={event =>
            form.setFieldValue('observacao', event.target.value)
          }
          placeholder="Insira alguma observação a compra"
          label="Observação"
        />
        <Space h="xl" />
        <Divider />
        <Space h="xl" />
        <SimpleTable
          enableRowActions
          rowActions={rowActions}
          columns={columns}
          data={data}
        />
        {renderButtons()}
      </form>
      <ModalInsertCompras
        closeModal={close}
        dataModal={objetoModal}
        openModal={opened}
        data={itemSelecionado}
      />
    </Drawer>
  )
}

export default DrawerCadastroCompras
