import { useTranslation } from 'next-i18next'
import z from 'zod'

const DrowerCadastroProdutos = () => {
  const { t } = useTranslation()
  const requiredField = t('components.general.campoObrigatorio')
  return z.object({
    nome: z.string().nonempty({ message: requiredField }),
    dataCompra: z
      .date()
      .max(new Date(), { message: 'Data superior a data atual!' }),
    dataPagamento: z.nullable(z.date()),
    fornecedor: z
      .object({
        id: z.number().positive({ message: requiredField }),
      })
      .required(),
    formaPagamento: z
      .object({
        id: z.number().positive({ message: requiredField }),
      })
      .required(),
    multiplicador: z.number().positive({ message: requiredField }),
  })
}

export { DrowerCadastroProdutos }
