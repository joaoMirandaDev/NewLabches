import z from 'zod'

const ValidateAddPedidoEspecialidade = () => {
  const requiredField = 'Campo obrigatório'
  return z.object({
    quantidade: z.number().positive({ message: requiredField }),
    valorPedidoEspecialidade: z.number().positive({ message: requiredField }),
  })
}

export { ValidateAddPedidoEspecialidade }
