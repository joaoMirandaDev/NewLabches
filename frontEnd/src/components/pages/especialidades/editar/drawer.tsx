import {
  ActionIcon,
  Button,
  Divider,
  Drawer,
  Flex,
  Group,
  NumberInput,
  Popover,
  Select,
  SelectItem,
  Space,
  Text,
  TextInput,
  Tooltip,
} from '@mantine/core'

import { useEffect, useMemo, useState } from 'react'
import { useTranslate } from '@refinedev/core'
import api from 'src/utils/Api'
import {
  IconArrowBarLeft,
  IconEdit,
  IconExclamationCircle,
  IconTrash,
} from '@tabler/icons'
import { IconDatabaseEdit, IconDatabasePlus } from '@tabler/icons-react'
import { ErrorNotification, SuccessNotification } from '@components/common'
import { useForm, zodResolver } from '@mantine/form'
import { DrowerCadastroProdutos } from '../validation/schema'
import SimpleTable from '@components/common/tabela/simpleTable'
import IEspecialidadeMercadoria from 'src/interfaces/especialidadeCompra'
import { MRT_ColumnDef, MRT_Row } from 'mantine-react-table'
import ModalInsertMercadoria from '../modal/modal'
import { useDisclosure } from '@mantine/hooks'
import IProduto from 'src/interfaces/produto'
import IMercadoria from 'src/interfaces/mercadoria'
import {
  FIND_ALL_CATEGORIA,
  FIND_ALL_MERCADORIA,
  MERCADORIA_BY_ID,
  PRODUTO_DELETE_BY_ID,
  PRODUTO_EDIT,
} from 'src/utils/Routes'

interface DrawerProduto {
  openModal: boolean
  dataProduto: IProduto | null
  refresDrawerVisualizar: (value: boolean) => void
  closeDrower: (value: boolean) => void
}

interface ISelect {
  id?: number | null
  nome?: string
}

