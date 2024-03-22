import { useTranslation } from 'next-i18next'
import z from 'zod'

const DrowerCadastroProdutos = () => {
  const { t } = useTranslation()
  const requiredField = t('components.general.campoObrigatorio')
  return z.object({
    nome: z.string().nonempty({ message: requiredField }),
    preco: z.number().positive({ message: requiredField }),
    categoria: z
      .object({
        id: z.number().positive({ message: requiredField }),
      })
      .required(),
    idMercadoria: z
      .array(z.number().positive({ message: requiredField }))
      .nonempty({ message: requiredField }),
  })
}

export { DrowerCadastroProdutos }
