import {
  ActionIcon,
  Button,
  Divider,
  Drawer,
  Flex,
  Group,
  Popover,
  Select,
  SelectItem,
  Space,
  Text,
  Textarea,
  Tooltip,
} from '@mantine/core'
import { useEffect, useState, useMemo } from 'react'
import 'dayjs/locale/pt-br'
import { DatePickerInput, DatesProvider } from '@mantine/dates'
import { useTranslate } from '@refinedev/core'
import { IconDatabaseEdit, IconDatabasePlus } from '@tabler/icons-react'
import api from 'src/utils/Api'
import { useForm, zodResolver } from '@mantine/form'
import { DrowerCadastroProdutos } from '../validation/schema'
import { ErrorNotification, SuccessNotification } from '@components/common'
import {
  IconArrowBarLeft,
  IconEdit,
  IconExclamationCircle,
  IconTrash,
} from '@tabler/icons'
import IFornecedor from 'src/interfaces/fornecedor'
import SimpleTable from '@components/common/tabela/simpleTable'
import IMercadoria from 'src/interfaces/mercadoria'
import ITensCompra from 'src/interfaces/itensCompra'
import ModalInsertCompras from '../modal/modal'
import { useDisclosure } from '@mantine/hooks'
import IItemCompra from 'src/interfaces/compras/itensCompra'
import { MRT_ColumnDef, MRT_Row } from 'mantine-react-table'
interface DrawerVisualizarCompra {
  openModal: boolean
  idCompra: number | null
  closed: (value: boolean) => void
  refresh: (value: boolean) => void
}

interface formaPagamento {
  id?: number
  nome?: string
}

const DrawerVisualizarCompra: React.FC<DrawerVisualizarCompra> = ({
  openModal,
  closed,
  idCompra,
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
    if (openModal && idCompra) {
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
  const [onEdit, setOnEdit] = useState<boolean>(false)
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
          disabled={!onEdit}
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
          disabled={!onEdit}
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
    const compraById = await api.get(`api/compras/${idCompra}`)
    form.setValues(compraById.data)
    form.setFieldValue('dataCompra', new Date(compraById.data.dataCompra))
    form.setFieldValue('dataPagamento', new Date(compraById.data.dataPagamento))
    const dados =
      compraById.data.observacao == null ? '' : compraById.data.observacao
    form.setFieldValue('observacao', dados)
    setData(compraById.data.itensCompras)

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
        .put('api/compras/edit', updatedFormValues)
        .then(() => {
          SuccessNotification({
            message: 'Compra atualizada com sucesso',
          })
          handleClose()
        })
        .catch(() => {
          ErrorNotification({ message: 'Erro ao cadastrar mercadoria' })
        })
    }
  }

  const handleClose = () => {
    closed(false)
    setOnEdit(false)
    refresh(true)
    resetForm()
  }

  const handleDelete = () => {
    api
      .delete(`/api/compras/deleteById/${form.values.id}`)
      .then(() => {
        SuccessNotification({
          message: 'Compra deletada com sucesso!',
        })
        handleClose()
      })
      .catch(() => {
        ErrorNotification({
          message: 'Erro ao deletar compra!',
        })
      })
  }

  const handleCancelar = () => {
    handleClose()
  }

  const enableEdit = () => {
    setOnEdit(true)
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
          <Popover width={200} position="bottom" withArrow shadow="md">
            <Popover.Target>
              <Button color="red" leftIcon={<IconTrash />}>
                {t('components.button.deletar')}
              </Button>
            </Popover.Target>
            <Popover.Dropdown ml={'0.5rem'}>
              <Flex align={'center'}>
                <IconExclamationCircle color="orange" />
                <Text size="sm" ml={'0.5rem'}>
                  Deseja deletar esta compra ?
                </Text>
              </Flex>
              <Flex>
                <Button
                  onClick={() => handleDelete()}
                  compact
                  variant="subtle"
                  color="red"
                >
                  {t('components.button.confirmar')}
                </Button>
                <Button
                  onClick={() => handleCancelar()}
                  compact
                  variant="subtle"
                >
                  {t('components.button.cancelar')}
                </Button>
              </Flex>
            </Popover.Dropdown>
          </Popover>
        </Group>
        {!onEdit && (
          <Button
            leftIcon={<IconDatabaseEdit />}
            onClick={enableEdit}
            type="submit"
            color="green"
          >
            {t('components.button.editar')}
          </Button>
        )}
        {onEdit && (
          <Button
            leftIcon={<IconDatabaseEdit />}
            onClick={enableEdit}
            type="submit"
            color="green"
          >
            {t('components.button.salvar')}
          </Button>
        )}
        {/* <Button leftIcon={<IconDatabasePlus />} type="submit" color="green">
          {t('components.button.salvar')}
        </Button> */}
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
            disabled={!onEdit}
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
            disabled={!onEdit}
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
              disabled={!onEdit}
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
                  disabled={!onEdit}
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
            disabled={!onEdit}
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
            disabled={!onEdit}
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
          disabled={!onEdit}
          {...form.getInputProps('observacao')}
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

export default DrawerVisualizarCompra
