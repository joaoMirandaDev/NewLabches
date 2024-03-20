import { useTranslation } from 'next-i18next'
import z from 'zod'

const DrowerEditarMercadoria = () => {
  const { t } = useTranslation()
  const requiredField = t('components.general.campoObrigatorio')
  return z.object({
    nome: z.string().nonempty({ message: requiredField }),
    valorVenda: z.number().positive({ message: requiredField }),
    multiplicador: z.number().positive({ message: requiredField }),
    limiteMinimo: z.number().positive({ message: requiredField }),
    saldoEstoque: z.number().nonnegative({ message: requiredField }),
  })
}

export { DrowerEditarMercadoria }
