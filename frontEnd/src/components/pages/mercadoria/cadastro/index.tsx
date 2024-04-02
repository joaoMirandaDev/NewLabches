import {
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
} from '@mantine/core'
import { useEffect, useState } from 'react'
import { useTranslate } from '@refinedev/core'
import { IconCircleXFilled, IconDatabasePlus } from '@tabler/icons-react'
import api from 'src/utils/Api'
import { useForm, zodResolver } from '@mantine/form'
import { DrowerCadastroProdutos } from '../validation/schema'
import { ErrorNotification, SuccessNotification } from '@components/common'
import { IconArrowBarLeft } from '@tabler/icons'
interface DrawerCadastroMercadoria {
  openModal: boolean
  close: (value: boolean) => void
  refresh: (value: boolean) => void
}

interface Mercadoria {
  id?: number
  nome?: string
}

interface Tipo {
  id?: number
  nome?: string
}

const DrawerCadastroMercadoria: React.FC<DrawerCadastroMercadoria> = ({
  openModal,
  close,
  refresh,
}) => {
  const t = useTranslate()
  const form = useForm<{
    id: number | null
    nome: string
    ativo: number
    multiplicador: number
    limiteMinimo: number
    unidadeMedida: {
      id: number | null
      nome: string
    }
    tipo: {
      id: number | null
      nome: string
    }
    valorVenda: number
  }>({
    initialValues: {
      id: null,
      ativo: 0,
      limiteMinimo: 0,
      multiplicador: 0,
      nome: '',
      unidadeMedida: {
        id: 0,
        nome: '',
      },
      tipo: {
        id: 0,
        nome: '',
      },
      valorVenda: 0,
    },
    validate: zodResolver(DrowerCadastroProdutos()),
  })
  // const [data, setData] = useState<ICliente>()
  useEffect(() => {
    if (openModal) {
      getUnidadeMedidaAndTipo()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openModal])
  const [categoria, setCategoria] = useState<SelectItem[]>([])
  const [tipo, setTipo] = useState<SelectItem[]>([])
  const getUnidadeMedidaAndTipo = async () => {
    const unidadeMedida = await api.get('api/unidadeMedida/findAll')
    const value = await api.get('api/tipo')
    const dataMedida = unidadeMedida.data.map((data: Mercadoria) => ({
      value: data.id,
      label: data.nome,
    }))
    setCategoria(dataMedida)
    const data = value.data.map((data: Tipo) => ({
      value: data.id,
      label: data.nome,
    }))
    setTipo(data)
  }

  const handleSubmit = async () => {
    if (form.isValid()) {
      await api
        .post('api/mercadoria/adicionar', form.values)
        .then(() => {
          SuccessNotification({
            message: 'Mecadoria cadastrada com sucesso',
          })
          handleClose()
          refresh(true)
        })
        .catch(() => {
          ErrorNotification({ message: 'Erro ao cadastrar mercadoria' })
        })
    }
  }

  const resetForm = () => {
    const dados = {
      id: null,
      ativo: 0,
      multiplicador: 0,
      limiteMinimo: 0,
      nome: '',
      tipo: {
        id: null,
        nome: '',
      },
      unidadeMedida: {
        id: null,
        nome: '',
      },
      valorVenda: 0,
    }
    form.setValues(dados)
  }

  const handleClose = () => {
    resetForm()
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
      position="right"
      size={'lg'}
      withinPortal
      closeOnClickOutside={false}
      withCloseButton={false}
      closeOnEscape={false}
      trapFocus={false}
      title={'Cadastro de Mercadoria'}
    >
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Divider />
        <TextInput
          mt={'1rem'}
          {...form.getInputProps('nome')}
          value={form.values.nome}
          placeholder={t('Digite o nome da mercadoria')}
          label={t('Nome')}
          onChange={values => form.setFieldValue('nome', values.target.value)}
          withAsterisk
        />
        <Space h="xl" />
        <Divider />
        <Select
          {...form.getInputProps('unidadeMedida.id')}
          mt={'1rem'}
          onChange={event =>
            form.setFieldValue('unidadeMedida.id', Number(event))
          }
          clearButtonProps={{ 'aria-label': 'Clear selection' }}
          nothingFound="Nenhuma categoria unidade medida"
          withinPortal
          withAsterisk
          required
          label={t('Selecione um fator de medida')}
          placeholder={t('Selecione uma das opções')}
          data={categoria}
        />
        <Space h="xl" />
        <Divider />
        <Select
          {...form.getInputProps('tipo.id')}
          mt={'1rem'}
          onChange={event => form.setFieldValue('tipo.id', Number(event))}
          clearButtonProps={{ 'aria-label': 'Clear selection' }}
          nothingFound="Nenhuma tipo encontrado"
          withinPortal
          withAsterisk
          required
          label={t('Selecione um tipo')}
          placeholder={t('Selecione um tipo')}
          data={tipo}
        />
        <Space h="xl" />
        <Divider />
        <NumberInput
          {...form.getInputProps('multiplicador')}
          mt={'1rem'}
          precision={2}
          decimalSeparator=","
          thousandsSeparator="."
          defaultValue={form.values.multiplicador}
          placeholder={t('pages.produtos.cadastro.placeHolderPreco')}
          label={'Multiplicador/Porção'}
          withAsterisk
          hideControls
          onChange={value => form.setFieldValue('multiplicador', Number(value))}
          required
        />
        <Space h="xl" />
        <Divider />
        <NumberInput
          {...form.getInputProps('valorVenda')}
          mt={'1rem'}
          precision={2}
          decimalSeparator=","
          thousandsSeparator="."
          defaultValue={form.values.valorVenda}
          placeholder={t('pages.produtos.cadastro.placeHolderPreco')}
          label={t('Preço de venda')}
          withAsterisk
          hideControls
          onChange={value => form.setFieldValue('valorVenda', Number(value))}
          required
        />
        <Space h="xl" />
        <Divider />
        <NumberInput
          {...form.getInputProps('limiteMinimo')}
          mt={'1rem'}
          precision={2}
          decimalSeparator=","
          thousandsSeparator="."
          defaultValue={form.values.limiteMinimo}
          placeholder={'Estoque minimo'}
          label={'Estoque mínimo'}
          withAsterisk
          hideControls
          onChange={value => form.setFieldValue('limiteMinimo', Number(value))}
          required
        />
        <Space h="xl" />
        {renderButtons()}
      </form>
    </Drawer>
  )
}

export default DrawerCadastroMercadoria