const DrawerProduto: React.FC<DrawerProduto> = ({
  openModal,
  dataProduto,
  closeDrower,
  refresDrawerVisualizar,
}) => {
  const t = useTranslate()
  const [idMercadoria, setIdMercadoria] = useState<number | null>(null)
  const [categoria, setCategoria] = useState<SelectItem[]>([])
  const [data, setData] = useState<IEspecialidadeMercadoria[]>([])
  const [opened, { open, close }] = useDisclosure(false)
  const [itemSelecionado, setItemSelecionado] =
    useState<IEspecialidadeMercadoria | null>(null)
  const [mercadoria, setMercadoria] = useState<SelectItem[]>([])
  const [onEdit, setOnEdit] = useState<boolean>(false)

  const form = useForm<{
    id: number | null
    nome: string
    ativo: number
    dataCadastro: Date
    categoria: {
      id: number | null
      nome: string
    }
    especialidadeMercadoria: IEspecialidadeMercadoria[]
    preco: number
    ingrediente: string
  }>({
    initialValues: {
      id: null,
      ativo: 0,
      dataCadastro: new Date(),
      especialidadeMercadoria: [],
      nome: '',
      categoria: {
        id: 0,
        nome: '',
      },
      preco: 0,
      ingrediente: '',
    },
    validate: zodResolver(DrowerCadastroProdutos()),
  })

  useEffect(() => {
    if (openModal && dataProduto != null) {
      setOnEdit(false)
      form.setValues(dataProduto)
      setData(dataProduto.especialidadeMercadoria!)
      getAllCategoria()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openModal])

  const getAllCategoria = async () => {
    const value = await api.get(FIND_ALL_CATEGORIA)
    const data = value.data.map((data: ISelect) => ({
      value: data.id,
      label: data.nome,
    }))
    setCategoria(data)
    const grip = await api.get(FIND_ALL_MERCADORIA)
    const dataMercadoria = grip.data.map((data: IMercadoria) => ({
      value: data.id,
      label: data.nome,
      group: data.tipo.nome,
    }))
    setMercadoria(dataMercadoria)
  }

  const refresh = () => {
    closeDrower(false)
    setOnEdit(false)
    refresDrawerVisualizar(true)
  }

  const handleVoltar = () => {
    refresh()
  }

  const handleDelete = () => {
    api
      .delete(PRODUTO_DELETE_BY_ID + `${form.values.id}`)
      .then(() => {
        SuccessNotification({
          message: t('pages.produtos.notification.delete'),
        })
        refresh()
      })
      .catch(() => {
        ErrorNotification({
          message: t('pages.produtos.notification.errorDelete'),
        })
      })
  }

  const handleSubmit = async () => {
    if (data.length > 0) {
      const updatedFormValues = {
        ...form.values,
        especialidadeMercadoria: data,
      }
      await api
        .put(PRODUTO_EDIT, updatedFormValues)
        .then(() => {
          SuccessNotification({
            message: t('pages.produtos.notification.sucessoEdit'),
          })
          refresh()
        })
        .catch(() => {
          ErrorNotification({
            message: t('pages.produtos.notification.errorEdit'),
          })
        })
    } else {
      return ErrorNotification({
        message: 'Selecione pelo menos uma mercadoria !',
      })
    }
  }

  const enableEdit = () => {
    setOnEdit(true)
  }

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

  const remove = (row: MRT_Row) => {
    const newData = [...data]
    newData.splice(row.index, 1)
    setData(newData)
  }

  const editar = (row: MRT_Row) => {
    setItemSelecionado(row.original)
    open()
  }

  const rowActions = ({ row }: { row: MRT_Row<IEspecialidadeMercadoria> }) => (
    <Flex>
      <Tooltip label={'Remover'}>
        <ActionIcon
          disabled={!onEdit}
          size="sm"
          variant="transparent"
          aria-label="Settings"
          onClick={() => remove(row)}
        >
          <IconTrash style={{ cursor: 'pointer' }} />
        </ActionIcon>
      </Tooltip>
      <Tooltip label={'Editar'}>
        <ActionIcon
          size="sm"
          disabled={!onEdit}
          variant="transparent"
          aria-label="Settings"
          onClick={() => editar(row)}
        >
          <IconEdit style={{ cursor: 'pointer' }} />
        </ActionIcon>
      </Tooltip>
    </Flex>
  )

  const renderButtons = () => (
    <>
      <Flex mt={'1rem'} justify={'space-between'}>
        <Group>
          <Button
            leftIcon={<IconArrowBarLeft />}
            onClick={() => handleVoltar()}
          >
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
                  {t('pages.produtos.visualizar.deleteText')}
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
                <Button onClick={() => refresh()} compact variant="subtle">
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
      </Flex>
    </>
  )

  const handleChange = (key: string, event: IEspecialidadeMercadoria) => {
    setItemSelecionado({ ...itemSelecionado, [key]: event })
  }

  const handleChangeMercadoria = () => {
    api.get(MERCADORIA_BY_ID + `${idMercadoria}`).then(response => {
      handleChange('mercadoria', response.data)
      open()
    })
  }

  const objetoModal = (event: IEspecialidadeMercadoria) => {
    const index = data.findIndex(
      val => val.mercadoria?.nome === event.mercadoria?.nome
    )
    if (index !== -1) {
      data[index] = event
    } else {
      data.push(event)
    }
    setData([...data])
    setItemSelecionado(null)
  }

  return (
    <Drawer
      opened={openModal}
      onClose={() => closeDrower(false)}
      position="right"
      withCloseButton={false}
      closeOnClickOutside={false}
      closeOnEscape={false}
      trapFocus={true}
      size={'lg'}
      title={'Visualizar Especialidades'}
    >
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <TextInput
          disabled={!onEdit}
          mt={'1rem'}
          {...form.getInputProps('nome')}
          value={form.values.nome}
          placeholder={t('pages.produtos.cadastro.placeHolder')}
          label={t('pages.produtos.cadastro.nome')}
          onChange={values => form.setFieldValue('nome', values.target.value)}
          withAsterisk
        />
        <Space h="xl" />
        <Divider />
        <Select
          mt={'1rem'}
          {...form.getInputProps('categoria.id')}
          disabled={!onEdit}
          clearButtonProps={{ 'aria-label': 'Clear selection' }}
          nothingFound="Nenhuma categoria encontrada"
          withinPortal
          withAsterisk
          required
          label={t('pages.produtos.cadastro.categoria')}
          placeholder={t('pages.produtos.cadastro.categoria')}
          data={categoria}
        />
        <Space h="xl" />
        <Divider />
        <NumberInput
          {...form.getInputProps('preco')}
          mt={'1rem'}
          precision={2}
          disabled={!onEdit}
          decimalSeparator=","
          thousandsSeparator="."
          defaultValue={form.values.preco}
          placeholder={t('pages.produtos.cadastro.placeHolderPreco')}
          label={t('pages.produtos.cadastro.price')}
          withAsterisk
          hideControls
          onChange={value => form.setFieldValue('preco', Number(value))}
          required
        />
        <Space h="xl" />
        <Divider />
        <Flex mt={'1rem'} align={'flex-end'} w={'100%'}>
          <Select
            {...form.getInputProps('idMercadoria')}
            onChange={value => setIdMercadoria(Number(value))}
            data={mercadoria}
            disabled={!onEdit}
            withinPortal
            w={'100%'}
            withAsterisk
            label="Selecione as mercadorias"
            placeholder="Selecione as mercadorias"
          />
          <Button
            leftIcon={<IconDatabasePlus />}
            disabled={!onEdit}
            onClick={() => handleChangeMercadoria()}
            ml={'0.5rem'}
            color="green"
          >
            Inserir
          </Button>
        </Flex>
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
      <ModalInsertMercadoria
        closeModal={close}
        dataModal={objetoModal}
        openModal={opened}
        data={itemSelecionado}
      />
    </Drawer>
  )
}

export default DrawerProduto
