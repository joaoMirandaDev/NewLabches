import { useTranslation } from 'next-i18next'
import z from 'zod'

const ModalCadastoMercadoria = () => {
  const { t } = useTranslation()
  const requiredField = t('components.general.campoObrigatorio')
  return z.object({
    quantidade: z.number().positive({ message: requiredField }),
  })
}

export { ModalCadastoMercadoria }
