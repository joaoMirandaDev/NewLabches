import z from 'zod'

const validaAberturaCaixa = () => {
  const requiredField = 'Campo obrigatório'
  return z.object({
    valorAberturaCaixa: z.number().positive({ message: requiredField }),
  })
}

export { validaAberturaCaixa }
