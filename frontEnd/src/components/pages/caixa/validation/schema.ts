import { useTranslation } from 'next-i18next'
import z from 'zod'

const ValidateAddPedido = () => {
  const { t } = useTranslation()
  const requiredField = t('components.general.campoObrigatorio')
  return z.object({
    nome: z.string().nonempty({ message: requiredField }),
  })
}

export { ValidateAddPedido }
