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

interface DrawerMercadoria {
  openModal: boolean
  dataMercadoria: IMercadoria | null
  refresDrawerVisualizar: (value: boolean) => void
  close: (value: boolean) => void
}

interface Categoria {
  id?: number | null
  nome?: string
}

const DrawerMercadoria: React.FC<DrawerMercadoria> = ({
  openModal,
  dataMercadoria,
  close,
  refresDrawerVisualizar,
}) => {
  const t = useTranslate()
  const [categoria, setCategoria] = useState<SelectItem[]>([])
  const [messageErro, setMessageErro] = useState<boolean>(false)
  const [onEdit, setOnEdit] = useState<boolean>(false)

  const form = useForm<{
    id: number | null
    nome: string
    ativo: number
    saldoEstoque: number
    multiplicador: number
    unidadeMedida: {
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
      saldoEstoque: 0,
      unidadeMedida: {
        id: null,
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
      getAllUnidadeMedida()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openModal])

  const getAllUnidadeMedida = async () => {
    const value = await api.get('api/unidadeMedida/findAll')
    const data = value.data.map((data: Categoria) => ({
      value: data.id,
      label: data.nome,
    }))
    setCategoria(data)
  }

  const handleDelete = () => {
    api
      .delete(`/api/mercadoria/deleteById/${form.values.id}`)
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

  const handleSelectCategoria = (value: string | number | null) => {
    if (value) {
      const pessoa = categoria.find(item => item.label === value)
      setMessageErro(false)
      form.setFieldValue('unidadeMedida.id', pessoa?.value)
      form.setFieldValue('unidadeMedida.nome', pessoa?.label)
    }
  }

  const handleSubmit = async () => {
    if (form.getInputProps('unidadeMedida.id').value == null) {
      setMessageErro(true)
      return false
    }
    if (form.isValid()) {
      await api
        .put('api/mercadoria/editar', form.values)
        .then(() => {
          SuccessNotification({
            message: form.values.nome + ' editado(a) com sucesso!',
          })
          setOnEdit(false)
          close(false)
          refresDrawerVisualizar(true)
        })
        .catch(response => {
          console.log(response)
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
          searchValue={form.getInputProps('unidadeMedida.nome').value}
          onSearchChange={handleSelectCategoria}
          disabled={!onEdit}
          clearButtonProps={{ 'aria-label': 'Clear selection' }}
          nothingFound="Nenhuma unidade de medida encontrada"
          withinPortal
          error={messageErro ? 'campo obrigatório' : ''}
          withAsterisk
          required
          label={'Selecione a unidade de medida'}
          placeholder={'Selecione uma das opções'}
          data={categoria}
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
        {renderButtons()}
      </form>
    </Drawer>
  )
}

export default DrawerMercadoria
