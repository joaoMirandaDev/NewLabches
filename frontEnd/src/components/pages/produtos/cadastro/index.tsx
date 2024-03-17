import {
  Button,
  Divider,
  Drawer,
  Flex,
  NumberInput,
  Select,
  SelectItem,
  Space,
  TextInput,
} from '@mantine/core'
import { useEffect, useState } from 'react'
import { useTranslate } from '@refinedev/core'
import { IconCircleXFilled, IconDatabasePlus } from '@tabler/icons-react'
import api from 'src/utils/Api'
import { useForm, zodResolver } from '@mantine/form'
import { DrowerCadastroProdutos } from '../validation/schema'
import { ErrorNotification, SuccessNotification } from '@components/common'
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
  const form = useForm<{
    id: number | null
    nome: string
    ativo: number
    dataCadastro: Date
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
  const [categoria, setCategoria] = useState<SelectItem[]>([])
  const [messageErro, setMessageErro] = useState<boolean>(false)
  const getAllCategoria = async () => {
    const value = await api.get('api/categoria/findAll')
    const data = value.data.map((data: Categoria) => ({
      value: data.id,
      label: data.nome,
    }))
    setCategoria(data)
  }

  const handleSubmit = async () => {
    if (form.getInputProps('categoria.id').value == null) {
      setMessageErro(true)
      return false
    }
    if (form.isValid()) {
      await api
        .post('api/produtos/adicionar', form.values)
        .then(() => {
          SuccessNotification({
            message: t('pages.produtos.sucesso'),
          })
          handleClose()
          refresh(true)
        })
        .catch(() => {
          ErrorNotification({ message: t('pages.produtos.error') })
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
    close(false)
  }

  const handleSelectCategoria = (value: string | number | null) => {
    setMessageErro(false)
    form.setFieldValue('categoria.id', value)
  }

  const renderButtons = () => (
    <>
      <Flex mt={'1rem'} justify={'space-between'}>
        <Button
          color="red"
          leftIcon={<IconCircleXFilled />}
          onClick={() => handleClose()}
        >
          {t('components.button.cancelar')}
        </Button>
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
      position="right"
      withinPortal
      withCloseButton={true}
      closeOnEscape={false}
      trapFocus={true}
      title={'Cadastro de Produtos'}
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
          onChange={handleSelectCategoria}
          clearButtonProps={{ 'aria-label': 'Clear selection' }}
          nothingFound="Nenhuma categoria encontrada"
          withinPortal
          error={messageErro ? 'campo obrigatório' : ''}
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
        {renderButtons()}
      </form>
    </Drawer>
  )
}

export default DrawerCadastroProduto
