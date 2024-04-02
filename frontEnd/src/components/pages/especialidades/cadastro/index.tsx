import {
  ActionIcon,
  Button,
  Divider,
  Drawer,
  Flex,
  Group,
  NumberInput,
  Select,
  SelectItem,
  Space,
  TextInput,
  Tooltip,
} from '@mantine/core'
import { useEffect, useMemo, useState } from 'react'
import { useTranslate } from '@refinedev/core'
import {
  IconArrowBarLeft,
  IconCircleXFilled,
  IconDatabasePlus,
  IconEdit,
  IconTrash,
} from '@tabler/icons-react'
import api from 'src/utils/Api'
import { useForm, zodResolver } from '@mantine/form'
import { DrowerCadastroProdutos } from '../validation/schema'
import { ErrorNotification, SuccessNotification } from '@components/common'
import SimpleTable from '@components/common/tabela/simpleTable'
import ModalInsertMercadoria from '../modal/modal'
import IEspecialidadeMercadoria from 'src/interfaces/especialidadeCompra'
import { useDisclosure } from '@mantine/hooks'
import { MRT_ColumnDef, MRT_Row } from 'mantine-react-table'
import IMercadoria from 'src/interfaces/mercadoria'
interface DrawerCadastroProduto {
  openModal: boolean
  closeDrower: (value: boolean) => void
  refresh: (value: boolean) => void
}

interface Categoria {
  id?: number
  nome?: string
}

const DrawerCadastroProduto: React.FC<DrawerCadastroProduto> = ({
  openModal,
  closeDrower,
  refresh,
}) => {
  const t = useTranslate()
  const [categoria, setCategoria] = useState<SelectItem[]>([])
  const [idMercadoria, setIdMercadoria] = useState<number | null>(null)
  const [itemSelecionado, setItemSelecionado] =
    useState<IEspecialidadeMercadoria | null>(null)
  const [opened, { open, close }] = useDisclosure(false)
  const [data, setData] = useState<IEspecialidadeMercadoria[]>([])
  const [mercadoria, setMercadoria] = useState<SelectItem[]>([])
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

  useEffect(() => {
    if (openModal) {
      getAllCategoria()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openModal])

  const getAllCategoria = async () => {
    const value = await api.get('api/categoria/findAll')
    const data = value.data.map((data: Categoria) => ({
      value: data.id,
      label: data.nome,
    }))
    setCategoria(data)
    const mercadoria = await api.get('api/mercadoria/findAll')
    const dataMercadoria = mercadoria.data.map((data: IMercadoria) => ({
      value: data.id,
      label: data.nome,
      group: data.tipo.nome,
    }))
    setMercadoria(dataMercadoria)
  }

  const handleSubmit = async () => {
    if (data.length > 0) {
      const updatedFormValues = {
        ...form.values,
        especialidadeMercadoria: data,
      }
      await api
        .post('api/produtos/adicionar', updatedFormValues)
        .then(() => {
          SuccessNotification({
            message: 'Especialidade cadastrada com sucesso!',
          })
          handleClose()
          refresh(true)
        })
        .catch(() => {
          ErrorNotification({ message: 'Erro ao cadastrar!' })
        })
    } else {
      return ErrorNotification({
        message: 'Selecione pelo menos uma mercadoria !',
      })
    }
  }

  const resetForm = () => {
    const dados = {
      id: null,
      nome: '',
      especialidadeMercadoria: [],
      categoria: {
        id: null,
        nome: '',
      },
      preco: 0,
      ingrediente: '',
    }
    form.setValues(dados)
  }

  const objetoModal = (event: IEspecialidadeMercadoria) => {
    const index = data.findIndex(
      val => val.mercadoria?.nome == event.mercadoria?.nome
    )
    if (index != -1) {
      data.splice(index, 1)
    }
    setItemSelecionado(null)
    setData(prev => [...prev, event])
  }

  const handleClose = () => {
    resetForm()
    closeDrower(false)
    setData([])
  }

  const handleChange = (key: string, event: IEspecialidadeMercadoria) => {
    setItemSelecionado({ ...itemSelecionado, [key]: event })
  }

  const handleChangeMercadoria = () => {
    api.get(`api/mercadoria/findById/${idMercadoria}`).then(response => {
      handleChange('mercadoria', response.data)
      open()
    })
  }

  const remove = (row: MRT_Row) => {
    const newData = [...data]
    newData.splice(row.index, 1)
    setData(newData)
  }

  const editar = (row: MRT_Row) => {
    setItemSelecionado(row.original)
    open()
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
      <Tooltip label={'Editar'}>
        <ActionIcon
          size="sm"
          variant="transparent"
          aria-label="Settings"
          onClick={() => editar(row)}
        >
          <IconEdit style={{ cursor: 'pointer' }} />
        </ActionIcon>
      </Tooltip>
    </Flex>
  )

  return (
    <Drawer
      opened={openModal}
      onClose={() => closeDrower(false)}
      size={'lg'}
      position="right"
      withinPortal
      closeOnClickOutside={false}
      withCloseButton={false}
      closeOnEscape={false}
      trapFocus={true}
      title={'Cadastro de especialidades'}
    >
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <TextInput
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
            withinPortal
            w={'100%'}
            withAsterisk
            label="Selecione as mercadorias"
            placeholder="Selecione as mercadorias"
          />
          <Button
            leftIcon={<IconDatabasePlus />}
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

export default DrawerCadastroProduto
