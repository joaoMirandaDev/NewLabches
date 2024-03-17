import {
  Button,
  Divider,
  Drawer,
  Flex,
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
import IProduto from 'src/interfaces/produto'
import api from 'src/utils/Api'
import { IconExclamationCircle, IconTrash } from '@tabler/icons'
import { IconDatabaseEdit } from '@tabler/icons-react'
import { ErrorNotification, SuccessNotification } from '@components/common'
import { useForm, zodResolver } from '@mantine/form'
import { DrowerCadastroProdutos } from '../validation/schema'

interface DrawerProduto {
  openModal: boolean
  dataProduto: IProduto | null
  refresDrawerVisualizar: (value: boolean) => void
  close: (value: boolean) => void
}

interface Categoria {
  id?: number | null
  nome?: string
}

const DrawerProduto: React.FC<DrawerProduto> = ({
  openModal,
  dataProduto,
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
    dataCadastro: Date
    categoria: {
      id: number | null
      nome: string | null
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
  useEffect(() => {
    if (openModal && dataProduto != null) {
      setOnEdit(false)
      form.setValues(dataProduto)
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
  }

  const handleDelete = () => {
    api
      .delete(`/api/produtos/delete/${form.values.id}`)
      .then(() => {
        SuccessNotification({
          message: t('pages.produtos.notification.delete'),
        })
        close(false)
        setOnEdit(false)
        refresDrawerVisualizar(true)
      })
      .catch(() => {
        ErrorNotification({
          message: t('pages.produtos.notification.errorDelete'),
        })
      })
  }

  const handleCancelar = () => {
    close(false)
    setOnEdit(false)
  }

  const handleSelectCategoria = (value: string | number | null) => {
    if (value) {
      const pessoa = categoria.find(item => item.label === value)
      setMessageErro(false)
      form.setFieldValue('categoria.id', pessoa?.value)
      form.setFieldValue('categoria.nome', pessoa?.label)
    }
  }

  const handleSubmit = async () => {
    if (form.getInputProps('categoria.id').value == null) {
      setMessageErro(true)
      return false
    }
    if (form.isValid()) {
      await api
        .put('api/produtos/editar', form.values)
        .then(() => {
          SuccessNotification({
            message: t('pages.produtos.notification.sucessoEdit'),
          })
          setOnEdit(false)
          close(false)
          refresDrawerVisualizar(true)
        })
        .catch(() => {
          ErrorNotification({
            message: t('pages.produtos.notification.errorEdit'),
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
              <Button onClick={() => handleCancelar()} compact variant="subtle">
                {t('components.button.cancelar')}
              </Button>
            </Flex>
          </Popover.Dropdown>
        </Popover>
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
      withCloseButton={true}
      closeOnEscape={false}
      trapFocus={false}
      title={form.values.nome}
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
          searchValue={form.getInputProps('categoria.nome').value}
          onSearchChange={handleSelectCategoria}
          disabled={!onEdit}
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
        {renderButtons()}
      </form>
    </Drawer>
  )
}

export default DrawerProduto
