import { useTranslation } from 'next-i18next'
import z from 'zod'

const DrowerCadastroProdutos = () => {
  const { t } = useTranslation()
  const requiredField = t('components.general.campoObrigatorio')
  return z.object({
    nome: z.string().nonempty({ message: requiredField }),
    valorVenda: z.number().positive({ message: requiredField }),
    limiteMinimo: z.number().positive({ message: requiredField }),
    unidadeMedida: z
      .object({
        id: z.number().positive({ message: requiredField }),
      })
      .required(),
    tipo: z
      .object({
        id: z.number().positive({ message: requiredField }),
      })
      .required(),
    multiplicador: z.number().positive({ message: requiredField }),
  })
}

export { DrowerCadastroProdutos }
