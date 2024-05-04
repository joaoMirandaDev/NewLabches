import z from 'zod'

const ValidateAddPedido = () => {
  const requiredField = 'Campo obrigatório'
  return z.object({
    nomeCliente: z.string().nonempty({ message: requiredField }),
    tipoPedido: z
      .object({
        id: z.number().positive({ message: requiredField }),
      })
      .required(),
  })
}

export { ValidateAddPedido }
