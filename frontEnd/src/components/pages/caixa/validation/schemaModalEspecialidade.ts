import z from 'zod'

const ValidateAddPedidoEspecialidade = () => {
  const requiredField = 'Campo obrigatório'
  return z.object({
    nome: z.string().nonempty({ message: requiredField }),
    quantidade: z.number().positive({ message: requiredField }),
    preco: z.number().positive({ message: requiredField }),
  })
}

export { ValidateAddPedidoEspecialidade }
