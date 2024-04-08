import {
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
} from '@mantine/core'

import { useEffect, useState } from 'react'
import { useTranslate } from '@refinedev/core'
import api from 'src/utils/Api'
import {
  IconArrowBarLeft,
  IconExclamationCircle,
  IconTrash,
} from '@tabler/icons'
import { IconDatabaseEdit } from '@tabler/icons-react'
import { ErrorNotification, SuccessNotification } from '@components/common'
import { useForm, zodResolver } from '@mantine/form'
import IMercadoria from 'src/interfaces/mercadoria'
import { DrowerEditarMercadoria } from '../validation/editarValidation'
import {
  FIND_ALL_TIPO,
  FIND_ALL_UNIDADE_MEDIDA,
  MERCADORIA_DELETE_BY_ID,
  MERCADORIA_EDITAR_BY_ID,
} from 'src/utils/Routes'

interface DrawerMercadoria {
  openModal: boolean
  dataMercadoria: IMercadoria | null
  refresDrawerVisualizar: (value: boolean) => void
  close: (value: boolean) => void
}

interface UnidadeMedida {
  id?: number | null
  nome?: string
}

interface Tipo {
  id?: number
  nome?: string
}

const DrawerMercadoria: React.FC<DrawerMercadoria> = ({
  openModal,
  dataMercadoria,
  close,
  refresDrawerVisualizar,
}) => {
  const t = useTranslate()
  const [tipo, setTipo] = useState<SelectItem[]>([])
  const [categoria, setCategoria] = useState<SelectItem[]>([])
  const [onEdit, setOnEdit] = useState<boolean>(false)

  const form = useForm<{
    id: number | null
    nome: string
    ativo: number
    saldoEstoque: number
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
      multiplicador: 0,
      nome: '',
      limiteMinimo: 0,
      saldoEstoque: 0,
      tipo: {
        id: 0,
        nome: '',
      },
      unidadeMedida: {
        id: 0,
        nome: '',
      },
      valorVenda: 0,
    },
    validate: zodResolver(DrowerEditarMercadoria()),
  })
  useEffect(() => {
    if (openModal && dataMercadoria != null) {
      setOnEdit(false)
      form.setValues(dataMercadoria)
      getAllUnidadeMeidaAndTipo()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openModal])

  const getAllUnidadeMeidaAndTipo = async () => {
    const unidadeMedida = await api.get(FIND_ALL_UNIDADE_MEDIDA)
    const value = await api.get(FIND_ALL_TIPO)
    const dataMedida = unidadeMedida.data.map((data: UnidadeMedida) => ({
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

  const handleDelete = () => {
    api
      .delete(MERCADORIA_DELETE_BY_ID + `${form.values.id}`)
      .then(() => {
        SuccessNotification({
          message: form.values.nome + ' deletado(a) com sucesso!',
        })
        close(false)
        setOnEdit(false)
        refresDrawerVisualizar(true)
      })
      .catch(() => {
        ErrorNotification({
          message: 'Erro ao deletar!',
        })
      })
  }

  const handleSubmit = async () => {
    if (form.isValid()) {
      await api
        .put(MERCADORIA_EDITAR_BY_ID, form.values)
        .then(() => {
          SuccessNotification({
            message: form.values.nome + ' editado(a) com sucesso!',
          })
          setOnEdit(false)
          close(false)
          refresDrawerVisualizar(true)
        })
        .catch(response => {
          ErrorNotification({
            title: 'Erro ao editar ' + form.values.nome,
            message: response.message,
          })
        })
    }
  }

  const enableEdit = () => {
    setOnEdit(true)
  }

  const renderButtons = () => (
    <>
      <Flex mt={'1rem'} justify={'space-between'}>
        <Group>
          <Button leftIcon={<IconArrowBarLeft />} onClick={() => close(false)}>
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
                <Button onClick={() => close(false)} compact variant="subtle">
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

  return (
    <Drawer
      opened={openModal}
      onClose={() => close(false)}
      position="right"
      withinPortal={true}
      size={'lg'}
      closeOnClickOutside={false}
      withCloseButton={false}
      closeOnEscape={false}
      trapFocus={false}
      title={'Visualizar Mercadoria'}
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
          {...form.getInputProps('unidadeMedida.id')}
          onChange={event =>
            form.setFieldValue('unidadeMedida.id', Number(event))
          }
          disabled={!onEdit}
          clearButtonProps={{ 'aria-label': 'Clear selection' }}
          nothingFound="Nenhuma unidade de medida encontrada"
          withinPortal
          withAsterisk
          required
          label={'Selecione um fator de medida '}
          placeholder={'Selecione uma das opções'}
          data={categoria}
        />
        <Space h="xl" />
        <Divider />
        <Select
          {...form.getInputProps('tipo.id')}
          mt={'1rem'}
          disabled={!onEdit}
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
          {...form.getInputProps('saldoEstoque')}
          mt={'1rem'}
          precision={2}
          disabled={!onEdit}
          decimalSeparator=","
          thousandsSeparator="."
          defaultValue={form.values.saldoEstoque}
          placeholder={'Saldo'}
          label={'Saldo em estoque'}
          withAsterisk
          hideControls
          onChange={value => form.setFieldValue('saldoEstoque', Number(value))}
          required
        />
        <Space h="xl" />
        <Divider />
        <NumberInput
          {...form.getInputProps('multiplicador')}
          mt={'1rem'}
          precision={2}
          disabled={!onEdit}
          decimalSeparator=","
          thousandsSeparator="."
          defaultValue={form.values.multiplicador}
          placeholder={'multiplicador'}
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
          disabled={!onEdit}
          decimalSeparator=","
          thousandsSeparator="."
          defaultValue={form.values.valorVenda}
          placeholder={'Preço de venda'}
          label={'Preço de venda'}
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
          disabled={!onEdit}
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

export default DrawerMercadoria
