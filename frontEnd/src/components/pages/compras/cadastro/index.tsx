import {
  Button,
  Divider,
  Drawer,
  Flex,
  Group,
  Select,
  SelectItem,
  Space,
} from '@mantine/core'
import { useEffect, useState } from 'react'
import 'dayjs/locale/pt-br'
import { DatePickerInput, DatesProvider } from '@mantine/dates'
import { useTranslate } from '@refinedev/core'
import { IconCircleXFilled, IconDatabasePlus } from '@tabler/icons-react'
import api from 'src/utils/Api'
import { useForm, zodResolver } from '@mantine/form'
import { DrowerCadastroProdutos } from '../validation/schema'
import { ErrorNotification, SuccessNotification } from '@components/common'
import { IconArrowBarLeft } from '@tabler/icons'
import IFornecedor from 'src/interfaces/fornecedor'
import SimpleTable from '@components/common/tabela/simpleTable'
import IMercadoria from 'src/interfaces/mercadoria'
import ITensCompra from 'src/interfaces/itensCompra'
import IMercadoriaCompraDto from 'src/interfaces/mercadoriaCompraDto'
import ModalInsertCompras from '../modal/modal'
import { useDisclosure } from '@mantine/hooks'
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
    ativo: number
    itensCompras: ITensCompra[]
  }>({
    initialValues: {
      itensCompras: [],
      id: null,
      ativo: 0,
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
  // const [data, setData] = useState<ICliente>()
  useEffect(() => {
    if (openModal) {
      getAllServices()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openModal])
  const [dataFornecedor, setDataFornecedor] = useState<SelectItem[]>([])
  const [mercadoriaSelecionada, setMercadoriaSelecionada] =
    useState<IMercadoriaCompraDto | null>(null)
  const [formaPagamento, setFormaPagamento] = useState<SelectItem[]>([])
  const [mercadoria, setMercadoria] = useState<SelectItem[]>([])
  const getAllServices = async () => {
    const fornecedor = await api.get('api/fornecedor/findAll')
    const value = await api.get('api/formaPagamento/findAll')
    const mercadoria = await api.get('api/mercadoria/findAll')
    const mercadoriaSelect = mercadoria.data.map((data: IMercadoria) => ({
      value: data.id,
      label: data.nome,
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
  const getFormaPagamento = (event: number) => {
    formaPagamento.forEach(val => {
      if (Number(val.value) == event) {
        form.setFieldValue('formaPagamento.id', val.value)
        form.setFieldValue('formaPagamento.nome', val.label)
      }
    })
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
      nome: '',
      formaPagamento: {
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
    closed(false)
  }

  const handleCHangeMercadoria = (event: number) => {
    mercadoria.forEach(val => {
      if (Number(val.value) == event) {
        const dados: IMercadoriaCompraDto = {}
        dados.id = Number(val.value)
        dados.nome = val.label
        setMercadoriaSelecionada(dados)
        open()
      }
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
            w={'100%'}
            onChange={event =>
              form.setFieldValue('fornecedor.id', Number(event))
            }
            clearButtonProps={{ 'aria-label': 'Clear selection' }}
            nothingFound="Nenhum fornecedor encontrado"
            withinPortal
            withAsterisk
            required
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
            withAsterisk
            required
            w={'100%'}
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
        <Select
          {...form.getInputProps('unidadeMedida.id')}
          mt={'1rem'}
          onChange={event => handleCHangeMercadoria(Number(event))}
          clearButtonProps={{ 'aria-label': 'Clear selection' }}
          nothingFound="Nenhuma mercadoria encontrada"
          withinPortal
          withAsterisk
          required
          label={t('Selecione uma mercadoria')}
          placeholder={t('Selecione uma das opções')}
          data={mercadoria}
        />
        <Space h="xl" />
        <Divider />
        <Space h="xl" />
        <SimpleTable columns={[]} data={[]} />
        {renderButtons()}
      </form>
      <ModalInsertCompras
        closeModal={close}
        openModal={opened}
        data={mercadoriaSelecionada}
      />
    </Drawer>
  )
}

export default DrawerCadastroCompras
