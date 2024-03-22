import {
  Button,
  Divider,
  Drawer,
  Flex,
  Group,
  MultiSelect,
  NumberInput,
  Select,
  SelectItem,
  Space,
  TextInput,
} from '@mantine/core'
import { useEffect, useState } from 'react'
import { useTranslate } from '@refinedev/core'
import {
  IconArrowBarLeft,
  IconCircleXFilled,
  IconDatabasePlus,
} from '@tabler/icons-react'
import api from 'src/utils/Api'
import { useForm, zodResolver } from '@mantine/form'
import { DrowerCadastroProdutos } from '../validation/schema'
import { ErrorNotification, SuccessNotification } from '@components/common'
import ISelect from 'src/interfaces/select'
interface DrawerCadastroProduto {
  openModal: boolean
  close: (value: boolean) => void
  refresh: (value: boolean) => void
}

interface Categoria {
  id?: number
  nome?: string
}

const DrawerCadastroProduto: React.FC<DrawerCadastroProduto> = ({
  openModal,
  close,
  refresh,
}) => {
  const t = useTranslate()
  const [categoria, setCategoria] = useState<SelectItem[]>([])
  const [mercadoria, setMercadoria] = useState<SelectItem[]>([])
  const [especialidade, setMercadoriaByEspecialidade] = useState<string[]>([])
  const form = useForm<{
    id: number | null
    nome: string
    ativo: number
    dataCadastro: Date
    idMercadoria: number[] | string[]
    categoria: {
      id: number | null
      nome: string
    }
    preco: number
    ingrediente: string
  }>({
    initialValues: {
      id: null,
      ativo: 0,
      idMercadoria: [],
      dataCadastro: new Date(),
      nome: '',
      categoria: {
        id: null,
        nome: '',
      },
      preco: 0,
      ingrediente: '',
    },
    validate: zodResolver(DrowerCadastroProdutos()),
  })
  // const [data, setData] = useState<ICliente>()
  useEffect(() => {
    if (openModal) {
      getAllCategoria()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openModal])

  useEffect(() => {
    form.setFieldValue(
      'idMercadoria',
      especialidade.map(val => Number(val))
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [especialidade])

  const getAllCategoria = async () => {
    const value = await api.get('api/categoria/findAll')
    const data = value.data.map((data: Categoria) => ({
      value: data.id,
      label: data.nome,
    }))
    setCategoria(data)
    const grip = await api.get('api/mercadoria/findAllGrip')
    const dataGrip = grip.data.map((data: ISelect) => ({
      value: data.id,
      label: data.nome,
    }))
    setMercadoria(dataGrip)
  }

  const handleSubmit = async () => {
    if (form.getInputProps('categoria.id').value == null) {
      return false
    }
    if (form.isValid()) {
      await api
        .post('api/produtos/adicionar', form.values)
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
    }
  }

  const resetForm = () => {
    const dados = {
      id: null,
      nome: '',
      categoria: {
        id: null,
        nome: '',
      },
      preco: 0,
      ingrediente: '',
    }
    form.setValues(dados)
  }

  const handleClose = () => {
    resetForm()
    setMercadoriaByEspecialidade([])
    close(false)
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
      onClose={() => close(false)}
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
        <MultiSelect
          {...form.getInputProps('idMercadoria')}
          onChange={value => form.setFieldValue('idMercadoria', value)}
          data={mercadoria}
          withinPortal
          withAsterisk
          label="Selecione os itens da especialidade"
          placeholder="Selecione os itens da especialidade"
        />
        <Space h="xl" />
        {renderButtons()}
      </form>
    </Drawer>
  )
}

export default DrawerCadastroProduto
